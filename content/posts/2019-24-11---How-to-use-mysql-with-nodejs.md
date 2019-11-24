---
title: How to use MySQL with Node.js
date: "2019-11-24T22:40:32.169Z"
template: "post"
draft: false
slug: "/how-to-use-mysql-with-nodejs/"
category: "Node.js"
tags:
  - "MySQL"
  - "Node.js"
  - "Express.js"
description: "In this article, we'll see how to quickly create, connect and use a MySQL database in a Node.js application."
socialImage: "/media/how-to-use-mysql-with-nodejs"
---
![how-to-use-mysql-with-nodejs](/media/how-to-use-mysql-with-nodejs.png)

Node.js is a pretty awesome JavaScript runtime that can be used to build robust web applications usually with NoSQL databases like MongoDB. In this article, we'll see how to quickly create, connect and use a MySQL database in a Node.js application. Let's get started. ⚡

## Prerequisites

- Node.js installed
- MySQL server and MySQL workbench, phpMyadmin or any other tool that you can use to easily manage your MySQL databases
- Basic understanding of Node.js
- Basic understanding of MySQL queries

## What are we building?

We're going to use MySQL in our Node.js app to create an Employees list database and run basic queries that enables us create, get, update and delete basic data of employees in a company. We'll use Express.js so we can quickly set up routes and also a Node.js driver for MySQL that will enable us seamlessly use MySQL in our application.  


## Setup project and install dependencies

Create your project folder, entry file and a package.json file.

```bash
mkdir employees-list
cd employees-list
touch index.js

npm init -y
```

The last command above will scaffold a basic package.json file in your root directory that will contain information about your application like dependencies and scripts.

Next, install express, the mysql package for node.js and nodemon(nodemon keeps our sever running and prevents us from restarting whenever a change is made to our file)

```bash
npm i express mysql nodemon
```

When the installation is complete, edit your package.json file by replacing:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

with 

```bash
"scripts": {
    "start": "nodemon index"
  }
```

Now, whenever we run `npm run start`, our sever starts and nodemon keeps watching our entry file for changes.

## Create a simple express server

In your index.js file, add the following code.


```js
const express = require("express");
const mysql = require("mysql");

const app = express();

app.listen("4000", () => {
  console.log("Server started on port 4000")
})
```

Run `npm run start` and navigate to port 4000 on your browser. You should see something like "Cannot GET /" displayed in the browser. That shows that our server is up and running. 


## Establish a connection

Now let's establish a connection. Add the following code to your index.js file after the line containing `const app = express()`.

```js
// ----- 

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "my_password"
});

// connect
db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// -------

```

The `createConnection()` method lets you add the host name of the database you're connecting to which is "localhost" in this case, the MySQL user to authenticate, the password for that user and the name of the database to use for the connection which we haven't included yet because it hasn't been created.

If you've done everything correctly, you should now see "MySQL Connected" in your console. 


## Create a Database

Add the following code to your entry file to create a database.

```js
// --------


// create database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE employees_list";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database successfully created");
  });
});

// -------
```

On navigating to `localhost:4000/createdb`, you should see "Database successfully created" displayed in the browser.  You've just created a MySQL database named "employees_list".

I'm using MySQL workbench and this is how my empty database looks.

![how-to-use-mysql-with-nodejs---empty_employees_db.PNG](/media/how-to-use-mysql-with-nodejs---empty_employees_db.PNG)

Now, let's create a table.

## Create a Table

Add the following code to your index.js file

```js
// ----------


// create table
app.get("/create_employees_table", (req, res) => {
  let sql =
    "CREATE TABLE employees(id int AUTO_INCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(100), location VARCHAR(100), job_title VARCHAR(100), PRIMARY KEY (id))";

  db.query( sql, ( err, result ) => {
    if ( err ) throw err;
    console.log( result );
    res.send("Employees table created.")
  })
});


// --------
```

The above code creates a table named "employees" with columns `id`, `first_name`, `last_name`, `email`, `location` and `job_title`. Note that on navigating to `localhost:4000/create_employees_table` we get an error on the console telling us that no database had been selected. Now, remember that when we established a connection earlier, we mentioned that we'd add our database which hadn't been created then. Now go back to your code where we established a connection and look for the following. 

