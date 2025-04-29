
module.exports = function canEditUser(req, res, next) {
   


    if (req.user.id === req.params.id) {
        return next();
    }
   
    return res.status(403).json({ message: 'Unauthorized to edit' });
};
