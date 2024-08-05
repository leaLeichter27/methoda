const express = require('express');

const Transition = require('../models/transition');
const Status = require('../models/Status');

const router = express.Router();

router.post('/addStatus', async (req, res) => {
    try {
      const { name, isInitial } = req.body;
      if (isInitial) {
        await Status.updateMany({}, { isInitial: false });
      }
      const status = new Status({ name, isInitial });
      await status.save();
      res.status(201).send(status);
    } catch (err) {
      res.status(400).send(err.message);
    }
});
  
router.get('/getStatuses', async (req, res) => {
    try {
        const statuses = await Status.find();
        res.send(statuses);
    } catch (err) {
        res.status(400).send(err.message);
    }
});
  
router.delete('/statuses/:id', async (req, res) => {
    try {
      const status = await Status.findByIdAndDelete(req.params.id);
      await Transition.deleteMany({
        $or: [{ fromStatus: status._id }, { toStatus: status._id }]
      });
      res.send(status);
    } catch (err) {
      res.status(400).send(err.message);
    }
});
  
module.exports = router;
