"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

// Passing the optional History Location (Router.run(routes, Router.HistoryLocation, function(Handler) {) 
// param allows us to:
//    get rid of hashtags from URLs (cleaner)
//    is necessary for server rendering (isomorphic JavaScript)
//    but needs IE 10+
// Won't be using it in this course

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});