import type { ResolveHook } from 'node:module'
import { existsSync, statSync } from 'node:fs'
import { dirname, extname, resolve as resolvePath } from 'node:path'

const extensions = ['.js', '.mjs', '.json', '.jsx', '.d.ts', '.ts', '.tsx']

export const resolve: ResolveHook = (specifier, context, nextResolve) => {
    const fileExt = extname(specifier)
    if ((!fileExt || !extensions.includes(fileExt)) && context.parentURL?.startsWith('file://')) {
        const parentPath = context.parentURL.substring(7)
        const dirName = dirname(parentPath)
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
