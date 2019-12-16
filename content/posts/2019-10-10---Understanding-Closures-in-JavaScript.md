---
title: Understanding Closures in JavaScript
date: "2019-10-10T22:40:32.169Z"
template: "post"
draft: false
slug: "/understanding-closures-in-javascript/"
category: "JavaScript"
tags:
  - "Functional Programming"
  - "JavaScript"
description: "Closures are a fundamental and powerful property that JavaScript heavily relies on and is very vital to understand. It can also be a little bit difficult to grasp its concepts especially for people new to programming. In this article, I explain with some examples and other concepts why and how closures work. "
socialImage: "/media/understanding-closures-in-javascript.jpg"
---

![understanding-closures-in-javascript](/media/understanding-closures-in-javascript.jpg)


Closures are a fundamental and powerful property that JavaScript heavily relies on and is very vital to understand. It can also be a little bit difficult to grasp its concepts especially for people new to programming. In this article, I explain with some examples and other concepts why and how closures work. 

## What is a Closure?

A Closure is the combination of a function and the *lexical environment*(or scope) within which that function was declared.

Closures are created whenever a function is created(during what is known as the *creation phase*). Closures make it possible for an inner function to have access to the variables of an outer function even after the *execution context* of that outer function is gone. 

Before we dive in to see how closures work, let's keep some key terms in mind.

- Execution Context
- Creation Phase
- Lexical Environment
- Scope Chain


### Execution Context

The execution context is a sort of *wrapper* where all JavaScript code are managed and executed. It comprises of the **creation phase** and the **execution phase**. 


### Creation phase

During the creation phase, the JavaScript interpreter places various variables and functions in memory. The **scope chain** at this point is also created and the value for *`this`* is set. The **execution phase** then follows where variables are assigned with their values and functions are executed.

### Lexical Environment

This in JavaScript refers to where something sits physically in code. A lexical environment exists in programming languages in which *where* you write something is important. So, when lexical environment is being talked about, *where* code is written and *what* surrounds it are taken into consideration.


### Scope Chain

Scope chain is what helps the JavaScript engine know which value to pick for a certain variable name if there are different definitions of that variable in different scopes. So when a variable is used, the JavaScript engine will look for the variable's value in the current scope. If it doesn't find the variable, it will go to the outer scope and the process continues(climbing up the scope chain) until the variable is found or when it reaches the global scope. It is also important to note that scope chain in JavaScript is lexically defined and so by merely looking at the code, we can see what the scope chain will be. Consider the following example.

```js
// Global scope
const myBook = "Living your best life";

function estate () {
  const myBook = "How to be a Ninja";

  function myHouse() {

    function myRoom() {
      console.log(myBook);
    }
    myRoom();
  }
  myHouse();
}

estate();
// -> How to be a Ninja
```
Did you notice how the value of `myBook` was found and used even though it wasn't declared in `myRoom`'s scope? This is a simple example of scope chaining in JavaScript. When the JavaScript engine finds out that `myBook` isn't in `myRooms`'s scope, it climbs up to `myHouse`'s scope. On getting there it still can't find `myBook` and it climbs up once again then finds it in an outer scope. Notice that when the value of `myBook` was found, the JavaScript engine never had to go up the global scope again to use the value of `myBook` declared there. It stops on finding a value in the nearest outer scope. 


The following are important points about scope chain to always keep in mind.

- Scope chain in JavaScript is lexically defined
- The scope of a function only gets popped out of the stack when it has finished executing
- When the JavaScript engine doesn't find the value of a variable in the current scope, it goes up the scope chain(it keeps checking the outer scope) until it finds a defined value



## Closures in action


```js
function greet(sayThis) {
  return function(name) {
    console.log(`${sayThis} ${name}`);
  };
}
```

The snippet above is a function which when invoked with an argument returns another function as shown below. 

```js
greet("Hello");

/* ƒ (name) {
    console.log(`${sayThis} ${name}`);
  } */
```

The `greet` function returned another function as expected. Notice also what happens when this returned function is assigned to a variable and invoked with an argument.


```js
const greeting = greet("Hello");
greeting("Erons")

// Hello Erons
```

Did you notice that `greeting` could still access "Hello" which was used to invoke `greet` earlier? 


Despite the fact that the execution context of `greet` is gone(since it had been popped out of the stack), it's variable could still be accessed by `greeting`. 


```js
// Global scope
function outer() {
  // outer function scope
  return function () {
    // inner function scope
    console.log(name);
  }
}

const name = "Erons";
const inner = outer();

function general() {
  const name = "Ehis";
  inner();
}

general();
```

On looking at the above snippet, one could easily think that the output would be *"Ehis"*. But let's see why it's not so.


During the execution phase, after the scope chain has been created, `name` and `inner` are assigned their respective values in the global scope. `general()` is then executed with it's own scope added on top of the call stack. In this scope, `name` is assigned a value and `outer()` is executed. The process of creating a new scope is repeated again and on getting to `console.log(name)`, the JavaScript engine begins to go up the scope chain to look for where `name` is defined. It first goes to the outer scope which is `outer` then `outer`'s outer scope which is `general` where a defined value for `name`(*"Erons"*) exists. This value is logged to the console, and `general`'s scope gets popped out of the stack. Note that `general()` returns *"Erons"* and not *"Ehis"* because *"Erons"* is the value of `name` that is closest to `outer`'s scope so there was no need to go up to the global scope to look for  the value of `name` there. 



## Practical applications of Closures


As we've learnt, closures are an integral part of JavaScript and it's very likely you've used them before. There are many applications of closures but we'll consider just one in this article.

### Emulating private methods

Private methods are useful for restricting access to code and managing global namespace. In JavaScript, closures can be used to encapsulate private methods. Consider the example below.

```js
const person = (age) => {
  let ageOfPerson = age;

  return {
    currentAge: function() {
      return ageOfPerson;
    },
    futureAge: function(years) {
      ageOfPerson += years;
      return ageOfPerson;
    }
  };
};

const erons = person(17);

erons.currentAge(); // 17
erons.futureAge(10); // 27

```

In this example, we won’t be able to access `ageOfPerson` from anywhere outside of `person`. We’ve just created a private variable! The `person` function returns an object with other functions in it, so when `erons.currentAge()` is called, the function is able to “remember” its initial reference to `ageOfPerson`. That's as a result of closure, where a function “remembers” its lexical scope, even when the function is executed outside that lexical scope.        



**Conclusion**: Closures are everywhere in JavaScript. Understanding how they work and taking advantage of them can go a long way in making you a much more effective and better developer. 
