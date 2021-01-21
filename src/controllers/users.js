var Model = require("../models")
var bcrypt = require("bcryptjs");

const users = {

    //to get all data users
    getAllUser: async(request, response) => {
        let users = [];
        try {
            users = await Model.Users.findAll();
        } catch (error) {
            console.log(error);
        }
        response.json(users);
    },

    //To get a user
    getUser: async(request, response) => {
        let users = [];
        try {
            users = await Model.Users.findOne({
                where: {
                    id: request.params.id
                }
            });
        } catch (error) {
            console.log(error);
        }
        response.json(users);
    },

    //Update a user
    updateUser: async(request, response) => {
        let users = [];
        try {
            users = await Model.Users.update({
                fullname: request.body.fullname,
                username: request.body.username,    //ambil data users
                password: bcrypt.hashSync(request.body.password),
                phone: request.body.phone,
                email: request.body.email,
                age: request.body.age
            }, {
                where: {
                    id: request.params.id
                }
            });
        } catch (logerror) {
            console.log(error);
        }
        response.json(users);
    },

    //Create a user
    createUser: async(request, response) => {
        let users = [];
        try {
            users = await Model.Users.create({
                fullname: request.body.fullname,
                username: request.body.username,
                password:bcrypt.hashSync( request.body.password,10),
                phone: request.body.phone,
                email: request.body.email,
                age: parseInt(request.body.age),
                role:request.body.role
            });
        } catch (error) {
            console.log(error);
        }
        response.json(users);
    },

    //Delete a user
    deleteUser: async(req, res) => {
        console.log(req.params.id)

        await Model.Users.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(204).json({
            status: "Success"
        })
    },
}

module.exports = users

  
 