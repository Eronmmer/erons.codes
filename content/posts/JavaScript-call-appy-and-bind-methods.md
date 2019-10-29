---
title: JavaScript call, apply and bind methods
date: "2019-08-03T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/javascript-call-apply-and-bind-methods/"
category: "JavaScript"
tags:
  - "OOP"
  - "JavaScript"
  - "Web Development"
description: "In this article, I briefly discuss the bind, call and apply methods in JavaScript.
These methods are available to every function in JavaScript and are used to control what *this* in a function points to."
# socialImage: "/media/42-line-bible.jpg"
---

<!-- ![42-line-bible.jpg](/media/42-line-bible.jpg) -->

In this article, I briefly discuss the `bind()`, `call()` and `apply()` methods in JavaScript.


These methods are available to every function in JavaScript and are used to control what `this` in a function points to. Let's see the following examples.


## `bind()`

The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value.

```js
const person = {
  name: "Erons",
  greet: function () {
    return(`Hello ${this.name}`)
  }
}

function greetPerson() {
  console.log(this.greet())
}

greetPerson();
// -> Uncaught TypeError: this.greet is not a function
```

An error would be thrown when the code above is run because there is no `greet` function in the global object(the browser in this case) that `this` in `greetPerson` references.


With `bind()`, we can tell the JavaScript engine where to look for `this`.


```js
const person = {
  name: "Erons",
  greet: function () {
    return(`Hello ${this.name}`)
  }
}

function greetPerson() {
  console.log(this.greet())
}

const bindPerson = greetPerson.bind(person)

bindPerson();
// -> Hello Erons
```

The `bind()` method did some interesting things

- It created `bindPerson`, a copy of the `greetPerson` function
- `bindPerson` when called will have it's `this` variable pointing to the `person` object


`bind()` is also used in what is known as function currying. The act of creating a copy of a function with some preset parameters.

```js
function multiply(a, b) {
  return a * b;
}

const multiplyByTen = multiply.bind(this, 10)

multiplyByTen(5)
// -> 50
```

`multiplyByTen` is now a copy of `multiply` but with 10 as a default parameter. So `multiplyByTen` can now be called with only one parameter.


## `call()`

The `call()` method calls a function with a given `this` value and arguments provided individually.

`call()` essentially does the same thing as `bind()` except that `call()` actually executes the function(*it doesn't create a copy of it*) and can accept additional parameters while `bind()` only creates a copy of the function. 


```js
const erons = {
  name: "Erons",
  speech: function () {
    return(`Hi, I'm ${this.name}`)
  }
}

function moreSpeech(age, hobby) {
  console.log(`${this.speech()}, I'm ${age} years old and I love ${hobby}`)
}

moreSpeech.call(erons, 17, 'cooking')

// -> Hi, I'm Erons, I'm 17 years old and I love cooking
```


## `apply()` 

`call()` and `apply()` do the exact same thing except that `call()` expects all parameters to be passed in individually, but `apply()` expects all additional parameters to be passed as an array.


```js
const erons = {
  name: "Erons",
  speech: function () {
    return(`Hi, I'm ${this.name}`)
  }
}

function moreSpeech(age, hobby) {
  console.log(`${this.speech()}, I'm ${age} years old and I love ${hobby}`)
}

moreSpeech.apply(erons, 17, 'cooking')

// -> Uncaught TypeError: CreateListFromArrayLike called on non-object
```

We got an error because we used `apply()` but didn't pass our extra parameters as an array.


```js
const erons = {
  name: "Erons",
  speech: function () {
    return(`Hi, I'm ${this.name}`)
  }
}

function moreSpeech(age, hobby) {
  console.log(`${this.speech()}, I'm ${age} years old and I love ${hobby}`)
}

moreSpeech.apply(erons, [17, 'cooking'])

// -> Hi, I'm Erons, I'm 17 years old and I love cooking
```

`bind()`, `call()` and `apply()` can also be used in function borrowing. Function borrowing allows us to use the methods of one object on a different object without having to make copies of the methods. 

```js
const person = {
  name: 'Erons',
  age: 17,
  speech: function() {
    return(`Hi, I'm ${this.name} and I'm ${this.age} years old`)
  }
}

const person2 = {
  name: 'Ehis',
  age: 11
}

const bindSpeech = person.speech.bind(person2)
bindSpeech()
// -> My name is Ehis and I am 11 years old

console.log(person.speech.call(person2))
// -> My name is Ehis and I am 11 years old

console.log(person.speech.apply(person2))
// -> My name is Ehis and I am 11 years old
```

We've seen how to control the `this` variable in functions and methods with three powerful JavaScript built-in methods.

