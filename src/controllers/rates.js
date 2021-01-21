var Model = require("../models")

const rates = {

    //to get all data hired freelancer
    getAllRates: async(request, response) => {
        let rates = [];
        try {
            rates = await Model.Rates.findAll();
        } catch (error) {
            console.log(error);
        }
        response.json(rates);
    },

   //Create a hired freelancer
   createRates: async(request, response) => {
    let rates = [];
    try {
        rates = await Model.Rates.create({
            userid: request.body.userid,
            freelancerid: request.body.freelancerid,
            rating: request.body.rating,
            date: request.body.date
        });
    } catch (error) {
        console.log(error);
    }

    response.json(rates);
},

  //To get a hired freelancer
  getRates: async(request, response) => {
    let rates = [];
    try {
        rates = await Model.Rates.findOne({
            where: {
                id: request.params.id
            }
        });
    } catch (error) {
        console.log(error);
    }
    response.json(rates);
},

    //To delete data of hired freelancer
    deleteRates: async(req, res) => {
        console.log(req.params.id)

        await Model.Rates.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(204).json({
            status: "Success"
        })
    },
}

module.exports = rates