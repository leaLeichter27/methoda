const express = require('express');

const Transition = require('../models/transition');
const Status = require('../models/Status');

const router = express.Router();

router.post('/addStatus', async (req, res) => {
    try {
      const { name, isInitial } = req.body;
    
      const existingStatus = await Status.findOne({ name });
      if (existingStatus) {
        return res.status(400).send('Status name must be unique.');
      }

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
        // const statuses = await Status.find();
        // res.send(statuses);

        const statusLabels = await determineStatusLabels();
        res.send(statusLabels);

    } catch (err) {
        res.status(400).send(err.message);
    }
});
  
router.delete('/deleteStatus/:id', async (req, res) => {
  console.log('deleteStatus', req.params.id);
    try {
      const status = await Status.findByIdAndDelete(req.params.id);
      await Transition.deleteMany({
        $or: [{ fromStatus: status._id }, { toStatus: status._id }]
      });
      console.log('deleteStatus', status  );
      res.send(status);
    } catch (err) {
      res.status(400).send(err.message);
    }
});

const markReachableStatuses = (initialStatusId, statusMap, transitions) => {
  const queue = [initialStatusId];
  console.log('queue in beginig', queue);
  const visited = new Set();

  while (queue.length > 0) {
    console.log('queue', queue);
    const currentStatusId = queue.shift();

    console.log('currentStatusId', currentStatusId);
    if (visited.has(currentStatusId)) continue;

    visited.add(currentStatusId);
    statusMap[currentStatusId].isOrphan = false;

    transitions.forEach(transition => {
      if (transition.fromStatus.equals(currentStatusId)) {
        queue.push(transition.toStatus.toString());
      }
    });
  }
};


const determineStatusLabels = async () => {
  const statuses = await Status.find();
  const transitions = await Transition.find();

 
  const statusLabels = statuses.map(status => ({
    id: status._id,
    name: status.name,
    isInitial: status.isInitial,
    isOrphan: true,
    isFinal: true
  }));

  const statusMap = {};
  statusLabels.forEach(status => {
    statusMap[status.id] = status;
  });


  const initialStatus = statuses.find(status => status.isInitial);
  if (initialStatus) {
    markReachableStatuses(initialStatus._id.toString(), statusMap, transitions);
  }


  const nonFinalStatusIds = new Set(transitions.map(transition => transition.fromStatus.toString()));
  console.log({nonFinalStatusIds})
  statusLabels.forEach(status => {
    if (nonFinalStatusIds.has(status.id.toString())) {
      status.isFinal = false;
    }
  });


  console.log({statusLabels})

  return statusLabels;
};

  
module.exports = router;
