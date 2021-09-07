import { FuncKind } from './parser'

const memory = new Map<string, any>()

const functions = new Map<string, (args: any[]) => any>([
    [ '+', a => a.reduce((r, c) => r + c) ],
    [ '-', a => a.reduce((r, c) => r - c) ],
    [ '/', a => a.reduce((r, c) => r / c) ],
    [ '*', a => a.reduce((r, c) => r * c) ],
    [ 'max', a => Math.max(...a) ],
    [ 'min', a => Math.min(...a) ],
    [ 'define', a => memory.set(a[0], a[1]) ],
    [ '$', a => memory.get(a[0]) ],
    // [ 'func', a => ({ func: a[0], args: a.splice(1), kind: FuncKind }) ],
    [ 'list', a => a ],
    [ 'get', a => a[0][a[1]] ],
    [ 'set', a => a[0][a[1]] = a[2] ],
    [ 'print', a => console.log(a) ],
    [ 'size', a => a[0].length ],
    [ '++', a => a.reduce((r, c) => [...r, ...c], [])]
    // [ 'map', a => a[0].map(v => exec(a[0], [v])) ],
])

export const exec = (func: string, args: any[]) => {
    if(!functions.has(func)) throw new Error("Unknown function: " + func)
    const argsValues = args.map(a => {
        if(typeof a == 'object' && 'kind' in a && a.kind == FuncKind) return exec(a.func, a.args)
        return a
    })
    return functions.get(func)(argsValues)
}
