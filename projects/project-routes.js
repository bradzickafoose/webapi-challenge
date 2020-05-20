const router = require('express').Router();

const Projects = require('../data/helpers/projectModel');

// GET – READ all Projects
router.get('/', (req, res) => {

  Projects
    .get()
    .then(projects => res.status(200).json({ projects }))
    .catch(error => res.status(500).json({
      message: "Error retrieving projects",
      error: error.message
    }));
});

// GET – READ project by id
router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// GET – READ all actions for a project
router.get('/:id/actions', validateProjectId, (req, res) => {
  Projects
    .getProjectActions(req.project.id)
    .then(actions => res.status(200).json(actions))
    .catch(error => res.status(500).json({
      message: "Error retrieving list of actions",
      error: error.message
    }));
});

// POST – CREATE new project
router.post('/', (req, res) => {
  const projectInfo = req.body;

  Projects
    .insert(projectInfo)
    .then(project => res.status(201).json({ project }))
    .catch(error => res.status(500).json({
      message: "Error creating a new project",
      error: error.message
    }))
});

// PUT – UPDATE project
router.put('/:id', validateProjectId, (req, res) => {
  const updatedProject = req.body;

  Projects
    .update(req.project.id, updatedProject)
    .then(project => res.status(201).json(project))
    .catch(error => res.status(500).json({
      message: "Error updating project",
      error: error.message
    }));
});

// DELETE – Remove project by id
router.delete('/:id', validateProjectId, (req, res) => {
  Projects
    .remove(req.project.id)
    .then(() => {
      res
        .status(200)
        .json({ message: "Project deleted successfully" })
      })
    .catch(error => {
      res
        .status(500)
        .json({
          message: "Error deleting project",
          error: error.message
        });
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
          res.status(400).json({
            message: "Invalid project id"
          });
      }
    })
    .catch(error => res.status(500).json({
      message: "Error retrieving project",
      error: error.message
    }));
}

module.exports = router;