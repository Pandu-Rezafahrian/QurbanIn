const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;

// --- ROUTER LOCAL TO GLOBAL INSTANCE ---
const authRouter = require("./routes/auth");
const animalRouter = require("./routes/animal");
const farmRouter = require("./routes/farm");
const orderRouter = require("./routes/order");
const profileRouter = require("./routes/profile");
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "qurbanin_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  }),
);

// --- GLOBAL ROUTER ---
app.use("/", authRouter);
app.use("/animals", animalRouter);
app.use("/farms", farmRouter);
app.use("/orders", orderRouter);
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/profile', profileRouter);

app.use((req, res) => {
  res.status(404).render("404", { 
    title: 'Page Not Found',
    error: `Route ${req.originalUrl} is not found` 
  });
});

app.listen(port, () => {
  console.log(`QurbanIn is running on http://localhost:${port}`);
});