const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('../../models/user');
const Image = require('../../models/image');

/**
 * Get all data from the images uploaded by a user
 */
router.post('/get/all', (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            Image.findAll({where: {userId: user.id}})
                .then(images => {
                    res.json({success: true, msg:'Successfully retrieve images', images: images});
                })
                .catch((err) => { 
                    console.log('get all image error: '+err);
                    res.json({success: false, msg:'Cannot retrieve images data'});
                });
        })
        .catch(() => {res.json({success:false, msg:'Unknown user'})});
});

/**
 * Get the image previously uploaded by a user
 */
router.post('/get/:image', (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            Image.findOne({where: {id: req.params.image}})
                .then(image => {
                    if(image.userId === user.id) {
                        fs.readFile(path.join(__dirname, '../../uploads/user_images/'+image.name+'.jpg'), 'base64', (err, base64Image) => {
                            if(err) {
                                res.json({success: false, msg: 'This image no longer exist'});
                            } else {                    
                                let imagedata = {
                                    type: image.type,
                                    size: image.size,
                                    infos: image.infos,
                                    stranding: image.stranding,
                                    lat: image.lat,
                                    long: image.long,
                                    date: image.date
                                }
                                res.json({success:true, msg:'Successfully retrieve the image', image: base64Image, imagedata: imagedata});
                            }
                        });
                    } else {
                        res.json({success: false, msg: 'These data do not belong to you !'});
                    }                
                })
                .catch((err) => { 
                    console.log('get image error: '+err);
                    res.json({success: false, msg:'Cannot retrieve the image'});
                });
        })
        .catch(() => {res.json({success: false, msg: 'Unknown user'})});
});
module.exports = router;