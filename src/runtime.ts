const memory = new Map<string, any>()

const functions = new Map<string, (args: any[]) => any>([
    [ '+', a => a[0] + a[1] ],
    [ '-', a => a[0] - a[1] ],
    [ '/', a => a[0] / a[1] ],
    [ '*', a => a[0] * a[1] ],
    [ 'define', a => memory.set(a[0], a[1]) ],
    [ '$', a => memory.get(a[0]) ],
    [ 'func', a => ({ func: a[0], args: a.splice(1), kind: FuncKind }) ],
    [ 'list', a => a ],
    [ 'get', a => a[0][a[1]] ],
    [ 'set', a => a[0][a[1]] = a[2] ],
    [ 'print', a => console.log(a) ]
])

const exec = (func: string, args: any[]) => {
    if(!functions.has(func)) throw new Error("Unknown function: " + func)
    const argsValues = args.map(a => {
        if('kind' in a && a.kind == func) return exec(a.func, a.args)
        return a
    })
    return functions.get(func)(argsValues)
}