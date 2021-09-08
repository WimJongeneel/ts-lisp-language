# Lisp-style language in TypeScript

This project contains an interpreted language written in TypeScript. The design of the language has been heavily influenced by Lisp. The only construct this language are the parenthesized lists. The items in those list are either identifiers, numbers or other lists:

```
(define foo 32)
(when (smaller 3 2) (lambda (update foo -1)))
(print ($ foo))
```

Because a program is just a list of things, it is posible to write a program that writes programs by using the `list` functions.

## Basic functions

In this language everything is done with functions. A function is called by writing its name and arguments between paratheses. For example the `+` function:

```
(+ 1 2)
(print (+ 1 2))
```

Here `+` and `print` are the names of functions. The other items in the lists are the arguments. Those can either be other lists or literals.

## Variables

Defining a variable is done with the `define` function. The types are `number`, `list` and `identifier`:

```
(define foo 42)
(define bar (list 1 2 3))
(define baz +)
```

Retrieving a variable is done with the `$` function. It is also posible to prefix identifiers with `$` for a shorthand notation:

```
($ foo)
$foo
```

Updating an exisiting variable is done with the `update` function:

```
(update foo 1)
```

## Creating lambdas

Defining a lambda is done with the `lambda` function. The last argument of this function is the body. The arguments before this are the parameter names, those have to be identifiers. Lambdas do get lexial scoping:

```
(lambda a b (+ $a $b))
```

The lambda function is special as it is the only function for which its parameter list isn't evaluated before calling the function. This allows the lambda to store the expression inside the memory to be excuted later on.

## Calling lambdas

Calling a lambda is done with the `apply` function. Partial application for lambdas is supported.

```
(apply (lambda a b (+ $a $b)) 1 2)
(apply (apply (lambda a b (+ $a $b)) 1) 2)
```

## The `when` function

`when` is function that executes a parameter-less lambda when its first argument is `1`.

```
(when (smaller 3 2) (lambda (update foo -1)))
```

## List functions
 
Lists are created by the `list` function. Items can be retrieved with the `get` function. The `set` function can set an item at an index. The `size` funcion returns the length of the list. The `++` function concats lists togther.

```
(list 1 2 3)
(size (list 1 2 3))
(++ (list 1 2) (list 4 5))
(get $list 1)
(set $list 1 42)
```

## `Exec` function

With `exec` you can execute lists as if they where your program. If you combine lambda that return lists and the exec function you get a powerful macro system that is thruly part of the language. `exec` is recursive, it will execute all lists inside the list as well (if they are executable).

```
(define p (list + 1 1))
(print (exec $p))
(define f (lambda (exec $p)))

(print (exec (list + (* 2 3) 4)))
```

## Number functions

- `+`
- `-`
- `*`
- `/`
- `pow`
- `dec`
- `inc`

## Comparison functions

- `greater`
- `smaller`
- `equals`
- `max`
- `min`

## Boolean functions

Booleans are represented as the number `0` and `1`. The `bool` function converts a number to a bool. Because logical operators are also function they don't short circuit.

- `bool`
- `and`
- `or`
- `not`
