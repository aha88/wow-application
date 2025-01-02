
const db = require('../db');
const { uploadIMG, uploadPDF } = require('../helper/helper');



// Controller method for file upload
const uploadFileIMG =  async(req, res) => {
    const uploadMiddleware = uploadIMG.single('file');

    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || 'File upload failed' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }


        try {
            const id = req.params.id;
            const fileUrl = `${req.protocol}://${req.get('host')}/assets/events/${req.file.filename}`;

            const image = {
                event_id: 1,
                company_id: id,
                name: req.file.originalname,
                url: fileUrl,
                description: req.file.filename,
            };

            await db('images').insert(image);

            res.json({
                // file: req.file,
                status: res.statusCode,
                message: 'File uploaded successfully',
                data:{
                    name: req.file.originalname,
                    url: fileUrl,
                    description: req.file.filename,
                    size: req.file.size
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    });
};


// Controller method for file upload
const uploadFilePDF =  async(req, res) => {
    const uploadMiddleware = uploadPDF.single('file');

    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || 'File upload failed' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }


        try {
            const id = req.params.id;
            const fileUrl = `${req.protocol}://${req.get('host')}/assets/certificate/${req.file.filename}`;

            const image = {
                company_id: id,
                name: req.file.originalname,
                url: fileUrl,
                date: new Date(),
            };

            await db('certifications').insert(image);

            res.json({
                // file: req.file,
                status: res.statusCode,
                message: 'File uploaded successfully',
                data:{
                    name: req.file.originalname,
                    url: fileUrl,
                    description: req.file.filename,
                    size: req.file.size
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    });
};

module.exports = {
    uploadFilePDF,
    uploadFileIMG 
};