```js
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "my_password"
});
```

Add the database that has been created. So the snippet above now becomes:

```js
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "my_password",
  database: "employees_list"
});
```

Now go back to `localhost:4000/create_employees_table`, you should see "Employees table created" displayed in the browser. You've just create a table for your database. On MySQL workbench, this is how my database now looks.

![how-to-use-mysql-with-nodejs---employees_list_with_table.PNG](/media/how-to-use-mysql-with-nodejs---employees_list_with_table.PNG)


## Add Employees to Table

Now let's add employees to our created table. We're going to add five employees at once. Add the following to your index.js file.

```js
// Add employees
app.get("/add_employees", (req, res) => {
  let sql =
    "INSERT INTO employees (first_name, last_name, email, location, job_title) values ('Eric', 'Jones', 'eric@jones.com', 'Lagos', 'Frontend Engineer'), ('Jason', 'Henry', 'jason@henry.com', 'Abuja', 'Backend Engineer'),('Jin', 'Yiang', 'jin@yiang.com', 'Beijing', 'Product Designer'),('Richard', 'Hendricks', 'richy@gmail.com', 'Silicon Valley', 'Fullstack Engineer'),('Erons', 'Troy', 'troy@yahoo.com', 'Abuja', 'DevOps Engineer');";

   db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Employees added to table.");
  });
});
```

Navigate to `localhost:4000/add_employees` and you should see "Employees added to table." displayed in the browser. You've just inserted five rows to your employees table. This is how my database now looks. 

![how-to-use-mysql-with-nodejs---employees_added_table.PNG](/media/how-to-use-mysql-with-nodejs---employees_added_table.PNG)

## Get all Employees

Add the following to your code to get all employees.

```js
// Get all employees
app.get( '/get_all_employees', ( req, res ) => {
  let sql = 'SELECT * FROM employees';
  db.query( sql, ( err, results ) => {
    if ( err )
      throw err;
    console.log( results );
    res.send(results)
  })
})

```

On navigating to the `/get_all_employees` route, you should get a list of all the employees in the "employees" table. A request could be made to this endpoint from a frontend app to get the data of all employees.

## Get a Specific Employee

Add the following to your code to get an employee from their id.

```js
// Get a particular employee
app.get( '/get_employee/:id', ( req, res ) => {
  let sql = `SELECT * FROM employees WHERE id = ${req.params.id}`;
  db.query( sql, ( err, result ) => {
    if ( err )
      throw err;
    console.log( result )
    res.send(result)
  })
})
```

On navigating to `/get_employee/2` we should get the data of the employee whose id is 2. A request from a frontend app could also be made to this route to get data of a specific employee.


## Update an Employee's data

To update an Employee's location, add the following to your code.

```js
// update employee's data
app.get( "/update_employee/:id", ( req, res ) => {
  let newData = "Oklahoma";
  let sql = `UPDATE employees SET location = "${newData}" WHERE id = ${req.params.id}`;
  db.query( sql, ( err, result ) => {
    if ( err )
      throw err;
    console.log( result );
    res.send("Employee updated")
  })
} )
```

On navigating to the `/update_employee/5` route, your database should be updated and the Employee whose id is 5 now has their location updated to "Oklohoma". You can confirm this by viewing your database manager or navigating to the route that displays a particular user.


## Delete an Employee

To delete an employee from the database, add the following to your code.

```js
// delete Employee
app.get( "/delete_employee/:id", ( req, res ) => {
  let sql = `DELETE FROM employees WHERE id = ${req.params.id}`;
  db.query( sql, ( err, result ) => {
    if ( err )
      throw err;
    console.log( result );
    res.send("Employee successfully deleted")
  })
})
```

On navigating to the `/delete_employee/3` route, we successfully delete Jin Yiang from our database. You can confirm this as well from your database manager. 


### Conclusion

You've learnt how to create, connect and perform operations on a MySQL database from your Node.js application. Now go make something cool. 😃
