var Model = require("../models")

const hires = {

    //to get all data hired freelancer
    getAllHires: async(request, response) => {
        let hires = [];
        try {
            hires = await Model.Hires.findAll();
        } catch (error) {
            console.log(error);
        }
        response.json(hires);
    },

   //Create a hired freelancer
   createHires: async(request, response) => {
    let hires = [];
    try {
        hires = await Model.Hires.create({
            userid: request.body.userid,
            freelancerid: request.body.freelancerid,
            date: request.body.date
        });
    } catch (error) {
        console.log(error);
    }

    response.json(hires);
},

  //To get a hired freelancer
  getHires: async(request, response) => {
    let hires = [];
    try {
        hires = await Model.Hires.findOne({
            where: {
                id: request.params.id
            }
        });
    } catch (error) {
        console.log(error);
    }
    response.json(hires);
},

    //To delete data of hired freelancer
    deleteHires: async(req, res) => {
        console.log(req.params.id)

        await Model.Hires.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(204).json({
            status: "Success"
        })
    },
}

module.exports = hires