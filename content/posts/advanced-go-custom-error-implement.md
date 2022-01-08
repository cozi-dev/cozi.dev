---
title: "Advanced Go Custom Error Implement"
date: 2022-01-08T09:39:12+07:00
tags: ["go"]
---

In the [previous post](https://cozi.dev/posts/go-custom-error-implement/), we have implemented our custom error:

```go
type MyError struct {
	Code int
	Msg string
}

func (e *MyError) Error() string {
	return e.Msg
}
```

What if we need an advanced custom error with more information like this:

```go
type MyError struct {
	Code int
	SubCode int
	Msg string
	SubMsg string
}
```

Then we have 3 ways to return the error:

### Returns struct itself

```go
func exampleError() error {
	return &MyError{
		Code: 1,
		SubCode: 1000,
		Msg: "example error",
	}
}
```

This sound convenient but actually you can't set the required parameters

### Using  option pattern

```go
type Option func(e *MyError)

func WithCode(code int) {
	return func(e *MyError) {
		e.Code = code
	}
}

// .. same for WithSubCode, WithSubMsg

func NewError(msg string, opts ...Option) *MyError {
	e := &MyError{
		Msg: msg,
	}
	for _, opt := range opts {
		opt(e)
	}
	return e
}

func exampleError() error {
	return NewError("example error", WithCode(1), WithSubCode(1000))
}
```

### Using builder pattern

```go
func(e *MyError) WithCode(code int) *MyError {
	e.Code = code
	return e
}

// .. same for WithSubCode, WithSubMsg

func NewError(msg string) *MyError {
	e := &MyError{
		Msg: msg,
	}
	return e
}

func exampleError() error {
	return NewError("example error").WithCode(1).WithSubCode(1000)
}
```

## Conclusion

```go
function conclusion() string, error {
	return "Have a great day!", nil
}
```

