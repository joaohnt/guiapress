const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Article.belongsTo(Category); // 1-1
Category.hasMany(Article); // 1-N

//Article.sync({ force: true }); // vai criar a tabela smp q executar o código, geralmente so roda na 1 vez
// Cuidado com o force: true, pois ele deleta a tabela e cria novamente, perdendo os dados

module.exports = Article;
