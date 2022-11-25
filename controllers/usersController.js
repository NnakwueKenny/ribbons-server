const User = require('../models/User');

// Show all user's data
let accessToken = '';
const index = (req, res, next) => {
    const {accessToken} = req.body;
    console.log(accessToken);

    User.findOne({accessToken})
    .then(response => {
        res.json({
            response
        });
    })
    .catch(err => {
        res.json({
            message: 'An error just occured'
        });
    });
};

module.exports = {
    index,
    accessToken
}