const express = require("express");
const router = express.Router();
let routes = app => {
    const savethedates = require("../controllers/savethedate.controller.js");
    var router = require("express").Router();
    // Create a new SaveTheDates
    router.post("/", savethedates.create);
    // Retrieve all SaveTheDates
    router.get("/", savethedates.findAll);
    // Retrieve all published SaveTheDates
    router.get("/published", savethedates.findAllPublished);
    // Retrieve a single SaveTheDate with id
    router.get("/:id", savethedates.findOne);
    // Update a SaveTheDate with id
    router.put("/:id", savethedates.update);
    // Delete a SaveTheDate with id
    router.delete("/:id", savethedates.delete);
    // Create a new SaveTheDate
    router.delete("/", savethedates.deleteAll);
    app.use('/api/savethedates', router);
  };
  module.exports = routes;