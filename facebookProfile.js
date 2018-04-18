// const express = require('express');

// const app = express();

// let userPsid = '1607100379375637';


const axios = require('axios');
function getUserProfile(psidArg){

    axios.get(`https://graph.facebook.com/v2.6/${psidArg}?fields=first_name,last_name,profile_pic&access_token=EAAbyWVtNSRoBAMh8ZAkTp54RquZAtfiKNPQGmTFS4Tk6P0ZBuwEXfrmo7q5I9i8H2u7alZAZC79m1LJHQY2ZCqaymwG4565NjMrKFsZB7KMosFVUcGlxh5UIafgrsvkzRsZCraeArYtSFundX7TMSpFHkIsUPDjriCM4L7dL65cy7sZB9K4GNCkor`)
.then(response => {
    console.log('this comes from facebookProfile function: ' + response.data.first_name);
}).catch(err => {
    console.log(err);
});
}
// app.listen(5000, () => {
//     console.log('FB stuff up and running');
// })
module.exports = {
    getUserProfile,
}