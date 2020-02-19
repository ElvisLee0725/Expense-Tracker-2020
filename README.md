Test:
npm test -- --watch
npm test -- -u  // Update the snapshot and run test

Heroku:
In package.json - script
"start": "node server/server.js",           // Tell heroku where to start
"heroku-postbuild": "npm run build:prod"    // Tell heroku to build file in production
