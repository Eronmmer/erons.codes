---
title: How to build a REST API with Express and MongoDB
date: "2020-03-13T22:40:32.169Z"
template: "post"
draft: false
slug: "/how-to-build-a-rest-api-with-express-and-mongodb/"
category: "Node.js"
tags:
  - "MongoDB"
  - "Node.js"
  - "Express.js"
description: "In this article, I'll show you how to build a simple REST API using Express and MongoDB."
socialImage: "/media/how-to-build-a-rest-api-with-express-and-mongodb.png"
---

![Node.js and MongoDB](/media/how-to-build-a-rest-api-with-express-and-mongodb.png)


In my [previous article](https://erons.codes/getting-started-with-express-and-mongodb), I explained how to quickly get started with Express. In this article, I'll show you how to build a simple REST API using Express and MogoDB.

## What's an API?

According to Wikipedia, 

An Application Programming Interface is a computing interface exposed by a particular software program, library, operating system or internet service, to allow third parties to use the functionality of that software application.


<!-- talk more about apis, their uses and applications in day to day software development(quickly) -->

## What exactly are we building?

We'll be building a REST API for a simple app that basically lets users to the following:

- Login to their account
- Create a new account
- Make posts in form of text
- View only their own posts
- Delete posts
- Edit posts
- Delete their accounts

That's it!

If you get stuck along the way or just want to view the code for the completed app, check out the GitHub repository I created for this article here https://github.com/eronmmer/simple-express-api

## Prerequisites

- Basic understanding of Node.js
- Node.js installed
- MongoDB installed

If you don't have MongoDB installed, you could create a cluster on MongoDB Atlas and follow the instructions in the documentation on how to connect it to your application.

Without further ado, Let the party begin. ⚡

## Set up your application

Create your project:

```bash
mkdir simple-express-api && cd simple-express-api && npm init --y && touch index.js
```

```bash
mkdir routes && cd routes && touch auth.js posts.js && cd .. && mkdir models && cd models && touch User.js Post.js && cd ..
```

The first command will create a project directory, an entry point for your app and a package.json file for you to get started. The second command will create a `routes` folder and two files that will contain some code for our different routes. A `models` folder will also be created where `User.js` and `Post.js` files. These will contain models defined by mongoose(Don't worry about routes and models for now. I'll get to it soon)

Your project should now look like this

```
simple-express-api/
 index.js
 package.json
 routes/
  auth.js
  posts.js
 models/
  Post.js
  User.js
```

Next, install dependencies:

```bash
npm i express mongoose bcryptjs jsonwebtoken && npm i -D nodemon
```

The command above will install the needed dependencies and dev dependencies. Mongoose is an ODM for MongoDB that enables us easily interact with MongoDB databases in node.js applications. bycryptjs will be used to hash passwords so as to keep them secure. jsonwebtoken enables easily authenticate users and nodemon automatically restarts our sever when changes are being made to our files.

In the scripts section of your `package.json` file, include some npm scripts so it would look like this:

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
},
```

## Can we start writing some code? 🔥

I won't explain every bit but don't fret, I'll include descriptive comments so you don't get lost along the way.

In your index.js file, add the following code:

```js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// connect to mongodb via mongoose
(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/express-api", {
		// if you don't add the following, mongoose will log annoying warnings to the console
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true 
    });
    console.log("MongoDB Connected!!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

// initialize middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});


// This will ensure your app runs correctly on the specified port
// make sure this is always at the bottom of your file
app.listen(5000, () => {
  console.log("Server started on port 5000");
})
```

First, we brought in Express and Mongoose to our application and made a connection to a database. In this case, assuming we have MongoDB installed, even if we have no "express-api" database, it will instantly be created. Then we set our app to listen on port 5000.
<!-- research and add explanation later -->

In your terminal, run `npm run dev`. You should see logs showing that the server started and MongoDB connected successfully. 

### Create models

Mongoose enable us create models for our database documents. We'll be creating `User` and `Post` models. This means, there will be two collections in our database. One for users and the other for posts. Add the following to your `User.js` and `Post.js` files(located in your models folder) respectively.

```js
const mongoose = require("mongoose");

const User = mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true,
		unique: true
		// email field must be a string, is required and must be unique
	},
	password: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model("user", User);
