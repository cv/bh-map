#!/usr/bin/env node
var ghpages = require('gh-pages');

ghpages.publish(__dirname, function(err) {
  if (err) {
    console.log('Publishing failed' + err);
  } else {
    console.log('Published to GitHub pages');
  }
});
