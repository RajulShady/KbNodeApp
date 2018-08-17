module.exports = function permission(...allowed) {
  const isAllowed = (role) => {
    for (let i = 0; i < allowed.length; i += 1) {
      if (allowed[i].id === role) {
        return true;
      }
    }
    return false;
  };
  // return a middleware
  return (req, res, next) => {
    if (req.decoded && isAllowed(req.decoded.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' }); // user is forbidden
    }
  };
};
