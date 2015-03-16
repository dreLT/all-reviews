# All Reviews

All Reviews is a web app for finding movie reviews. Users can search by movie title, view a list of reviews for that movie, and go to the URL of the actual review. Currently the app compiles review data from three APIs: *The New York Times*, *Rotten Tomatoes*, and *USAToday*.

The live app can be viewed here: [https://ll-reviews.herokuapp.com/](https://ll-reviews.herokuapp.com/)

*Note:* This app is still in the works! See 'Progress' section below.

## Installation

### Prerequisites
* Node.js - Download and install [Node.js](https://nodejs.org/download/)

### Required Tools
* NPM - Node.js package manager. This should auto-install with your install of Node.js
* Grunt - Download and install Grunt:
```
$ npm install -g grunt-cli
```

### Running the App
* Clone this repository
```
$ git clone https://github.com/dreLT/all-reviews.git
```
* In the project's root directory, install all dependencies:
```
$ npm install
```
* Run `grunt` in the root directory to intiate the local server and Grunt tasks. Then go to `http://localhost:3000` in your browser to see the running app.

## File System
### Development
```
app/
 |__pages/
 |   |__index.html
 |__sass/
 |   |__styles.scss
 |__scripts/
 |   |__app.js
 |__templates/
 |   |__home.html
```

`pages/__index.html` The HTML view - contains AngularJS directives  
`sass/__styles.scss` SASS file for styling. Grunt will automatically detect saved changes to this file and auto-compile them to poduction css (located in `/dist/css`).  
`scripts/__app.js` File containing all AngularJS functionality  
`templates/__home.html` For HTML partials or smaller sets of HTML (currently not being used)  

### Production
Grunt builds and outputs all saved changes made in the development directory, `app/`, to production directory, `dist/`, like so:
```
dist/
 |__css/
 |   |__style.css
 |__js/
 |   |__app.js
 |__templates/
 |   |__home.html
 |__index.html
```

## Progress

### Issues
* There is an issue connecting to Rotten Tomatoes API; Rotten Tomatoes API review data is not displaying in the view
* App needs styling for a nicer look and better user experience

### Wish LIst
* Loading animations for loading times when APIs are called
* In addition to links to movie data, The Rotten Tomatoes API also provides basic info for all of the movies in it's database, including movie posters (as image files). It would be great to integrate this info, perhaps as in the header area or a third column, showing the movie poster and some basic facts (date, production company, director, main actors, etc) once a movie title is clicked.