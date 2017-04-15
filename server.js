const express = require('express');
const bodyParser = require('body-parser')
const reqPros = require('request-promise')
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 3001));


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

// gets list of top subreddits


app.get('/', (req, res) => {
  fetch('https://reddit.com/reddits.json').then((fetchRes) => {
    return fetchRes.json()
  }).then((json) => {
    res.json(json)
  })
})

//gets posts
app.get('/r/:subName', (req, res) => {
  fetch(`https://reddit.com/r/${req.params.subName}.json`).then((fetchRes) => {
    return fetchRes.json()
  }).then((json) => {
    res.json(json)
  })
})

//gets comments
app.get('/r/:subName/comments/:postId/:postName', (req, res) => {
  fetch(`https://reddit.com/r/${req.params.subName}/comments/${req.params.postId}/${req.params.postName}.json`).then((fetchRes) => {
    return fetchRes.json()
  }).then((json) => {
    res.json(json)
  })
})


// getReddit();

