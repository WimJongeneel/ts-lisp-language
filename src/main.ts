import { lex, parse } from './parser'
import { exec } from './runtime'

const run = (program: string) => {
    const parsed = parse(lex(program))
    exec(parsed.func, parsed.args)
}

// run('(define foo 42)')
// run('(print ($ foo))')
// run('(dec foo)')
// run('(print ($ foo))')
// run('(define b 1)')
// run('(print (smaller ($ b) -42)))')

// run('(define f (lambda a b (+ $a 1 (apply (lambda a b (+ $a $b)) (* $a 9) (+ $b 9)) )))')
// run('(print ($ f))')
// run('(print (apply (apply $f 1) 4))')
// run('(print (+ ($ foo) 1))')
// run('(define l (list 1 ($ foo) 3)))')
// run('(print (get ($ l) 1))')
// run('(set ($ l) 1 99)')
// run('(print (get ($ l) 1))')
// run('(print (size ($ l)))')
// run('(print (size (++ ($ l) (list 99 9 9 9 9))))')

run('(define foo 32)')
run('(when (not (greater 3 2)) (lambda (update foo -1)))')
run('(print $foo)')