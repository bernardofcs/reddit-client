const SUGGESTED_SUBREDDIT_COUNT = 100;

const express = require('express');
const bodyParser = require('body-parser')
const reqPros = require('request-promise')
const fetch = require('node-fetch');
const app = express();

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(allowCrossDomain)

app.set('port', (process.env.PORT || 3001));


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

// gets list of top subreddits


app.get('/', (req, res) => {
  fetch(`https://reddit.com/reddits.json?limit=${SUGGESTED_SUBREDDIT_COUNT}`).then((fetchRes) => {
    return fetchRes.json()
  }).then((json) => {
    const subNames = json.data.children.map((sub) => sub.data.display_name)
    res.json(subNames)
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

//gets more posts
app.get('/r/:subName/amount/:limit', (req, res) => {
  fetch(`https://reddit.com/r/${req.params.subName}/.json?limit=${req.params.limit}`).then((fetchRes) => {
    return fetchRes.json()
  }).then((json) => {
    res.json(json)
  })
})

//gets sub info
app.get('/r/:subName/about', (req, res) => {
  fetch(`https://reddit.com/r/${req.params.subName}/about.json`).then((fetchRes) => {
    return fetchRes.json()
  }).then((json) => {
    res.json(json)
  })
})

//gets comments
app.get('/r/:subName/comments/:postId', (req, res) => {
  fetch(`https://reddit.com/r/${req.params.subName}/comments/${req.params.postId}.json`).then((fetchRes) => {
    return fetchRes.json()
  }).then((json) => {
    res.json(json)
  })
})

