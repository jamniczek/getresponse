const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fetchData = require('./utils/fetchData');

const keys = require('./config/keys');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());

app.get('/', (req, res) => {
  axios({
    method: 'get',
    url: 'https://api.getresponse.com/v3/campaigns',
    headers: { 'X-Auth-Token': keys.getResponseToken },
  }).then((response) => {
    console.log('dupa');
    res.send(response.data);
  }).catch((err) => {
    console.log(err);
  });
});

app.post('/contact', (req, res) => {
  fetchData.sendResponseToUser(req, res);
});

app.listen(PORT, () => {
  console.log('Up and running');
});

