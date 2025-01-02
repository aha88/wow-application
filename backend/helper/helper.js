const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Constants for file upload
const UPLOADIMG_DIR = path.join(__dirname, '../assets/events');
const UPLOADPDF_DIR = path.join(__dirname, '../assets/certificate');
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES_IMAGE = ['image/jpeg', 'image/png'];
const ALLOWED_MIME_TYPES_PDF = ['application/pdf'];

// Ensure upload directory exists
if (!fs.existsSync(UPLOADIMG_DIR)) {
    fs.mkdirSync(UPLOADIMG_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADPDF_DIR)) {
    fs.mkdirSync(UPLOADPDF_DIR, { recursive: true });
}

// Configure Multer
const storageIMG = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

// Configure Multer
const storagePDF = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});




const uploadIMG = multer({
    storageIMG,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        console.log(file);
        if (ALLOWED_MIME_TYPES_IMAGE.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG are allowed.'));
        }
    },
});

const uploadPDF = multer({
    storagePDF,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        console.log(file);
        if (ALLOWED_MIME_TYPES_PDF.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF are allowed.'));
        }
    },
});

module.exports = {
    uploadIMG,
    uploadPDF
};
