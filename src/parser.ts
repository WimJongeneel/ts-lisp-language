const FuncKind = Symbol("func")

interface Func {
    func: string
    args: AST[]
    kind: typeof FuncKind
}

type AST = Func | number

// [ '(', '+', '1', '2', ')' ]
const parse = (input: string[]): Func => {
    const first = input.shift()

    if(first != '(') throw new Error("Expression started with: " + first)

    const func = input.shift()
    const args: AST[] = []

    let current = input.shift()
    while(current != ')') {
        if(!Number.isNaN(Number(current))) args.push(Number(current))
        if(current == '(') {
            input.push('(')
            args.push(parse(input))
        }
    }

    return { kind: FuncKind, args, func }
}

const lex = (input: string): string[] => {
    const tokens: string[] = []

    let buffer = ''
    for(const s of input) {
        if(s == '(') tokens.push('(')
        else if(s == ')') tokens.push(')')
        else if(s == ' ' && buffer != '') {
            tokens.push(buffer)
            buffer = ''
        }
        else buffer += s
    }

    return tokens
}