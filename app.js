const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;
const authRouter = require("./routes/auth");
const animalRouter = require("./routes/animal");
const farmRouter = require("./routes/farm");
const orderRouter = require("./routes/order");

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

// ==== Routers ====
app.use("/", authRouter);
app.use("/animals", animalRouter);
app.use("/farms", farmRouter);
app.use("/orders", orderRouter);

app.use((req, res) => {
  res.status(404).render("404", { title: "Halaman Tidak Ditemukan" });
});

app.listen(port, () => {
  console.log(`QurbanIn app listening on port ${port}`);
});
