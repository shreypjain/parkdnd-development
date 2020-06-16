const express = require('express');
const router = express.Router();

const userControl = require("../controllers/user.controller");
const hostControl = require("../controllers/host.controller");
const drivewayControl = require("../controllers/driveway.controller");
const rentalControl = require("../controllers/rental.controller");
//put in all the routes for the main routes

//user routes
router
    .route("/user")
    .get(userControl.userGetAll);
router
    .route("/user")
    .post(userControl.createUser);
router
    .route("/user")
    .put(userControl.editUser);
router
    .route("/user")
    .delete(userControl.deleteUser);

//host routes
router
    .route("/host")
    .get(hostControl.getHost);
router
    .route("/host")
    .post(hostControl.createHost);
router
    .route("/host")
    .put(hostControl.editHost);
router
    .route("/host")
    .delete(hostControl.deleteHost);

//driveway routes
router
    .route("/driveway")
    .get(drivewayControl.getDriveway);
router
    .route("/driveway")
    .post(drivewayControl.createDriveway);
router
    .route("/driveway")
    .put(drivewayControl.editDriveway);
router
    .route("/driveway")
    .put(drivewayControl.deleteDriveway);

//rental routes
router
    .route("/rentals")
    .get(rentalControl.getRentalInfo);
router
    .route("/rentals")
    .post(rentalControl.createRental);

module.exports = router;