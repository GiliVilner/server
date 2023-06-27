// 3
const indexR = require("./index");
const usersR = require("./users");
const blogsR = require("./blogs");
// const foodsR = require("./foods");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/blogs",blogsR);
  // app.use("/foods",foodsR);
}