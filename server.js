const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());

app.get('/', (req, res) => {
    axios({method: 'get',
    url: 'https://api.getresponse.com/v3/campaigns',
    headers: {'X-Auth-Token': keys.getResponseToken}
    }).then(response => {
        console.log(response);
        res.send(response.data);
    }).catch(err => {
        console.log(err);
    })
});

app.post('/contact', (req, res) => {
    const botData = req.body;

    const userName = botData.result.parameters.userName[0];
    const userEmail = botData.result.parameters.email[0];
    console.log(`botData: ${botData}
                userName: ${userName}
                userEmail: ${userEmail}`);

    axios({
        method: 'post',
        url: 'https://api.getresponse.com/v3/contacts',
        headers: {'X-Auth-Token': keys.getResponseToken},
        data: {
            name: userName,
            email: userEmail,
            campaign: {
                campaignId: keys.campaignId
            },
        }
    }).then(response => {
        res.send('all good ' + response);
    }).catch(err => {
        res.send('no idea what happened ' + err);
    })
    
})

app.post('/test', (req, res) => {
    console.log(req.body);
});

app.post('/df', (req, res) => {
    const userName = result.parameters.userName[0];
    const userEmail = result.parameters.email[0];

    res.send(userName + ' dupa ' + userEmail);
});

app.listen(PORT, () => {
    console.log('Up and running');
});


