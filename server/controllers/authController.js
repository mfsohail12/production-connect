const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Update profile: only allow user to update their own profile
exports.updateProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const userId = req.user.id;
    const updates = { name: req.body.name, email: req.body.email };

    // Avoid updating protected fields
    delete updates.role;
    delete updates.password;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login issues JWT with expiration
exports.login = async (req, res) => {
  // ... existing validation ...
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
};