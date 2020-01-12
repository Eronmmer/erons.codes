---
title: Getting started with Express
date: "2020-01-11T22:40:32.169Z"
template: "post"
draft: false
slug: "/getting-started-with-express/"
category: "Node.js"
tags:
  - "Express"
  - "Node.js"
  - "JavaScript"
description: "In this article, I'll quickly guide you on how to set up a simple Express workflow and basic things you need to know in order to get started with Express"
socialImage: "/media/javascript-call-apply-and-bind-methods.jpg"
---

![understanding-closures-in-javascript](/media/getting-started-with-express/main.png)

If you're a JavaScript developer, you've likely heard of or used Express before. It's a framework used for building web applications with Node.js. In this article, I'll quickly guide you on how to set up a simple Express workflow and basic things you need to know in order to get started with Express. Let the party begin. 💃

## Some Features of Express

- **Aids fast development:** Some features that require writing tons of lines of code in *pure* Node.js are easily achieved in Express with just few lines of code thereby speeding up development time and improving the readability of code.

- **Unopinionated:** Express doesn't force you to structure your application in a specific way. So, there are very few restrictions on the best way to achieve a task. This gives developers the opportunity to quickly get started using the framework and explore several patterns.

- **Routing:** The advanced and dynamic routing mechanism provided by Express makes it easy for us to quickly build APIs and structure our app.

- **Middleware functions:** Middleware functions are functions that perform tasks like executing code, making changes to request and response objects, calling another middleware and so on. They basically determine the flow of a request-response cycle.

- **Templating:** Express provides support for a number of Template Engines that enable the use of static template files that are dynamically transformed and sent to the client.

## Basic Setup

Make sure you have Node.js installed.

Create your project folder, a package.json file, a .gitignore file and an entry point for your app.

```bash
mkdir practising-express
cd practising-express

npm init -y
touch .gitignore index.js
echo "/node_modules" > .gitignore
```

Install express.

```bash
npm i express
```

After successfully installing express, add the following code to your index.js file.

```js
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4002;

app.get("/", (req, res) => {
  res.send(
    "Hurray, You've just launched an Express app. Welcome to the party!!"
  );
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

The code above sets up a very simple Express server that listens for connections locally on port 4002. Whenever a GET request is made to the root route`(/)` or when you visit [http://localhost:4002/](http://localhost:4002) the server responds with `Hurray, You've just launched an Express app. Welcome to the party!!`

Run the app with the following command.

```bash
node index
```

If you don't want to go through the stress of restarting your server whenever you make changes to your application, install nodemon as a dev dependency and create a script for it.

```bash
npm i -D nodemon
```

In your `package.json` file, add the following to your scripts so you can use nodemon to start your app. Nodemon watches your files and im\mediately restarts your server whenever it detects any changes in your application.

```json
"dev": "nodemon index"
```

Now, run your app with the following command so nodemon can watch your file for changes.

```bash
npm run dev
```

