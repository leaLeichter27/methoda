const express = require('express');
const Transition = require('../models/transition');
const Status = require('../models/Status');

const router = express.Router();

router.post('/addTransition', async (req, res) => {
    try {
      console.log(req.body);
      const { name, fromStatus, toStatus } = req.body;
      const transition = new Transition({ name, fromStatus, toStatus });
      await transition.save();
      res.status(201).send(transition);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
router.get('/getTransitions', async (req, res) => {
    try {
      const transitions = await Transition.find().populate('fromStatus toStatus');
      res.send(transitions);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
router.delete('/transitions/:id', async (req, res) => {
    try {
      const transition = await Transition.findByIdAndDelete(req.params.id);
      res.send(transition);
      res.send(`Document with ${transition.name} has been deleted.`);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
router.post('/reset', async (req, res) => {
    try {
        await Status.deleteMany({});
        await Transition.deleteMany({});
        res.send({ message: 'Configuration reset' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});
  
module.exports = router;