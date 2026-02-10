const express = require("express");
const authRoute = require("./auth");
const bookRoute = require("./books");
const chapterRoute = require("./chapters");
const convertRoute = require("./convert");
const notesRoute = require("./notes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/books",
    route: bookRoute,
  },
  {
    path: "/chapters",
    route: chapterRoute,
  },
  {
    path: "/convert",
    route: convertRoute,
  },
  {
    path: "/notes",
    route: notesRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
