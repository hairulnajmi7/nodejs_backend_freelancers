var Model = require("../models")

const freelancers = {

    //to get all data freelancers
    getAllFreelancer: async(request, response) => {
        let freelancers = [];
        try {
            freelancers = await Model.Freelancers.findAll();
        } catch (error) {
            console.log(error);
        }
        response.json(freelancers);
    },

   //Create a freelancer
   createFreelancer: async(request, response) => {
    let freelancers = [];
    try {
        freelancers = await Model.Freelancers.create({
            name: request.body.name,
            profession: request.body.profession,
            hourlyRate: request.body.hourlyRate,
            experience: request.body.experience,
            completedProject: request.body.completedProject,
            country: request.body.country
        });
    } catch (error) {
        console.log(error);
    }
    response.json(freelancers);
},

  //To get a freelancer
  getFreelancer: async(request, response) => {
    let freelancers = [];
    try {
        Freelancers = await Model.Freelancers.findOne({
            where: {
                id: request.params.id
            }
        });
    } catch (error) {
        console.log(error);
    }
    response.json(freelancers);
},

    //To delete data of freelancer
    deleteFreelancer: async(req, res) => {
        console.log(req.params.id)

        await Model.Freelancers.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(204).json({
            status: "Success"
        })
    },
}

module.exports = freelancers