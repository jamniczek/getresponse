const axios = require('axios');
const campaign = require('./campaign');
const keys = require('../config/keys');

const getUserProfile = async (botRequestArg) => {
    const botData = botRequestArg.body;

    const userEmail = botData.result.parameters.email[0];
    const userPsid = botData.originalRequest.data.sender.id;
    // console.log(`req.body: ${JSON.stringify(req.body)}`);
    const response = await axios.get(`https://graph.facebook.com/v2.6/${userPsid}?fields=first_name,last_name,profile_pic,locale&access_token=${keys.fbPageAccessToken}`);

        const userProfile = {
                            userFullName: `${response.data.first_name} ${response.data.last_name}`,
                            userLocale: `${campaign.chooseCampaign(response.data.locale)}`,
                            userEmail: userEmail
        }
        console.log('userProfile', userProfile);
        return userProfile;
    
};

const saveUserToCampaign = async (userProfileArg) => {
    const response  = await axios({
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
    }).catch(err => {
        console.log('chujowyerror')
    })

    let responseMessage;
    console.log(`status of the response: ${response.status}`)
    if(response.status === 202) {
        console.log(response.status)
        responseMessage = `All good. You'll get the newsletter soon!`
    } else if(response.status === 409) {
        console.log('409', response.status)
        responseMessage = `It seems you have already subscribed to the newsletter!`
    } else {
        throw new Error('terrible mistake')
        responseMessage = `Something went wrong`
    }
    return responseMessage;
}
    
    
//     .then(response => {
//         const responseMessage = `All good. You'll get the newsletter soon!`;
//         console.log(response.data)
//         return responseMessage;
//     }).catch(err => {
//         const errResponse = `Something went wrong`;
//         console.log(errResponse)
//         return errResponse;
//     });
// };

sendResponseToUser = async (reqArg, resArg) => {
    const userProfile = await getUserProfile(reqArg);
    const responseForUser = await saveUserToCampaign(userProfile);
    console.log('1', responseForUser)
    resArg.send(JSON.stringify({"speech": responseForUser, "displayText": responseForUser}));
}

module.exports = {
    sendResponseToUser,
    saveUserToCampaign,
    getUserProfile,
}