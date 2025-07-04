const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./database/database");
const session = require("express-session");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

//db
conn
  .authenticate()
  .then(() => {
    console.log("conexão feita com o banco de dados");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

//view engine
app.set("view engine", "ejs");

//session
app.use(
  session({
    secret: "VitaminaDeAbacateGostoMuito",
    cookie: { maxAge: 300000 }, // 5 min
  })
);
// app.get("/session", (req, res) => {
//   req.session.joao = "pedro";
//   req.session.empresa = "Guiapress";
//   req.session.ano = 2023;
//   res.send("Sessão criada com sucesso!");
// });
// app.get("/leitura", (req, res) => {
//   res.json({
//     joao: req.session.joao,
//     empresa: req.session.empresa,
//     ano: req.session.ano,
//   });
// });

//static files
app.use(express.static("public"));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: { slug: slug },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: { slug: slug },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.listen(8080, () => {
  console.log("rodando");
});
