const db = require("../models");
const SaveTheDate = db.savethedates;
// Create and Save a new SaveTheDate
exports.create = (req, res) => {
    // Validate request
    if (!req.body.guest) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a SaveTheDate
    const savethedate = new SaveTheDate({
      guest: req.body.guest,
      message: req.body.message,
      published: req.body.published ? req.body.published : false
    });
    // Save SaveTheDate in the database
    savethedate
      .save(savethedate)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the SaveTheDate."
        });
      });
  };
// Retrieve all SaveTheDates from the database.
exports.findAll = (req, res) => {
    const guest = req.query.guest;
    var condition = guest ? { guest: { $regex: new RegExp(guest), $options: "i" } } : {};
    SaveTheDate.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving savethedate."
        });
      });
  };
// Find a single SaveTheDate with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    SaveTheDate.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found SaveTheDate with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving SaveTheDate with id=" + id });
      });
  };
// Update a SaveTheDate by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    SaveTheDate.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update SaveTheDate with id=${id}. Maybe SaveTheDate was not found!`
          });
        } else res.send({ message: "SaveTheDate was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating SaveTheDate with id=" + id
        });
      });
  };
// Delete a SaveTheDate with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    SaveTheDate.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete SaveTheDate with id=${id}. Maybe SaveTheDate was not found!`
          });
        } else {
          res.send({
            message: "SaveTheDate was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete SaveTheDate with id=" + id
        });
      });
  };
// Delete all SaveTheDates from the database.
exports.deleteAll = (req, res) => {
    SaveTheDate.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} SaveTheDates were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all SaveTheDates."
        });
      });
  };
// Find all published SaveTheDates
exports.findAllPublished = (req, res) => {
    SaveTheDate.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving SaveTheDates."
        });
      });
  };