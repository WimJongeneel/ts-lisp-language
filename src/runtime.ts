import { FuncKind, AST } from './parser'

const LambdaKind = Symbol("lambda")

interface Lambda {
    kind: typeof LambdaKind
    body: AST
    args: string[]
    params: any[]
}

const memory = new Map<string, any>()

const functions = new Map<string, (args: any[]) => any>([
    [ '+', a => a.reduce((r, c) => r + c) ],
    [ '-', a => a.reduce((r, c) => r - c) ],
    [ '/', a => a.reduce((r, c) => r / c) ],
    [ '*', a => a.reduce((r, c) => r * c) ],
    [ 'pow', a => a.reduce((r, c) => r ^ c) ],
    [ 'and', a => a.reduce((r, c) => r == 1 && c == 1 ? 1 : 0) ],
    [ 'or', a => a.reduce((r, c) => r == 1 || c == 1 ? 1 : 0) ],
    [ 'not', a => a[0] == 1 ? 0 : 1 ],
    [ 'bool', a => a[0] > 0 ],
    [ 'max', a => Math.max(...a) ],
    [ 'min', a => Math.min(...a) ],
    [ 'greater', a => a[0] > a[1] ? 1 : 0 ],
    [ 'smaller', a => a[0] < a[1] ? 1 : 0],
    [ 'equals', a => a[0] == a[1] ? 1 : 0],
    [ 'define', a => memory.set(a[0], a[1]) ],
    [ 'inc', a => memory.set(a[0], memory.get(a[0]) + 1) ],
    [ 'dec', a => memory.set(a[0], memory.get(a[0]) - 1) ],
    [ '$', a => memory.get(a[0]) ],
    [ 'call', a => ({ func: a[0], args: a.splice(1), kind: FuncKind }) ],
    [ 'list', a => a ],
    [ 'get', a => a[0][a[1]] ],
    [ 'set', a => a[0][a[1]] = a[2] ],
    [ 'print', a => console.log(a) ],
    [ 'size', a => a[0].length ],
    [ '++', a => a.reduce((r, c) => [...r, ...c], [])],
    [ 'lambda', a => {
        const body = a[a.length - 1]
        const args = a.splice(0, -1).map(String)
        return { kind: LambdaKind, body, args, params: [] }
    }],
    [ 'apply', a => {
        const lambda = { ...a[0], params: a[0].params.concat(a.splice(1)) }
        if(lambda.args.length == lambda.params.length) {
            // (lambda.args as string[]).forEach((p, i) => memory.set(p, lambda.params[i]))
            return reduce(lambda.body)
        }
        return lambda
    }]
    // [ 'map', a => a[0].map(v => exec(a[0], [v])) ],
])

export const exec = (func: string, args: any[]) => {
    if(!functions.has(func)) throw new Error("Unknown function: " + func)
    // lambda args will be stored
    const argsValues = func == 'lambda' ? args : args.map(reduce)
    return functions.get(func)(argsValues)
}

const reduce = (value: any) => {
    if(typeof value == 'object' && 'kind' in value && value.kind == FuncKind) {
        return reduce(exec(value.func, value.args))
    }

    return value
}