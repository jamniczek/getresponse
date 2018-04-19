const axios = require('axios');
const keys = require('./config/keys')

function getUserProfile(psidArg) {

    axios.get(`https://graph.facebook.com/v2.6/${psidArg}?fields=first_name,last_name,profile_pic&access_token=${keys.fbPageAccessToken}`)
    .then(response => {
        const userProfile = {userFullName: `${response.data.first_name} ${response.data.last_name}` }

        console.log('this comes from facebookProfile function: ' + response.data.first_name);

        return getResponseSaveUser(userProfile.userFullName, userEmail)   
    }).catch(err => {
        console.log(err);
    });
};

function getResponseSaveUser(userNameArg, userEmailArg) {
    axios({
        method: 'post',
        url: 'https://api.getresponse.com/v3/contacts',
        headers: {'X-Auth-Token': keys.getResponseToken},
        data: {
            name: userNameArg,
            email: userEmailArg,
            campaign: {
                campaignId: keys.campaignId
            },
        }
    }).then(response => {
        res.send('all good ' + response);
    }).catch(err => {
        res.send('no idea what happened ' + err);
    })
};

module.exports = {
    getUserProfile,
    getResponseSaveUser,
}