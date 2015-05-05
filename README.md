# All Reviews

All Reviews is a web app for finding movie reviews. Users can search by movie title and view a list of reviews for that movie along with URLs of the actual reviews. Currently the app compiles review data from three APIs: *The New York Times*, *Rotten Tomatoes*, and *USAToday*.

The live app can be viewed here: [https://all-reviews.herokuapp.com/](https://all-reviews.herokuapp.com/)  
Enter a movie title in the input area and push enter. After a second or search results will appear; click a title to see a list of reviews on the right.

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
 server.js
```

`pages/__index.html` The HTML view - contains AngularJS directives  
`sass/__styles.scss` SASS file for styling. Grunt will automatically detect saved changes to this file and auto-compile them to poduction css (located in `/dist/css`).  
`scripts/__app.js` File containing all AngularJS functionality  
`templates/__home.html` For HTML partials or smaller sets of HTML (currently not being used) 

`server.js` Contains calls to movie review APIs and handling of JSON data (Node.js)

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

### To Do
* There is an issue connecting to Rotten Tomatoes API; Rotten Tomatoes API review data is not displaying in the view
* App needs styling for a nicer look and better user experience

### Wish List
* Loading animations for loading times when APIs are called
* In addition to links to movie reviews, the Rotten Tomatoes API provides additional info for all of the movies in it's database, including movie posters. It would be great to also get this data and display the queried movie's poster and some basic facts (date, production company, director, main actors, etc).