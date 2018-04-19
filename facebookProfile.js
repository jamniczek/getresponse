const axios = require('axios');
const keys = require('./config/keys')

function getUserProfile(psidArg){

    axios.get(`https://graph.facebook.com/v2.6/${psidArg}?fields=first_name,last_name,profile_pic&access_token=${keys.fbPageAccessToken}`)
    .then(response => {
        const userProfile = {userFullName: `${response.data.first_name} ${response.data.last_name}` }

        console.log('this comes from facebookProfile function: ' + response.data.first_name);

        return userProfile
    }).catch(err => {
        console.log(err);
    });
};


async function dupsko(psidArg){

    let getUserProfileResponse = await axios.get(`https://graph.facebook.com/v2.6/${psidArg}?fields=first_name,last_name,profile_pic&access_token=${keys.fbPageAccessToken}`);
        const userProfile = {userFullName: `${getUserProfileResponse.data.first_name} ${getUserProfileResponse.data.last_name}`}
        console.log('this comes from facebookProfile function: ' + getUserProfileResponse.data.first_name);

    let res2 = await axios({
                method: 'post',
                url: 'https://api.getresponse.com/v3/contacts',
                headers: {'X-Auth-Token': keys.getResponseToken},
                data: {
                    name: userFullName,
                    email: 'januszpawlacz',
                    campaign: {
                        campaignId: keys.campaignId
                    },
                }
            })
        



}



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