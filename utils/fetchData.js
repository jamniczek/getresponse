const axios = require('axios');
const campaign = require('./campaign');
const keys = require('../config/keys');


const getUserProfile = (botRequestArg) => {
    const botData = botRequestArg.body;

    const userEmail = botData.result.parameters.email[0];
    const userPsid = botData.originalRequest.data.sender.id;
    // console.log(`req.body: ${JSON.stringify(req.body)}`);

    return axios.get(`https://graph.facebook.com/v2.6/${userPsid}?fields=first_name,last_name,profile_pic,locale&access_token=${keys.fbPageAccessToken}`)
    .then(response => {
        
        const userProfile = {
                            userFullName: `${response.data.first_name} ${response.data.last_name}`,
                            userLocale: `${campaign.chooseCampaign(response.data.locale)}`,
                            userEmail: userEmail
        }
        console.log(userProfile);
        return userProfile;
    });
};

const saveUserToCampaign = (userProfileArg) => {
    return axios({
        method: 'post',
        url: 'https://api.getresponse.com/v3/contacts',
        headers: {'X-Auth-Token': keys.getResponseToken},
        data: {
            name: userProfileArg.userFullName,
            email: userProfileArg.userEmail,
            campaign: {
                campaignId: userProfileArg.userLocale
            }
        }
    }).then(response => {
        const responseMessage = `All good. You'll get the newsletter soon!`;
        console.log(responseMessage)
        return responseMessage;
    }).catch(err => {
        const errResponse = `Something went wrong`;
        console.log(errResponse)
        return errResponse;
    });
};

sendResponseToUser = async (reqArg, resArg) => {
    const userProfile = await getUserProfile(reqArg);
    const responseForUser = await saveUserToCampaign(userProfile);
    console.log(responseForUser)
    resArg.send(JSON.stringify({"speech": responseForUser, "displayText": responseForUser}));
}

module.exports = {
    sendResponseToUser,
    saveUserToCampaign,
    getUserProfile,
}