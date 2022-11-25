const Employee = require('../models/Employee');

// Show all registered employees
const index = (req, res, next) => {
    Employee.find()
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

// Show employee using the employeeID found in the req.body
const showEmployee = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findById(employeeID)
    .then(response => {
        if (!response) {
            return res.json({
                message: 'User not found'
            });
        } else {
            res.json({
                response: response[0]
            });
        }
    })
    .catch(err => {
        res.json({
            message: `${err}  message`
        });
    });
};

// Add an employee to database
const storeEmployee = (req, res, next) => {
    const {firstname, lastname, designation, email, phone, age} = req.body;
    let employee = new Employee({
        firstname: firstname,
        lastname: lastname,
        designation: designation,
        email: email,
        phone: phone,
        age: age,
    });

    // if (req.file) {
    //     employee.avatar = req.file.path;
    // }

    if (req.files) {
        let path = '';
        req.files.forEach(file => {
            path += `${file.path},`
        })
        path = path.substring(0, path.lastIndexOf(','))
        employee.avatar = path;
    }

    employee.save()
    .then(response => {
        res.json({
            response,
            filesize: req.file.size
        });
    })
    .catch(err => {
        res.json({
            message: err
        });
    });
};

// Update an employee by employeeID
const updateEmployee = (req, res, next) => {
    const {firstname, lastname, designation, email, phone, age, employeeID} = req.body;
    
    let updatedData = {
        firstname: firstname,
        lastname: lastname,
        designation: designation,
        email: email,
        phone: phone,
        age: age,
    };

    Employee.findByIdAndUpdate(employeeID, { $set: updatedData})
    .then(() => {
        res.json({
            message: `Employee ${employeeID} updated successfully!`
        });
    })
    .catch(err => {
        res.json({
            message: 'An error just occured!'
        });
    });
};

// Delete an employee by employeeID
const deleteEmployee = (req, res, next) => {
    const { employeeID } = req.body;
    Employee.findOneAndRemove(employeeID)
    .then(() => {
        res.json({
            message: `Employee ${employeeID} removed successfully!`
        });
    })
    .catch(err => {
        res.json({
            message: 'An error just occured!'
        });
    });
};

module.exports = {
    index,
    showEmployee,
    storeEmployee,
    storeEmployee,
    updateEmployee,
    deleteEmployee
}