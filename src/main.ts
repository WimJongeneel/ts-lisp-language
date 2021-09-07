import { lex, parse } from './parser'
import { exec } from './runtime'

const run = (program: string) => {
    const parsed = parse(lex(program))
    exec(parsed.func, parsed.args)
}

run('(define foo 42)')
run('(print ($ foo))')
run('(dec foo)')
run('(print ($ foo))')

// run('(print (+ ($ foo) 1))')
// run('(define l (list 1 ($ foo) 3)))')
// run('(print (get ($ l) 1))')
// run('(set ($ l) 1 99)')
// run('(print (get ($ l) 1))')
// run('(print (size ($ l)))')
// run('(print (size (++ ($ l) (list 99 9 9 9 9))))')