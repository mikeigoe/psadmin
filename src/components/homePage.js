"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

// Define our React component

var Home = React.createClass({
  // Every React component requires a render function, this is where we put our JSX

  render: function(){
    return (
      <div className="jumbotron">
        <h1>Pluralsight Administration</h1>
        <p>React, React Router and Flux for ultra-responsive web apps</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
});

// Export (CommonJS)

module.exports = Home;