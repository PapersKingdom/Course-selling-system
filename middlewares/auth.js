module.exports = (req, res, next) => {
    const { password } = req.body;
    if (password === 'sithija') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};