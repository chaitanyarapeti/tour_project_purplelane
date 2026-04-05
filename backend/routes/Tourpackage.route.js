const express = require('express');
const { insertTourPackage, displayAllPackages, updatePackage, deletePackage, getPackageById } = require('../controllers/Tourpackage.controller');
const upload = require('../middleware/multer');

const route = express.Router();

route.post('/insertPackage', upload.array('images', 5), insertTourPackage);
route.get('/displayPackages', displayAllPackages);
route.get('/displayPackages/:id', getPackageById);
route.put('/update/:id', updatePackage);
route.delete('/remove/:id', deletePackage);

module.exports = route;