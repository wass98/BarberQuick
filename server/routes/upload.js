const express = require('express');
const multer = require('multer');
const router = require('express').Router();
const path = require('path');
const User = require('../models/User')
const Barber = require('../models/Barber')

// Define storage and file filter for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG allowed!'), false);
  }
};

// Initialize the multer upload with storage options
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  },
  fileFilter: fileFilter
});


  // Single file upload route for profile picture
  router.post('/upload-profile/:userID', upload.single('profilePicture'), async (req, res) => {
    const userID = req.params.userID; // Get the userID from the route parameter
  
    try {
      if (req.file) {
        const profilePicturePath = req.file.path; // Path to the uploaded image
  
        // Update the user's profilePicture field in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
          userID, 
          { profilePicture: profilePicturePath }, 
          { new: true } // Return the updated document
        );
  
        if (updatedUser) {
          res.status(201).json({
            message: 'Profile picture uploaded and saved successfully!',
            file: req.file,
            path: profilePicturePath
          });
        } else {
          res.status(404).json({
            message: 'User not found'
          });
        }
      } else {
        throw new Error('Profile picture upload failed');
      }
    } catch (error) {
      res.status(500).json({
        message: 'Profile picture upload failed',
        error: error.message
      });
    }
  });

  router.post('/upload-bprofile/:barberID', upload.single('profilePicture'), async (req, res) => {
    const barberID = req.params.barberID; // Get the userID from the route parameter
  
    try {
      if (req.file) {
        const profilePicturePath = req.file.path; // Path to the uploaded image
  
        // Update the user's profilePicture field in MongoDB
        const updatedBarber = await Barber.findByIdAndUpdate(
          barberID, 
          { profilePicture: profilePicturePath }, 
          { new: true } // Return the updated document
        );
  
        if (updatedBarber) {
          res.status(201).json({
            message: 'Profile picture uploaded and saved successfully!',
            file: req.file,
            path: profilePicturePath
          });
        } else {
          res.status(404).json({
            message: 'User not found'
          });
        }
      } else {
        throw new Error('Profile picture upload failed');
      }
    } catch (error) {
      res.status(500).json({
        message: 'Profile picture upload failed',
        error: error.message
      });
    }
  });
  

module.exports = router;
