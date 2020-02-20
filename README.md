Run server on dev (localhost:8080): 
npm run dev-server

Build for production and start server (localhost:3000):
npm run build:prod
npm start

Test:
npm test -- --watch
npm test -- -u  // Update the snapshot and run test

Heroku:
In package.json - script
"start": "node server/server.js",           // Tell heroku where to start
"heroku-postbuild": "npm run build:prod"    // Tell heroku to build file in production

Push to Heroku in command line:
git push heroku master
username: <anyString>
password: <API KEY from my heroku account>



