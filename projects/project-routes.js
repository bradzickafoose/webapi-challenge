const router = require('express').Router();

const Projects = require('../data/helpers/projectModel');

// GET all Projects – READ
router.get('/', (req, res) => {
    Projects
        .get()
        .then(projects => {
            res
                .status(200)
                .json({ projects });
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving projects" });
        });
});

// GET project by id
router.get('/:id', validateProjectId, (req, res) => {
    res
        .status(200)
        .json(req.project);
});

// Custom middleware
function validateProjectId(req, res, next) {
    const projectId = req.params.id;

    Projects
        .get(projectId)
        .then(project => {
            if (project) {
                req.project = project;
                next();
            } else {
                res
                    .status(400)
                    .json({ message: "Invalid project id" });
            }
        })
        .catch(err =>
            res
                .status(500)
                .json({ message: "Error retrieving project" })
        );
}

module.exports = router;