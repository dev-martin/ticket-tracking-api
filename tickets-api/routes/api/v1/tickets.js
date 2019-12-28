// define all your endpoints for the ticket model in this file
"use strict"
var express = require('express');
var ticketRouter = express.Router();
var ticketController = require('../../../controllers/ticketController');

// SHOW route: GET /tickets/:id 
// Note that this route is given after NEW route
// Order matters! Try moving NEW route after SHOW route
ticketRouter.route('/:id').get((req,res) => ticketController.getTicket(req,res))
    //DELETE route: /tickets/:id
    .delete((req,res) => ticketController.deleteTicket(req,res))
    // UPDATE route: PUT /tickets/:id
    .put((req, res) => ticketController.updateTicket(req,res));

// INDEX route: GET /tickets
ticketRouter.route('/').get((req,res) => ticketController.getTicketList(req,res))  // note that no semicolon is used here

  // CREATE route: POST /tickets
  .post((req, res) => ticketController.createTicket(req, res));


module.exports = ticketRouter;




