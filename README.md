
# Cribl Take Home Prolem

## Requirements

For development, you will only need Node.js installed on your environment.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v20.11.0

    $ npm --version
    v10.2.4

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

# Backend

### Base URL: http://localhost:3000/api/filesystem

- Open terminal in the root folder 
- cd server
- then install dependencies as described below

### To install dependencies

```js
  npm install
```

### Command to start server

- to run server using nodemon

```js
  npm start
```

### Commands to stop server

- to stop server using nodemon

```js
CTRL + C;
```

#### You can see more commands for server in `package.json -> scripts`

# Frontend

- Open terminal in the root folder 
- cd frontend
- then install dependencies as described below

### To install dependencies

```js
  npm install
```

### View the app

- to view the app open the index.html with live server

## Languages & tools


### Vanilla javascript

- Vanilla javascript is used to write the script as was asked in the requirements


### CSS
- CSS is used to write nice and consistent styling for the front end

## Features

- Fetch the file system object from server
- Show the folder structure in the left pane (sidebar)
- Can click on icons next to folder name to expand of collapse the folder content
- Click on folder name to open the content of the folder in the right pane
- Or click the folder name in the right pane to view the content
  - it also expands the folder in the sidebar
- Multiple nested levels are supported
- Test cases added

## Future Improvements

- We can have some feature to view the the content of the files
- Ability to add new folders or files in the system
- Add more test cases to check the complete functionality of the system
