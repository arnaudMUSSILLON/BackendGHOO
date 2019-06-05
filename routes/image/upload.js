const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('../../models/user');
const Image = require('../../models/image');

router.post('/upload', (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            let image = {
                name: req.body.metadata.date,
                type: req.body.type,
                size: req.body.size,
                infos: req.body.infos,
                stranding: req.body.stranding,
                lat: req.body.metadata.lat,
                long: req.body.metadata.long,
                date: req.body.metadata.date
            }            
            Image.sync().then(() => {
                Image.create(image)
                    .then(record => {
                        record.setUser(user);
                        let base64Data = decodeBase64Image(req.body.photo);
                        fs.writeFile(path.join(__dirname, '../../uploads/user_images/'+image.name+'.jpg'), base64Data.data, 'base64', err => {
                            if(err) {
                                console.log('Failed to save image on the server: '+err);
                                res.json({success: false, msg:'Upload failed'});
                            } else {
                                res.json({success: true, msg:'The image was successfully uploaded'});
                            }
                          });
                    })
                    .catch((err) => { 
                        console.log('Upload error: '+err);
                        res.json({success: false, msg:'Upload failed'});
                    });
            });
        })
        .catch((err) => {res.json({success:false, msg:'Unknown email address'})});

});
module.exports = router;

/**
 * Decode a base64 image into a buffer
 * @param {Buffer} dataString 
 */
function decodeBase64Image(dataString) {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let res = {};
    if (matches.length !== 3) return new Error('Invalid input string');
    res.type = matches[1];
    res.data = new Buffer(matches[2], 'base64');
    return res;
  }