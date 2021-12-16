const express = require('express');
const router = express.Router();
const Personnel = require('../models/personnel');

module.exports = function () {

  /* Api */
  router.get('/read', async (req, res) => {
    try {
      let personnel_list = await Personnel.find({});
      res.send(personnel_list);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  /* Create a Soldier */
  router.post("/create", async (req, res) => {
    let personnel = new Personnel({
      personAvatar: req.body.personAvatar,
      personName: req.body.personName,
      personSex: req.body.personSex,
      personRank: req.body.personRank,
      personSuperior: req.body.personSuperior,
      personPhone: req.body.personPhone,
      personEmail: req.body.personEmail,
      personNoOfDS: req.body.personNoOfDS,
      personStartDate: req.body.personStartDate,
      subordinates: [
        { idSubordinate: req.body.personSuperior }]

    });
    try {
      let newPersonnel = await personnel.save();
      res.send({ response: 'success' });
    } catch (err) {
      res.send({ response: err });
    }
  });

  /* Get a listing by a soldier id */
  router.get('/readbyid/', async (req, res) => {
    try {
      console.log("req.query.id;" + req.query.id);
      let record = await Personnel.findOne({ _id: req.query.id });

      res.send(record);
    } catch (err) {
      return res.status(500).send(err);
    }
  });


  /* Get a listing by a soldier id */
  router.get('/readbysuperior/', async (req, res) => {
    try {
      let record = await Personnel.findOne({ personName: req.query.iDPersonSuperior });
      res.send(record);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  /* Update a Soldier */
  router.put('/update', async (req, res) => {
    try {
      let personnel = await Personnel.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
      res.send({ response: 'success' });
    } catch (err) {
      res.send({ response: err });
    }
  });

  /* Delete Soldier */
  router.delete('/delete', async (req, res) => {
    try {
      let personnel = await Personnel.findOneAndRemove({ _id: req.query.entryid });
      return res.send({ response: 'success' });
    } catch (err) {
      return res.send({ response: err });
    }
  });

  return router;

};