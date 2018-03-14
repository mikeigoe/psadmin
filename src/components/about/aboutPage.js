"use strict";

var React = require('react');

var About = React.createClass({
  statics: {
    // Rule to check if user can navigate to a page (may not be logged in, havev permission etc)
    willTransitionTo: function(transition, params, query, callback) {
      if (!confirm('Are you sure you want to read a page that\'s this boring?')) {
        // cancel the transition
        transition.about();
      } else {
        // allow the callback
        callback();    
      }
    },
      // Rule to check if a user is sure they want to navigate away from a page (unsaved data, etc)
     willTransitionFrom: function(transition, component) {
      if (!confirm('Are you sure you want to leave a page that\'s this exciting?')) {
        // cancel the transition
        transition.about();
      }
    }
  },
  render: function(){
    return (
      <div>
        <hi>About</hi>
        <p>
            This application uses the following technologies:
            <ul>
              <li>React</li>
              <li>React Router</li>
              <li>Flux</li>
              <li>Node</li>
              <li>Gulp</li>
              <li>Browserify</li>
              <li>Bootstrap</li>
            </ul>
        </p>
      </div>
    );
  }
});

module.exports = About;