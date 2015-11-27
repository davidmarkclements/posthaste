# Posthaste

Optimize code using static analysis

Proof of Concept

## Install

```
npm i -g posthaste
```

## Usage

Mark areas of code that you wish to optimize
with `// posthaste optimize:`

```
var x = 1

// posthaste optimize:
var obj = {
  a: x,
  b: 2
}

console.log(obj)
```

```
posthaste input.js > output.js
```

## Optimizations

Currently the only supported optimization is to 
convert object literals into constructed objects.

This has two advantages

1) For a frequently queried or mutated object it enables v8 hidden classes optimization
2) When profiling, objects are identified by constructor - object literals all come under
the same type `Object` which tends to swamp any indication of a memory leak. 
