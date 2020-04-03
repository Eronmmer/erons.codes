---
title: Eslint and Prettier setup for React
date: "2020-04-03T22:40:32.169Z"
template: "post"
draft: false
slug: "/eslint-and-prettier-setup-for-react/"
category: "React"
tags:
  - "React"
  - "Eslint"
  - "Prettier"
description: "In this article, I explain how to setup Eslint and Prettier in a React application."
socialImage: "/media/eslint-and-prettier-setup-for-react.png"
---

![Eslint and Prettier](/media/eslint-and-prettier-setup-for-react.png)

Eslint is a configurable tool that basically finds and fixes problems in JavaScript code, thereby maintaining code quality. Prettier on the other hand is a code formatter that supports many languages. These two tools can be used seamlessly to achieve consistency in code style and quality in JavaScript projects. In this article, I explain how to setup Eslint and Prettier in a React application.

## Prerequisites

- A code editor/IDE(preferably VSCode)
- Node.js installed
- Prettier and Eslint plugins for your code editor installed(I'll explain how to do this later incase you haven't done so)


## Create your React application

create a new React project with create-react-app.

```bash
npx create-react-app my-app && cd my-app && code .
```

The command above will create a new react application and open it in VSCode.


## Create configuration files for eslint and prettier

In your project's root directory, create a file and name it `.eslintrc.json`. This is the configuration file for eslint. This file contains what eslint would read for it to work properly with prettier and other plugins. Add the following content to the file after creating it.

```json
{
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": ["react-app", "plugin:prettier/recommended"],
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": ["react", "prettier", "@typescript-eslint"],
	"parser": "@typescript-eslint/parser",
	"rules": {}
}
```

Create another file and name it `.prettierrc.js`. This file contains prettier-specific rules that will be applied when your code is being formatted. Add the following to the file.

```js
module.exports = {
	semi: true,
	trailingComma: "all",
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	singleQuote: false,
	jsXSingleQuote: false,
}
```

**How it works:** If you fail to follow any of these rules while coding, Eslint will add some yellow or red squiggles to your code, indicating that something's not right. When you save the file, Prettier does the formatting and you'll notice that those squiggles are no longer there.

## Install dependencies

Now let's install all our dependencies. Since linting and formatting happen locally during development, all our dependencies will be dev-dependencies. We'll be installing Prettier, Eslint and some other packages specific to react. In your project directory, run the following command

```bash
# install dependencies

npm i -D eslint-plugin-react eslint prettier babel-eslint eslint-plugin-import eslint-config-prettier eslint-plugin-prettier typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-react-app eslint-plugin-flowtype eslint-plugin-jsx-a11y eslint-plugin-react-hooks
```

I know that's quite a lot but don't worry. We won't install any other dependency. 😉


With these dependencies installed, we're set to use Eslint and Prettier in our React app. Let's now setup our editor to correctly lint and format our code.

## Setup your code editor

I'll be using VSCode. If you are too, you'll need to have both eslint and prettier extensions installed. If you haven't done so, run the following to get them installed.


```bash
ext install dbaeumer.vscode-eslint && ext install esbenp.prettier-vscode
```

Now that you have both extensions installed, you'll have to edit your settings to enable the format-on-save option so that your code gets formatted immediately you save it. You'll also make Eslint the default code formatter for javascript and jsx files.

On the bottom left of VSCode, you'll see a settings icon. Click on it then click on settings. On the top right, you should see some icons like these.

![icons](/media/eslint-and-prettier-setup-for-react/settings-json.png)

Click on the first one and you should see a json file named `settings.json`. Add the following properties to the file.

```json
	"editor.formatOnSave": true,
	"[javascript]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
	"[javascriptreact]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
```

These rules will enable format-on-save option and make eslint your default formatter for JavaScript and jsx files.

If you can see yellow squiggles on any of the properties with a *Duplicate object key* warning, it means there's already a setting for that property. In that case, make sure the value matches the corresponding value in the json snippet above.

## Lint your code 

Your codebase is now ready for linting and formatting! While coding, if you don't follow any of the rules in your configuration files, you should see yellow or red squiggles. To format any file, just save it but if you want to format your whole codebase, add the following as a command in your package.json file.

```json
"scripts: {
	....
	"lint": "eslint --fix --ext .js,.jsx, ."
}
```

Whenever you run `npm run lint`, all files in your codebase with a `.js` or `.jsx` extension will be formatted. 

[Here](https://github.com/eronmmer/react-eslint-prettier) is a link to my GitHub repo with the project already setup.

## Conclusion

The need to maintain code style and quality comes in very handy especially when one is working with a group of developers on a codebase. Eslint and Prettier are two nice tools that can be used together to achieve this.