// documents located in our "user" collection will follow the schema defined above
```

```js
const mongoose = require("mongoose");

const Post = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
		// what the above means is each post document will have a user field that contains a user id from the user collection. Think of it like an identifier indicating the author of a post
	},
	postContent: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("post", Post);
```

### Authentication

Our signed in users have to be authenticated so as to access protected routes. And in the case of this application, only signed in and authenticated users can make, view, edit, delete posts and delete their account. Now let's write an authenticator middleware to handle this.

Middleware functions are functions that perform tasks like executing code, making changes to request and response objects, calling another middleware and so on. They basically determine the flow of a request-response cycle.

So, our authenticator middleware will be called whenever our users attempt to hit any protected route. It will verify that they're making requests with a valid token so they would be able to perform various operations. 
In your root directory, create a `middleware` folder and an `authenticator.js` file. Then add the following code 

```js
const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
	const token = req.header("Authorization");
	// on the client, "Authorization" must be the key of the header carrying the token

	if (!token) {
		return res.status(401).send("Authorization denied!");
	}
	try {
		const decoded = jwt.verify(token, "my-deepest-secret");
		// make sure this secret is the same string you used to while issuing the token
		req.user = decoded.user;
		next();
		// move on and execute the next code
	} catch (err) {
		console.error(err);
		res.status(401).send("Authorization denied!");
	}
};

module.exports = authenticator;
```


Now that we've defined out models and created an authentication middleware, let's start adding features to our application.

### Create user

First, lets add the functionality to enable users register or create accounts. In your `auth.js` file in the `routes` folder, add the following code. 

```js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const authenticator = require("../middleware/authenticator");
// our authenticator middleware we created earlier

// create a new account, Public route
router.post("/register",  async (req, res) => {
	try {
		const { name, email, password } = req.body;
		// check if user exists
		let user = await User.findOne({ email })
		if (user) {
			return res.status(400).send("user already exists. Choose another email address!")
		}
		// hash password
		const salt = await bcrypt.genSalt(15);
		const hashedPassword = await bcrypt.hash(password, salt);

		user = new User({
			name,
			email, 
			password: hashedPassword
		});
		// save user to database
		await user.save();
		res.json({ msg: "account successfully created", user: { name: user.name, email: user.email, id: user._id } });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});
```

### Login

We'll be using jsonwebtoken to authenticate logged in users. So, once a user logs in successfully, a token will be sent to the client. This token will then be used to authenticate users(our authenticator middleware will handle this) so they can access protected routes.

below register, add the following

```js
// login user, Public route
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email })
		if (!user) {
			return res.status(400).send("Incorrect username or password");
			// you don't want attackers to know what's actually going on right? :)
		}
		// verify password match
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(400).send("Incorrect username or password"); 
		}

		// successfully logged in. Now, generate and send token
		const payload = {
			user: {
				id: user.id
			}
		};
		// this payload is the user id information that will be encrypted, stored in the token and decrypted whenever needed.

		jwt.sign(
			payload, "my-deepest-secret",
			{
				expiresIn: "1 day"
				// token expires after 1 day
			},
			(err, token) => {
				if (err) throw err;
				res.json({ token, msg: "Logged in successfully." });
			}
		);
		// if everything goes well, after successful login, a token will be sent to the client
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal server error")
	}
});
```

when a user logs in successfully, a token will be sent to the client for authentication.

### Get logged in users

We need to have a way to get the details of authenticated users. To do this, we'll be making a GET request. Below login, add the following.

```js
// verify logged in user. Private route
router.get("/", authenticator, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(401).send("Not allowed!");
		}
		res.json({ msg: "authenticated", user: { name: user.name, email: user.email}} );
		// show user their details cause they've been authenticated
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal server error");
	}
});
```

We brought in our authenticator middleware to ensure that only logged in users can access this route.

### Delete user account

Let's add functionality to enable users delete their accounts. When they do this, their details will be permanently erased from the database. Add the following code to your `auth.js` file. 


```js
// delete own account. Private route
router.delete("/", authenticator, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).send("User doesn't exist");
		}

		if (user.id.toString() !== req.user.id) {
			return res.status(401).send("Not allowed!!");
			// if a user somehow tries to delete the account of another user, send a "not authorized" status
		}

		// find the user id in the collection and delete their document
		await User.findByIdAndDelete(req.user.id);
		res.send("account successfully deleted!");
	} catch (error) {
		console.error("Internal server error");
		res.status(500).send("Internal server error");
	}
});
```

Make sure you export your router by adding this at the end of your `auth.js` file.

```js
// with this, we can call and use our auth route anywhere in our application
module.exports = router;
```

For any of our routes to work, we'll have to call them in our index.js file. Let's do that for our `auth` route(we'll do the same for `posts` when we're done writing the functionalities). Add the following code just above the last statement(the one that contains `app.listen`) in your index.js file.

```js
app.use("/auth", require("./routes/auth"));
```

Now, express will always reference your `auth.js` file whenever you make a request to `/auth/whatever`. 

We'll now create functions to enable users create, read, update and delete posts. All routes will be private, so users can only interact with their own posts.

### Create posts

In your `posts.js` file in the `routes` directory, add the following.

```js
const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const authenticator = require("../middleware/authenticator");
const router = express.Router();

