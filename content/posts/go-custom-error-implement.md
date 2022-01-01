---
title: "Go Custom Error Implement"
date: 2022-01-01T16:30:42+07:00
tags: ["go"]
---

Have you ever checked the `error` definition to see what it is?

```go
// The error built-in interface type is the conventional interface for
// representing an error condition, with the nil value representing no error.
type error interface {
	Error() string
}
```

The error type is an interface, so you can customize it by implementing your own type. Let's check two examples below:

### Built-in Go string error implement

```go
// go/src/errors/errors.go

// errorString is a trivial implementation of error.
type errorString struct {
	s string
}

func (e *errorString) Error() string {
	return e.s
}
```

### Custom error implement

```go
type MyError struct {
	Code int
	Msg string
}

func (e *MyError) Error() string {
	return e.Msg
}
```

With this example, you can return `MyError` as `error` to receive more information about the error

```go
func main() {
	err := exampleError()
	if me, ok := err.(*MyError); ok {
		fmt.Printf("got error with code: %d, msg: %s\n", me.Code, me.Msg)
	} else {
		fmt.Printf("go built-in error: %s\n", err.Error())
	}
}

func exampleError() error {
	return &MyError{
		Code: 1,
		Msg: "example error",
	}
}
```

As usual, I hope this may help in some way :D

## References

 - https://gobyexample.com/interfaces
