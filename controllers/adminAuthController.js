const AdminRegister = require('../models/AdminRegisterModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    let {username, password} = req.body;
    AdminRegister.findOne({$or: [{username:username}, {email:username}]})
    .then(admin => {
            bcrypt.compare(password, admin.password, (err, result) => {
                if (err) {
                    res.json(
                        {error: err}
                    )
                }
                if (result) {
                    let accessToken = jwt.sign(
                        {username: admin.username},
                        process.env.accessToken,
                        {expiresIn: '7d'}
                    );
                    res.json(
                        {
                            message: 'Login Successful',
                            accessToken: accessToken
                        }
                    )
                    admin.accessToken = accessToken;
                    console.log(admin);
                    admin.save()
                } else {
                    res.status(422).json(
                        {
                            err: 'Password does not match!'
                        }
                    )
                }
            })
        }
    )
    .catch (err => res.json(
        {message: 'No user matched the provided details!'}
    ))
}

module.exports = {
    login
}