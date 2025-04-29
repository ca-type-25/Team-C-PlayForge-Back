module.exports = function(...allowedRoles) {
    return (req, res, next) => {
        
      const normalizedAllowedRoles = allowedRoles.map(role => role.toUpperCase());
      const userRole = req.user?.role?.toUpperCase();
  
      if (!req.user || !normalizedAllowedRoles.includes(userRole)) {
        return res.status(403).send({ message: 'Access denied' });
      }
  
      next();
    };
  };
  