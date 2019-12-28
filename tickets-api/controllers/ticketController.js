// Define all of your ticket controller methods in this file that
// will be used as callbacks to your endpoints
var Ticket = require('../models/ticket');
"use strict";
async function getTicketList(req, res){  
        Ticket.find({})
          .then(tickets => {
            res.json(tickets);
          })
          .catch(err => {
            res.status(500).send("getTicketList() failed");
          });
      }

 async function createTicket (req, res){ 
        Ticket.create(new Ticket(req.body))
          .then((ticket) => {
            console.log("a ticket is added");
            res.status(201).json(ticket)
          })
          .catch(err => {
            res.status(500).send("createTicket() failed");
          });  

      }


async function updateTicket(req, res){
        Ticket.findByIdAndUpdate(req.params.id,
          { $set: req.body }, { new: true },)
          .then(ticket => {
            console.log(ticket);
            res.status(204).send('');
          })
          .catch(err => {
            res.status(500).send("updateTicket() failed");
          });
      }

async function getTicket(req, res){
        Ticket.findById(req.params.id,(idnotfound, ticket) => {
          // with middleware
          if(idnotfound){
            res.status(500).send("getTicket() failed");
          }
          else{
            console.log(ticket);
            res.json(ticket);
          }
        })
         
      }

async function deleteTicket(req, res) {
    Ticket.findById(req.params.id, (idnotfound, ticket) => {
        // with middleware
        if(idnotfound){
          res.status(500).send("deleteTicket() failed");
          res.redirect('/tickets');
        }
        else{
          ticket.remove(err => {
            if (err) {
              res.status(500).send("deleteTicket() failed");
              res.redirect('/tickets');
            }
            else {
              res.status(204).send('');
            }
          })
        }
        
      })
}

module.exports = {getTicketList,createTicket,updateTicket,getTicket,deleteTicket}