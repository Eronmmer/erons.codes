---
title: Getting started with Sass
date: "2019-11-02T22:40:32.169Z"
template: "post"
draft: false
slug: "/getting-started-with-sass/"
category: "Sass"
tags:
  - "Sass"
  - "Frontend Development"
description: "If you've never heard of Sass before, want a quick brush up or just want to get started using Sass, read on cause you've found the right article. In this article, we'll discuss the main features of Sass, installation guides and how to use it in your projects."
socialImage: "/media/getting-started-with-sass.jpg"
---

![getting-started-with-sass.jpg](/media/getting-started-with-sass.jpg)


If you've never heard of Sass before, want a quick brush up or just want to get started using Sass, read on *cause* you've found the right article. In this article, we'll discuss the main features of Sass, installation guides and how to use it in your projects. 

## What exactly is Sass?

Sass(short for Syntactically Awesome Style Sheets) is a CSS preprocessor that compiles to plain CSS. Sass comes with really awesome features like nesting, variables, loops, mixins, inline imports, functions and many more. These features help keep large stylesheets [DRY](https://www.codementor.io/joshuaaroke/dry-code-vs-wet-code-89xjwv11w), maintainable and readable. Sass gives you *superpowers* that makes writing CSS fun.

A CSS preprocessor is a scripting language that lets developers write stylesheets following the preprocessor's own unique syntax and then compile it to pure CSS. Other examples of CSS preprocessors are LESS, Stylus and PostCSS. In this article, we'll focus only on Sass. 


## `.sass` or `.scss`?

Sass supports two different syntaxes. One uses the `.sass` extension while the other uses the `.scss` extension. When Sass first came out, it mainly supported the `.sass` syntax. It was not really welcomed by many developers because it was quite different from conventional CSS. It used indentation in place of curly braces and didn't require semicolons. 

Later on, Sass changed it's main syntax to SCSS which uses the `.scss` extension. It's basically a superset of CSS which means every valid CSS is also valid SCSS. When compared with the Indented syntax, SCSS is relatively easier to understand, get started with and more popular. In this article, I'll be using SCSS.



## Installation 


There are several ways of installing Sass but I'd recommend you install a package known as `node-sass` from the command line.(*Don't fret if you're not conversant with the command line. You're just going to run one or two commands*)

If you have Node.js installed, run 

```bash
npm install -g node-sass
```
<!-- 
or 

```bash
yarn install node-sass
``` -->

To confirm that the installation was successful, run `node-sass -v`. It will show you the version of node-sass you installed. It's now time to see how to use it on the command line to compile Sass  to CSS files. 

First create a project or folder and name it whatever you want, then create a `source.scss` file and copy and paste the following code in it. Don't worry if you don't understand the code. We'll go over it shortly. 

```scss
$base-color: #333;
$primary-color: lighten(blue, 30%);

@mixin buttons {
  border: 1px solid $base-color;
  background: $primary-color;
  border-radius: 4px;
}

p {
  color: $base-color;
}

.btn {
  @include buttons
}
```
To compile the code, run the following on your terminal

```bash
node-sass source.scss style.css
```

You should get the following  as your compiled `style.css` file.

```css
p {
  color: #333; }

.btn {
  border: 1px solid #333;
  background: #9999ff;
  border-radius: 4px; }
```

If you want your files to be automatically compiled whenever a change is detected, you can run the following command. This will *watch* your sass file for changes and compile them immediately.

```bash
node-sass source.scss style.css -w
```

## Main features

As you probably already know, Sass has a number of awesome features. Let's consider some of them.

- Variables
- Nesting
- Partials 
- Mixins
- Inheritance
- Operators


### Variables

Just like in other programming languages, Sass supports the use of variables to store information that can be reused. Variables begin with a dollar sign($) and can be used to store colours, strings, booleans, numbers, null, lists and maps. Defining variables alone will not output any CSS code. You'll have to make use of these variables in CSS declarations.

```scss
$primary-color: blue;
$max-width: 1000px;

.btn {
  background: $primary-color;
}

.container {
  max-width: $max-width;
}

/* Compiles to:

.btn {
  background: blue; }

.container {
  max-width: 1000px; }

*/
```

Sass has variable scope. If you declare a variable within a selector, it will be scoped within that selector and it will overwrite other values declared outside of that scope.

```scss
$base-size: 1rem;

p {
  $base-size: 1.3rem;
  font-size: $base-size;
}

small {
  font-size: $base-size;
}


/* 
Compiles to:

p {
  font-size: 1.3rem; }

small {
  font-size: 1rem; }

*/

```

There is a `!global` flag in Sass that lets you create global variables from within a selector and a `!default` flag that basically assigns a value to a variable if the variable hadn't been assigned before. 


```scss
.button {
  $fontSize: 16px !global; 
  font-size: $fontSize;
}

.card {
  font-size: $fontSize;
}

/*
Compiles to:

.button {
  font-size: 16px; }

.card {
  font-size: 16px; }

*/
```


```scss
$max-width: 1000px;

.container {
  $max-width: 900px !default; 
  max-width: $max-width;
}

/* 
Compiles to:

.container {
  max-width: 1000px; }

*/
```

### Nesting

Sass lets you have declarations inside of declarations or nest CSS selectors in a way that follows the visual hierarchy of your HTML files. This is not allowed in conventional CSS. Nesting makes your stylesheet look cleaner, easy to read and understand. It's also important to note that overly nesting selectors can lead to unmaintainable code because styles become too specific. 


