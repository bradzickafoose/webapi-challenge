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

module.exports = router;