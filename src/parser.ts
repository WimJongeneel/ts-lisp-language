export const FuncKind = Symbol("func")

export interface Func {
    func: string
    args: AST[]
    kind: typeof FuncKind
}

export type AST = Func | number | string

// [ '(', '+', '1', '2', ')' ]
export const parse = (input: string[]): Func => {
    const first = input.shift()

    if(first != '(') throw new Error("Expression started with: " + first)

    const func = input.shift()
    const args: AST[] = []

    let current = input.shift()
    while(current != ')') {
        if(!Number.isNaN(Number(current))) args.push(Number(current))
        else if(current == '(') {
            input.unshift('(')
            args.push(parse(input))
        }
        else args.push(current)
        
        current = input.shift()
    }

    return { kind: FuncKind, args, func }
}

export const lex = (input: string): string[] => {
    const tokens: string[] = []

    let buffer = ''

    const flush = (next: string = undefined) => {
        if(buffer != '') tokens.push(buffer)
        buffer = ''
        if(next) tokens.push(next)
    }

    for(const s of input) {
        if(s == '(') flush('(')
        else if(s == ')') flush(')')
        else if(s == ' ') flush()
        else buffer += s
    }

    return tokens
}