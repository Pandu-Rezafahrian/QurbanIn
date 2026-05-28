const isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  if (req.session.role !== "admin") {
    return res.redirect("/");
  }
  next();
};

const isGuest = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/");
  }
  next();
};

module.exports = { isLoggedIn, isAdmin, isGuest };
