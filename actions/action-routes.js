const router = require('express').Router();

const Actions = require('../data/helpers/actionModel');

// GET – READ all actions
router.get('/', (req, res) => {

  Actions
    .get()
    .then(actions => res.status(200).json({ actions }))
    .catch(error => res.status(500).json({
        message: "Error retrieving actions",
        error: error.message
    }));
});

// GET – READ action by id
router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

// POST – CREATE action
router.post('/', validateAction, (req, res) => {
  const actionInfo = req.body;

  Actions
    .insert(actionInfo)
    .then(action => res.status(201).json(action))
    .catch(error => res.status(500).json({
      message: "Error creating action",
      error: error.message
    }));
});

// PUT – UPDATE action
router.put('/:id', validateActionId, validateAction, (req, res) => {
  const updatedAction = req.body;

  Actions
    .update(req.action.id, updatedAction)
    .then(action => res.status(201).json(action))
    .catch(error => res.status(500).json({
      message: "Error updating action",
      error: error.message
    }));
});

// DELETE – Remove action by id
router.delete('/:id', validateActionId, (req, res) => {
  Actions
    .remove(req.action.id)
    .then(() => res.status(200).json({
      message: "Action deleted successfully"
    }))
    .catch(error => res.status(500).json({
      message: "Error deleting action",
      error: error.message
    }));
});

// Custom middleware
function validateActionId(req, res, next) {
  const actionId = req.params.id;

  Actions
    .get(actionId)
    .then(action => {
      if (action) {
          req.action = action;
          next();
      } else {
        res.status(400).json({
          message: "Invalid action id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving action",
        error: error.message
      })
    });
}

function validateAction(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
        .status(400)
        .json({ message: "missing action data" });
  } else if (!req.body.description) {
      res
        .status(400)
        .json({ message: "missing required description field" });
  } else if (!req.body.notes) {
      res
        .status(400)
        .json({ message: "missing required note field" });
  } else if (!req.body.project_id) {
      res
        .status(400)
        .json({ message: "missing required project_id field" });
  } else {
      next();
  }
}

module.exports = router;