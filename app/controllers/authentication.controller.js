const db = require('../models');
const User = db.users;



exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        username: req.body.username,
        password: req.body.password
    };

    const condition = user.username;

    const exsits = User.findAll({
        where: { username: condition }
    })

    User.create(user)
        .then(data => {
            if (data != exsits) {
                console
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            })
        })

}