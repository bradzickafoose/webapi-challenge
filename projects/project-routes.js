const router = require('express').Router();

const Projects = require('../data/helpers/projectModel');

// GET – READ all Projects
router.get('/', (req, res) => {

    Projects
        .get()
        .then(projects => {
            res
                .status(200)
                .json({ projects });
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error retrieving projects" });
        });
});

// GET – READ project by id
router.get('/:id', validateProjectId, (req, res) => {
    res
        .status(200)
        .json(req.project);
});

// GET – READ all actions for a project
router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects
        .getProjectActions(req.project.id)
        .then(actions => {
            res
                .status(200)
                .json(actions);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error retrieving list of actions" });
        });
});

// POST – CREATE new project
router.post('/', (req, res) => {
    const projectInfo = req.body;

    Projects
        .insert(projectInfo)
        .then(project => {
            res
                .status(201)
                .json({ project });
        });
});

// PUT – UPDATE project
router.put('/:id', validateProjectId, (req, res) => {
    const updatedProject = req.body;

    Projects
        .update(req.project.id, updatedProject)
        .then(project => {
            res
                .status(201)
                .json(project);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error updating project" });
        });
});

// DELETE – Remove project by id
router.delete('/:id', validateProjectId, (req, res) => {
    Projects
        .remove(req.project.id)
        .then(project => {
            res
                .status(200)
                .json(project);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error deleting project" });
        });
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