const { User, UserProfile } = require("../models");
const bcrypt = require("bcryptjs");

const landingPage = (req, res) => {
  res.json({ message: 'Landing page OK' });
};
// };

const registerPage = (req, res) => {
  res.json({ message: 'Register page OK' });
};
// };

const register = async (req, res) => {
  const { email, password, fullName, phone, address } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      role: "pembeli",
    });

    await UserProfile.create({
      userId: user.id,
      fullName,
      phone,
      address,
    });

    res.redirect("/login");
  } catch (err) {
    const errors = err.errors?.map((e) => e.message) || [err.message];
    res.render("register", {
      title: "Register - QurbanIn",
      errors,
    });
  }
};

const loginPage = (req, res) => {
  res.json({ message: 'login page OK' });
};
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("login", {
        title: "Login - QurbanIn",
        errors: ["Email atau password salah"],
      });
    }

    const isValid = user.checkPassword(password);
    if (!isValid) {
      return res.render("login", {
        title: "Login - QurbanIn",
        errors: ["Email atau password salah"],
      });
    }

    req.session.userId = user.id;
    req.session.role = user.role;
    req.session.email = user.email;

    if (user.role === "admin") {
      return res.redirect("/animals");
    }
    res.redirect("/");
  } catch (err) {
    const errors = err.errors?.map((e) => e.message) || [err.message];
    res.render("login", {
      title: "Login - QurbanIn",
      errors,
    });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/login");
  });
};

module.exports = {
  landingPage,
  registerPage,
  register,
  loginPage,
  login,
  logout,
};
