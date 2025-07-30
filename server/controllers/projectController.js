const Project = require('../models/project');

// Edit project: only owner can edit
exports.editProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });

    // Ownership check
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete project: only owner
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await project.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};