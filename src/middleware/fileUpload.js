const multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
    filename: function(req, file, cb){
        return cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) ) 
    }
});


const upload = multer({ 
    storage : storage
});

module.exports = upload;