When you visit [http://localhost:4002/](http://localhost:4002/) on your browser, you should see something like this:

![Screenshot of Express app homepage](\\media\getting-started-with-express\welcome.PNG)

## Basic Routing

A route is an endpoint that specifies and performs the operations of a particular client request. Routing with Express takes the following structure.

```js
app.method(path, handler)
```

Where `app` is an instance of Express, `method` is usually an HTTP method (`get`, `post`, `put`,  `delete` and so on). It could also be `all` to handle all HTTP requests or `use` to specify a middleware as the callback function. `path` is the endpoint at which requests can be made and `handler` is the function that gets called when the route is matched.

The application constantly listens for requests and whenever the `path` and HTTP `method` match, the `handler` or specified function is called.

### Examples

```js
// Simple GET method route that responds with "Welcome to our home page" whenever a GET request is made to the root route.
app.get("/", (req, res) => {
  res.send("Welcome to our home page")
})
```

```js
// Simple POST method route that responds with a success message whenever a POST request is made to the post route.
app.post("/posts", (req, res) => {
  res.send("Post successfully added")
})
```

```js
// Simple PUT method route.
app.put("/posts/:id", (req, res) => {
  res.send("Post successfully updated")
})
```

```js
// Simple DELETE method route.
app.put("/posts/:id", (req, res) => {
  res.send("Post successfully deleted")
})
```

### Route paths can also be string patterns or regular expressions

The following route path will match only `flavour` and `flavor`.

```js
app.get("/flavou?r", (req, res) => {
  res.send("Flavour or flavor")
})
```

The following route path will match `/abujadoiowew`, `/abuja`, `/abuja9489sldow` and so on as long as it begins with `abuja`.

```js
app.get("/abuja*", (req, res) => {
  res.send(`Welcome to the city of Abuja. Though you requested for ${req.originalUrl}`)
})
```

This route path matches both `javascript` and `typescript`

```js
app.get(/.*script$/, (req, res) => {
  res.send(`Though you requested for ${req.originalUrl}, I was expecting JavaScript or TypeScript`)
})
```

More than one callback function can handle a route provided `next` is used.

```js
app.get("/info", (req, res, next) => {
  console.log(new Date.now().toTimeString())
  next()
}, (req, res) => {
  res.send("This is very important")
})
```

## Serving Static Files

To serve a static file, you can use the `res.sendFile` method.

```js
// When a user visits the /about route, they'll see the static about.html file
app.get( "/about", ( req, res ) => {
  res.sendFile(path.join(__dirname, "about.html"))
})
```

To serve static files from a particular directory for example `public`, use `express.static` like so:

```js
app.use(express.static(path.join(__dirname, "public")));
```

Now, static files in the the `public` folder will be loaded when a user visits a corresponding url. For example [http://localhost:4002/style.css](http://localhost:4002/style.css) would display the style.css file in the folder.

If you want to specify a mount path for static files, you can do the following.

```js
app.use("static", express.static(path.join(__dirname, "public")));
```

All files in the `public` folder will now be loaded from the `/static` path. If there is an `about.html` file in the `public` directory, you can access it via [http://localhost:4002/static/about.html](http://localhost:4002/static/about.html) and not [http://localhost:4002/about.html](http://localhost:4002/about.html)

## Middleware functions

Middleware functions in Express are functions that are executed during an incoming request. They either return responses or pass them to a next middleware. They are an integral part of Express applications and are used in almost every codebase. Middleware functions can easily be created and can also be imported as external packages. It is important to note that routing is a use case of middleware functions. Let's consider other uses of these cool functions.

### Functions called for every client request

```js
app.use((req, res, next) => {
  console.log(`New ${req.method} request made to ${req.originalUrl} at ${new Date().toTimeString()}`);
  next();
});
```

The above middleware is called whenever a request is made by the client and prints out something like this to the console.

![timestamp-middleware](\media\getting-started-with-express\global-middleware.PNG)

### Handling errors

Use the following middleware to handle errors in your application. Make sure you include four parameters usually named `err`, `req`, `res` and `next`.

```js
// This middleware handles errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Server Error!')
})
```

### Handling 404 responses

In Express, 404 responses are not really a result of errors so they won't be caught by an error handler middleware. To handle them, add a middleware below all other functions like this.

```js
// This middleware handles invalid routes.
app.use((req, res) => {
  res.status(404).send("Sorry fella, I can't find that. 😞")
})
```

### Protecting private routes

We can use middleware functions to protect specific routes in our application. For example, if I want only authenticated users to access the `/customers` route, I can do this.

```js
// authenticator middleware
const authenticator = function(req, res, next) {
  const token = req.header("our-app-token");

  if (!token) {
    return res.status(401).send("Authorization denied!");
  }

  try {
    // add some code here to verify token and do some other stuff

    // call next middleware
    next();
  } catch (err) {
    next(err)
  }
};

// Private customers route can only be reached by authenticated users
app.get("/customers", authenticator, (req, res, next) => {
   try {
      res.send("Customers route")
   } catch(err) {
     next(err)
   }
});
```

Whenever a user that isn't authenticated tries to access the `/customers` route, the middleware sends a `401`(unauthorized) error. Notice how `next` is used along with `try catch` to give room for the error handler middleware discussed earlier to do it's job.

## Template Engines

Express supports a good number of Template Engines but in this article, we'll consider ejs.

To use ejs, first install it.

```bash
npm i ejs
```

Then set the view engine to ejs.

```js
app.set("view engine", "ejs")
```

By default, Express will load your template files from a `views` folder in your root directory but to specify otherwise, do this.

```js
app.set("views", "nameOfYourViewsFolder")
```

Inside your `vies` folder, create a file structure like this.

```bash
----- partials

-- header.ejs

-- footer.ejs

----- pages

-- contact.ejs

-- about.ejs
```

Add the following to header.ejs, footer.ejs, contact.ejs and about.ejs respectively

```html
<!-- /header/header.ejs -->
<h1>This is a header</h1>
```

```html
<!-- /partials/footer.ejs -->
<small>This is a footer!</small>
```

```html
<!-- /pages/contact.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Contact</title>
</head>
<body>
  <header>
   <%- include("../partials/header.ejs") %>
  </header>
  <p><%= contact %></p>
  <footer>
    <%- include("../partials/footer") %>
  </footer>
</body>
</html>
```

```html
<!-- /pages/about.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>About</title>
</head>
<body>
  <header>
   <%- include("../partials/header.ejs") %>
  </header>
  <p><%= about %></p>
  <footer>
    <%- include("../partials/footer") %>
  </footer>
</body>
</html>
```

In your index.js file, after setting the view engine to ejs with: 

```js
app.set("view engine", "ejs")
```

Add `/about` and `/contact` routes to render the `about.ejs` and `contact.ejs` files created earlier.

```js
app.get( "/about", ( req, res, next ) => {
  res.render("pages/about", {about: "This is an about page"})
})

app.get( "/contact", ( req, res, next ) => {
  res.render("pages/contact", {contact: "This is a contact page"})
})
```

## Resources

- To know more about Express, visit the official documentation [here](http://expressjs.com/)
- ejs has a number of cool features. Visit the official website [here](https://ejs.co/) to know more.

## Conclusion

We've considered some features Express provides us with and how to get started using them. Thank you so much for coming to my party. 🤸
