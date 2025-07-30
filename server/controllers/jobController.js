const Job = require('../models/job');

// Example: assign editor to job: only admin can assign editors
exports.assignEditor = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  // Safe update
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  job.editor = req.body.editorId;
  await job.save();
  res.json(job);
};

// Quit job: user must be assigned editor
exports.quitJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.editor.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not assigned editor' });
  }
  job.editor = null;
  await job.save();
  res.json({ message: 'Quit successful' });
};