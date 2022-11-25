const AdminRegister = require('../models/AdminRegisterModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log('Request Body:', req.body);
    const {name, phone, email, username, password, confirmPassword, dept, loc} = req.body;
    // console.log('SPLITTED PASSWORD', password.split(' ').join('').length);
    console.log(name, phone, email, username, password, confirmPassword, dept, loc);

    AdminRegister.findOne({ username: username }, (err, userExists) => {
        if (err) {
            return res.status(422).send(err);
        }
        if (userExists) {
            console.log('User already exists.')
            return res.status(422).send({
                error: 'User already exists.'
            });
        } else {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    res.json({
                        error: err
                    })
                } else {
                    if (password !== '' || confirmPassword !== '') {
                        if (confirmPassword === password) {
                            const user = new AdminRegister({
                                name: name,
                                phone: phone,
                                email: email,
                                username: username,
                                password: hashedPassword,
                                dept: dept,
                                loc: loc,
                            });
                
                            user.save()
                            .then((user) => res.json( {
                                    message: `User account for ${user.name} has been created successfully!`
                                })
                            )
                            .catch(err => {
                                return {
                                    err,
                                    error: 'Oops, an error has occured!'
                                }
                            })
                        } else {
                            res.json(
                                {passwordMismatch: 'Passwords do not match!'}
                            )
                        }
                    } else {
                        res.json(
                            {passwordEmpty: 'Please, provide password!'}
                        )
                    }
                }
            });
        }
    });
}

module.exports = {
    register
}