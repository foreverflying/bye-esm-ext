import { register, type ResolveHook } from 'node:module'
import { existsSync, statSync } from 'node:fs'
import { dirname, extname, resolve as resolvePath } from 'node:path'

register(new URL(import.meta.url))

const extensions = ['.js', '.mjs', '.json', '.jsx', '.d.ts', '.ts', '.tsx']
const mapTo = process.env['BYE_ESM_EXT_MAP_ROOT_TO']
let rootDir = '', outDir = ''
if (mapTo) {
    const [root, out] = mapTo.split(':')
    if (root && out) {
        const cwd = process.cwd()
        rootDir = root[0] === '/' ? resolvePath(root) : resolvePath(cwd, root)
        outDir = out[0] === '/' ? resolvePath(out) : resolvePath(cwd, out)
    }
}

export const resolve: ResolveHook = (specifier, context, nextResolve) => {
    const fileExt = extname(specifier)
    if ((!fileExt || !extensions.includes(fileExt)) && context.parentURL?.startsWith('file://')) {
        const parentPath = context.parentURL.substring(7)
        let dirName = dirname(parentPath)
        if (rootDir && dirName.startsWith(rootDir)) {
            dirName = dirName.replace(rootDir, outDir)
        }
        let fullPath = resolvePath(dirName, specifier)
        if (!existsSync(fullPath)) {
            for (const ext of extensions) {
                fullPath = resolvePath(dirName, specifier + ext)
                if (existsSync(fullPath)) {
                    return nextResolve(`file://${fullPath}`, context)
                }
            }
        } else if (statSync(fullPath).isDirectory()) {
            for (const ext of extensions) {
                fullPath = resolvePath(fullPath, `index${ext}`)
                if (existsSync(fullPath)) {
                    return nextResolve(`file://${fullPath}`, context)
                }
            }
        }
    }
    return nextResolve(specifier, context)
}
