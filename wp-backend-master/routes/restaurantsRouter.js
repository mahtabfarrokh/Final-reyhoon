const express = require("express");
const restaurant = require("../models/restaurant.js");
var func = require('./functions');

const restaurantsRouter = express.Router();
restaurantsRouter.get('/', async function (req, res) {
    categoryList = []
    if(req.query.category){
        if(typeof req.query.category === "string"){
            categoryList = [req.query.category]
        }
        else{
            categoryList = req.query.category
        }   
    }
    let response = await func.get_restaurants(req.query.area, categoryList)
    res.send(response)
    });
restaurantsRouter.get('/:id', async function (req, res) {
    let response = await func.restaurants_info(req.params.id)
    res.send(response)
    });
restaurantsRouter.get('/:id/comments', async function (req, res) {
    let response = await func.restaurants_comments(req.params.id)
    res.send(response)
    });
restaurantsRouter.post('/:id/comments', async function (req, res) {
    let response = await func.save_comment(req.params.id, req.body.author, req.body.quality, req.body.text)
    res.send(response)
  });
restaurantsRouter.post('/:id/restaurants', async function (req, res) {
    let response = await func.save_restaurant(req.params.id, req.body.farsi, req.body.logo, req.body.openingTime, req.body.closingTime, 
                        req.body.address, req.body.categories, req.body.foods, req.body.comments)
    res.send(response)
});
restaurantsRouter.get('/area/:area', async function (req, res) {
    let response = await func.find_area(req.params.area)
    res.send(response)
  });
  module.exports = restaurantsRouter;
