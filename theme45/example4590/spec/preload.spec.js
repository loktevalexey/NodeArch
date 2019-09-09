require('ignore-styles');
require('@babel/register')({ 
  ignore: [/(node_modules)/], 
  presets: [
    ['@babel/preset-env',
      { 
        "targets": { 
          "node": "10.12",
        } 
      }    
    ]
  ] 
});

require('./tests.js');
