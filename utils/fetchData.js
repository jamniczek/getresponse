const axios = require('axios');
const campaign = require('./campaign');
const keys = require('../config/keys');

const getUserProfile = async (botRequestArg) => {
    try {  
        const botData = botRequestArg.body;

        const userEmail = botData.result.parameters.email[0];
        const userPsid = botData.originalRequest.data.sender.id;
        const response = await axios.get(`https://graph.facebook.com/v2.6/${userPsid}?fields=first_name,last_name,profile_pic,locale&access_token=${keys.fbPageAccessToken}`);
      
        const userProfile = {
          userFullName: `${response.data.first_name} ${response.data.last_name}`,
          userLocale: `${campaign.chooseCampaign(response.data.locale)}`,
          userEmail,
        };
        console.log('userProfile', userProfile);
        return userProfile;
    } catch(err) {
        console.log(`getUserProfile err: ${err}`);
        throw new Error(`getUserProfile err: ${err}`);
        
    };
};

const saveUserToCampaign = async (userProfileArg) => {
    try {
        let responseMessage = 'All good. You\'ll get the newsletter soon!';
        const response = await axios({
            method: 'post',
            url: 'https://api.getresponse.com/v3/contacts',
            headers: { 'X-Auth-Token': keys.getResponseToken },
            data: {
              name: userProfileArg.userFullName,
              email: userProfileArg.userEmail,
              campaign: {
                campaignId: userProfileArg.userLocale,
              },
            },
          })
          return responseMessage;
    }
    catch(err) {
        responseMessage = `Unable to add user`
        console.log(`saveUser: ${err}`);
        return responseMessage;
    };
};

const sendResponseToUser = async (reqArg, resArg) => {
  const userProfile = await getUserProfile(reqArg);
  const responseForUser = await saveUserToCampaign(userProfile);
  console.log('1', responseForUser);
  resArg.send(JSON.stringify({ speech: responseForUser, displayText: responseForUser }));
};

module.exports = {
  sendResponseToUser,
  saveUserToCampaign,
  getUserProfile,
};
