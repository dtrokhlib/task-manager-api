const multer = require('multer');

const upload = multer({
    // dest: './src/images/avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('File type must be one of the following: .PNG, .JPG, .JPEG and under 1MB in size'));
        }
        cb(undefined, true);
    }
});

module.exports = upload;