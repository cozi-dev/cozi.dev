---
title: "Golang Create Combinations From N Arrays"
date: 2022-09-24T20:31:26+07:00
tags: ["go", "combination"]
---

This snippet is useful when you need create combinations from n arrays with picking one element from each array.

For example, you want to create variants from product attributes:
```
Product: Tshirt
Color: White, Black
Size: S, M, L
```

**Variants of this Tshirt:**

```
White - S, White - M, White - L, Black - S, Black - M, Black - L
```

## Snippet 

```go
// example test case
// IN: [][]string{
//     {"green", "yellow"},
//	   {"big", "small"},
// }
// OUT: [][]string{
//	   {"green", "big"},
//	   {"green", "small"},
//	   {"yellow", "big"},
//	   {"yellow", "small"},
// }
func GetCombinations(in ...[]string) (out [][]string) {
	// number of arrays
	n := len(in)

	// to keep track of next element
	// in each of the n arrays
	indices := make([]int, n)

	for {
		// add current combination
		temp := []string{}
		for i := 0; i < n; i++ {
			temp = append(temp, in[i][indices[i]])
		}
		out = append(out, temp)

		// find the rightmost array that has more
		// elements left after the current element
		// in that array
		next := n - 1
		for next >= 0 && indices[next]+1 >= len(in[next]) {
			next--
		}

		// no such array is found so no more
		// combinations left
		if next < 0 {
			return
		}

		// if found move to next element in that
		// array
		indices[next]++

		// for all arrays to the right of this
		// array current index again points to
		// first element
		for i := next + 1; i < n; i++ {
			indices[i] = 0
		}
	}
}
```

## References

* https://www.geeksforgeeks.org/combinations-from-n-arrays-picking-one-element-from-each-array/