// create a post. private route
router.post("/", authenticator, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(401).send("Not allowed!");
		}
		const { postContent } = req.body;
		const post = new Post({
			user: req.user.id,
			postContent
		});
		
		await post.save();
		res.json({ msg: "post successfully created", post })
		// send back success message with post content to the client
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});
```

It's important to know that mongodb instantly issues an &nbsp; `_id` field to every document you save. But with mongoose, we can access this value with just `id`. This means if we need the id of a document, we don't necessarily need to do something like `user._id`. 

### Get a post

To get or read a post, we'll need it's id. Add the following to your file

```js
// get a post. Private route
router.get("/:postId", authenticator,  async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).send("post doesn't exist");
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).send("Not allowed!");
			// sorry fella, you can't view the posts of another user :)
		}

		res.json({ post: { user: post.user, postContent: post.postContent, id: post.id, date: post.date}})
	} catch (err) {
		console.error(err);
		if (err.kind === "ObjectId") {
			return res.status(404).send("post doesn't exist"); 
		}
		// this is to ensure our app doesn't break if we use an object id that mongodb doesn't support
		res.status(500).send("Internal Server Error");
	}
});
```

### Edit a post

Just like getting a post, we'll need it's id to edit it. 

```js
// edit a post, Private route
router.put("/:postId", authenticator, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).send("post doesn't exist");
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).send("Not allowed!");
		}

		const { postContent } = req.body;
		post.postContent = postContent;
		await post.save();
		res.json({msg: "post successfully edited", post: { user: post.user, postContent: post.postContent, id: post.id, date: post.date}})
	} catch (err) {
		console.error(err);
		if (err.kind === "ObjectId") {
			return res.status(404).send("post doesn't exist"); 
		}
		res.status(500).send("Internal Server Error");
	}
});
```

### Delete a post

easy-peasy 😀

```js
// delete a post, private route
router.delete("/:postId", authenticator, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).send("post doesn't exist");
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).send("Not allowed!");
		}

		await Post.findByIdAndDelete(req.params.postId);
		res.send("post successfully deleted.")
	} catch (err) {
		console.error(err);
		if (err.kind === "ObjectId") {
			return res.status(404).send("post doesn't exist"); 
		}
		res.status(500).send("Internal Server Error");
	}
});
```

don't forget to export your router.

```js
module.exports = router;
```

and make your entry file aware of your new, hot route 🔥. 

```js
// add this above or below where you did the same thing for auth
app.use("/posts", require("./routes/posts"));
```

And that's it. You've just created a CRUD REST API with authentication. ⚡⚡


## Testing

You could write automated tests or manually test all your endpoints with a tool like Postman. If you're using Postman and following along with the code we just wrote, keep the following in mind

- When making POST, PUT or PATCH requests, add a `Content-Type` header with the value of `application/json`.

- When you want to access protected routes, include your token in an `Authorization` header.

## Conclusion

Express and MongoDB are two very powerful technologies that bring out the fun in building applications with Node.js.

