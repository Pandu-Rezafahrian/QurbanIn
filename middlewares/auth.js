const isLoggedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login');
};

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') return next();
    res.status(403).send('Akses ditolak. Hanya admin yang diizinkan.');
};

module.exports = { isLoggedIn, isAdmin };
