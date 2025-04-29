const permissions = require('../config/permissions');

function checkPermission(action) {
  return (req, res, next) => {
    const userRole = req.user.role; 
    const allowedActions = permissions[userRole] || [];
    if (allowedActions.includes(action)) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  };
}

module.exports = checkPermission;