```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;
    }
  }

  
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }

}
```

You can also use the ampersand sign(&) to reference a parent selector.

```scss
.nav {
  .main-list {
    margin: 0;
    padding: 0;

    &__links {
    color: blue;

      &:hover {
        text-decoration: underline;
      }
      &:visited {
        color: purple;
      }
  }
  }
}

/* 
Compiles to: 

.nav .main-list {
  margin: 0;
  padding: 0; }
  .nav .main-list__links {
    color: blue; }
    .nav .main-list__links:hover {
      text-decoration: underline; }
    .nav .main-list__links:visited {
      color: purple; }

*/
```

### Partials

A Sass partial is a file that contains some code that can be included in other Sass files. As projects grow, the need to keep stylesheets more organized in separate files becomes very essential and partials help us achieve just that in Sass. Partials are usually preceded by an underscore which lets the Sass compiler know that the file doesn't need to be compiled. If you want to import a `mixins` partial into your base `styles.scss` file, you can do something like this:

```scss
@import "mixins"
```

Note that you don't need to add the underscore preceding the partial or the `.scss` extension in your import. Sass fortunately is smart enough to figure all that out. One interesting thing about Sass imports is that unlike CSS imports where https requests are always made to the server which negatively affects the overall performance of the webpage, Sass imports only add the code in the partial to the file you're importing into and a single file is compiled and served to the web browser. 


### Mixins

Mixins are groups of CSS declarations that can be reused throughout a project. We all know that repeatedly writing some things in CSS can be a pain in the neck. Mixins help us avoid such stress. To create a mixin, use the `@mixin` directive followed by the name, arguments(if necessary) in parenthesis, and a pair of curly braces that contains the rules. To use a mixin, include it as a CSS declaration starting with `@include` followed by the name of the mixin. 


```scss
@mixin media($width) {
  @media #{$width} {
    @content;
  }
}

.container {
  width: 900px;
  @include media("(max-width: 700px)") {
    width: 95%;
  }
}

/* 
Compiles to: 

.container {
  width: 900px; }
  @media (max-width: 700px) {
    .container {
      width: 95%; } }

*/
```


### Inheritance

Inheritance in Sass lets you share CSS properties from one selector to another. This goes a long way in keeping your code [DRY](https://www.codementor.io/joshuaaroke/dry-code-vs-wet-code-89xjwv11w). Consider the following example. 

```scss
%btn {
  height: 30px;
  font-size: 16px;
  padding: 0 2rem; 
  border-radius: 4px;
}

%red-text {
  color: red;
}

.btn-success {
  @extend %btn;
  border-color: green;
}

.btn-warning {
  @extend %btn;
  background: yellow;
  color: white;
}

.btn-danger {
  @extend %btn;
  background: red;
  color: white;
}


/* 
Compiles to: 

.btn-success, .btn-warning, .btn-danger {
  height: 30px;
  font-size: 16px;
  padding: 0 2rem;
  border-radius: 4px; }

.btn-success {
  border-color: green; }

.btn-warning {
  background: yellow;
  color: white; }

.btn-danger {
  background: red;
  color: white; }

*/
```
Notice how our compiled CSS looks clean. Note too that the CSS in `%red-text` wasn't generated because it was never extended.


### Operators

There are a number of operators in Sass that lets you perform math operations without much hassle. The following operators are supported in Sass:

- Addition: `(+)`
- Subtraction: `(-)`
- Multiplication: `(*)`
- Division: `(/)`
- Modulo: `(%)`
- Equality: `(==)`
- Inequality: `(!==)`
- Relational Operators: `(<, <=, >, and >= )`
- Boolean Operators: `(or, and, not)`

There are some important things to keep in mind when performing math operations in Sass. 

If you want to use the division operator `(/)` on non-variable values, you'd need to wrap them in parenthesis like this. 


```scss
.btn {
  padding: (16px/14px);
}
```

Also, you can't mix value units.


```scss
$max-width: 100% - 30px;
// Error...
```

## Usage

 Let's see how to quickly set up Sass in React and Vue projects.

### Setting up Sass in a React project

Assuming you're using the latest version of Create React App, follow the steps below to use Sass in your React app.

First, install node-sass by running:

```bash
npm install node-sass --save

# or 

yarn add node-sass
```

Then, change your `src/App.css` file to `src/App.scss` and your `src/App.js` file to import `src/App.scss`. Create React App will then automatically compile your base Sass file along with other files with a `.scss` extension. 

You can also share variables between Sass files by using Sass imports. Note that imports from `node_modules` must be prefixed with a `~` symbol.

```scss
@import 'styles/_colors.scss'; // importing a colors partial from a styles directory
@import '~nprogress/nprogress'; // importing a css file from the nprogress node module
```

And that's it! You can now use Sass in your Create React App project.

### Setting up Sass in a Vue project

Vue CLI comes with support for CSS processors and you can choose which one to use when creating a project with it. If you did not do so, just manually install the corresponding webpack loader. 

```bash
npm install -D sass-loader sass
```

Then you can import the corresponding file types, or use them in `*.vue` files with:

```vue
<style lang="scss">
$color: red;
</style>
```


**Conclusion:** Sass is a very beautiful CSS preprocessor that helps you achieve a lot while making your life easier. Wanna learn more about Sass and best practices? Check out the resources below:


- [Sass official documentation](https://sass-lang.com/documentation)
- [An opinionated styleguide for writing sane, maintainable and scalable Sass](https://sass-guidelin.es)

