const TourPackage = require('../models/Tourpackage.model');

const insertTourPackage = async(req,res) =>{
    try {
        const {
            name,
            destination,
            duration,
            price,
            maxGroupSize,
            description
        } = req.body;

        let itinerary = [], tags = [];
        const availability = req.body.availability === 'true';

        // Log the received data for debugging
        console.log('Received itinerary:', req.body.itinerary);
        console.log('Received tags:', req.body.tags);
        console.log('Received files:', req.files);

        // Handle JSON parsing with type checking
        try {
            if (typeof req.body.itinerary === 'string') {
                itinerary = JSON.parse(req.body.itinerary);
            } else if (Array.isArray(req.body.itinerary)) {
                itinerary = req.body.itinerary;
            }
            
            if (typeof req.body.tags === 'string') {
                tags = JSON.parse(req.body.tags);
            } else if (Array.isArray(req.body.tags)) {
                tags = req.body.tags;
            }
        } catch (err) {
            console.error('Parsing error:', err);
            return res.status(400).json({message: "Invalid itinerary or tags format"});
        }

        if (!name || !destination || !duration || !price || !maxGroupSize || !description) {
            return res.status(400).json({message: "Required fields are missing"});
        }

        const packageExists = await TourPackage.findOne({name});
        if(packageExists){
            return res.status(400).json({message:"Package already exist in the DB"})
        }
        // Process uploaded files and store their paths
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        console.log('Processed image paths:', images);

        const newPackage = await TourPackage.create({
            name,
            destination,
            duration,
            price,
            availability,
            maxGroupSize,
            description,
            itinerary,
            images,
            tags: tags || []
        });
        return res.status(200).json(newPackage);
    } catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

const displayAllPackages = async(req,res) =>{
    try{
        const package = await TourPackage.find();
        if(!package){
            return res.status(400).json({message:"Package not exist in the DB"});
        }
        return res.status(200).json(package);
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

const updatePackage = async(req,res) =>{
    const { id } = req.params;
    const { name, destination, duration, price, availability, maxGroupSize, description, itinerary, images, tags } = req.body;
    
    if(!name || !destination || !duration || !price || !availability || !maxGroupSize || !description || !itinerary || !images || !tags) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const packageExists = await TourPackage.findById(id);
        if (!packageExists) {
            return res.status(404).json({message: "Tour package not found"});
        }

        const updatedPackage = await TourPackage.findByIdAndUpdate(
            id,
            { name, destination, duration, price, availability, maxGroupSize, description, itinerary, images, tags },
            {new:true}
        );

        return res.status(200).json({
            message: "Tour package updated successfully",
            package: updatedPackage
        });
    }
    catch(err) {
        return res.status(500).json({
            message: "Error updating tour package",
            error: err.message
        });
    }
}

const deletePackage = async(req,res) =>{
    const {id} = req.params;
    try{
        const package = await TourPackage.findById(id);
        if(!package){
            return res.status(400).json({message:"No package found in the DB"});
        }
        await TourPackage.findOneAndDelete(package);
        return res.status(200).json({message:"Successfully deleted from DB"});
    }
    catch(err){
        return res.status(200).json({message:"Internal server error"});
    }
}

const getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const package = await TourPackage.findById(id);

        if (!package) {
            return res.status(404).json({ message: "Package not found" });
        }

        return res.status(200).json(package);
    } catch (error) {
        console.error('Error in getPackageById:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    insertTourPackage,
    displayAllPackages,
    updatePackage,
    deletePackage,
    getPackageById
};
