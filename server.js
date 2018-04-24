const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const campaign = require('./utils/campaign');

const keys = require('./config/keys');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());

app.get('/', (req, res) => {
    axios({method: 'get',
    url: 'https://api.getresponse.com/v3/campaigns',
    headers: {'X-Auth-Token': keys.getResponseToken}
    }).then(response => {
        console.log('dupa');
        res.send(response.data);
    }).catch(err => {
        console.log(err);
    })
});

app.post('/contact', (req, res) => {
    const botData = req.body;

    const userEmail = botData.result.parameters.email[0];
    const userPsid = botData.originalRequest.data.sender.id;
    console.log(`req.body: ${JSON.stringify(req)}`);

    axios.get(`https://graph.facebook.com/v2.6/${userPsid}?fields=first_name,last_name,profile_pic,locale&access_token=${keys.fbPageAccessToken}`)
    .then(response => {
        
        const userProfile = {
                            userFullName: `${response.data.first_name} ${response.data.last_name},`,
                            userLocale: `${campaign.chooseCampaign(response.data.locale)}`
        }
        return axios({
                method: 'post',
                url: 'https://api.getresponse.com/v3/contacts',
                headers: {'X-Auth-Token': keys.getResponseToken},
                data: {
                    name: userProfile.userFullName,
                    email: userEmail,
                    campaign: {
                        campaignId: userProfile.userLocale
                    }
                }
            })   

    }).then(responseTwo => {
        console.log(`response from GetRes: ${JSON.stringify(responseTwo)}`);
    }).catch(err => {
        console.log(err);
    });
});

app.listen(PORT, () => {
    console.log('Up and running');
});


