const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const slugify = require("slugify");
const Article = require("./Article");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/articles", adminAuth, (req, res) => {
  Article.findAll({ include: [{ model: Category }] }).then((articles) => {
    res.render("admin/articles/index", { articles: articles });
  });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});

router.post("/articles/save", adminAuth, (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

router.post("/articles/delete", adminAuth, (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/articles");
      });
    } else {
      // se n for numero
      res.redirect("/admin/articles");
    }
  } else {
    // null
    res.redirect("/admin/articles");
  }
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
  var id = req.params.id;

  if (isNaN(id)) {
    // se n for numero
    res.redirect("/admin/articles");
    return;
  }

  Article.findByPk(id) // findByPk busca pelo id primário
    .then((article) => {
      if (article != undefined) {
        res.render("admin/articles/edit", { article: article });
      } else {
        res.redirect("/admin/articles");
      }
    })
    .catch((err) => {
      // erro ao buscar categoria
      res.redirect("/admin/articles");
    });
});
router.post("/articles/update", adminAuth, (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;

  Article.update(
    { title: title, slug: slugify(title), body: body },
    { where: { id: id } }
  ).then(() => {
    res.redirect("/admin/articles");
  });
});

router.get("/articles/page/:num", (req, res) => {
  var page = parseInt(req.params.num);
  if (isNaN(page) || page <= 1) {
    // Se for página 1 ou inválida, redireciona para a home
    res.redirect("/");
    return;
  }

  var offset = (page - 1) * 4; // 4 artigos por página

  Article.findAndCountAll({
    limit: 4,
    offset: offset,
    order: [["id", "DESC"]],
  }).then((articles) => {
    var next = offset + 4 < articles.count;

    var result = {
      page: page,
      articles: articles,
      next: next,
    };

    Category.findAll().then((categories) => {
      res.render("admin/articles/page", {
        result: result,
        categories: categories,
      });
    });
  });
});

module.exports = router;
