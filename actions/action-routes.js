const router = require('express').Router();

const Actions = require('../data/helpers/actionModel');

// GET – READ all actions
router.get('/', (req, res) => {

    Actions
        .get()
        .then(actions => {
            res
                .status(200)
                .json({ actions });
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error retrieving actions" });
        });
});

// GET – READ action by id
router.get('/:id', validateActionId, (req, res) => {
    res
        .status(200)
        .json(req.action);
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
                res
                    .status(400)
                    .json({ message: "Invalid action id" });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error retrieving action" })
        });
}

module.exports = router;