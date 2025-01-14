const db = require('../db');
const { uploadIMG, uploadPDF, auditTrails } = require('../helper/helper');

// add event name
const addEvents = async(req,res) => {

      const {
        company_id,
        details,
        status,
      } = req.body;
    
      try {
    
        const event = { 
            company_id: company_id,
            details: details,
            status: status,
        };
        
        await db('events').insert(event);


        const dt = {
            status: res.statusCode,
            data: `Sucessful add event`
        };

       await auditTrails(`Add event ${details}`, company_id, req.userAccess.id);
        
      res.json(dt);
    
      } catch(error) {
        console.log(error);
        return res.status(500).send('Error add event');
      }

}

// add attandance list
const addAttendance = async (req,res) => {

    const {
        name,
        bod,
        email,
        phone,
        whatapps,
        telegram,
        role_id,
        company_id,
        height,
        weight,
        registration_date,
        gender
      } = req.body;
    
      try {
    
        const attandance = { 
            name: name,
            bod: bod,
            email: email,
            phone: phone,
            whatapps: whatapps,
            telegram: telegram,
            role_id: role_id,
            company_id: company_id,
            height: height,
            weight: weight,
            registration_date: registration_date,
            gender: gender,
        };
        
        await db('attendances').insert(attandance);


        const dt = {
            status: res.statusCode,
            data: `Sucessful add attandance list`
        };
      
       await auditTrails(`Add attendance ${attandance.name}`, company_id, req.userAccess.id);

      res.json(dt);
    
      } catch(error) {
        console.log(error);
        return res.status(500).send('Error add attandance');
      }

}

// update attandance list
const updateAttendance = async (req,res) => {

    const {
        name,
        bod,
        email,
        phone,
        whatapps,
        telegram,
        role_id,
        company_id,
        height,
        weight,
        registration_date,
        gender
      } = req.body;
    
      try {
    
        const attandance = { 
            name: name,
            bod: bod,
            email: email,
            phone: phone,
            whatapps: whatapps,
            telegram: telegram,
            role_id: role_id,
            company_id: company_id,
            height: height,
            weight: weight,
            registration_date: registration_date,
            gender: gender,
        };
        
        await db('attendances').update(attandance)
        .where('id', req.params.id);


        const dt = {
            status: res.statusCode,
            data: `Sucessful update attandance`
        };
      
      res.json(dt);
    
      } catch(error) {
        console.log(error);
        return res.status(500).send('Error add event');
      }

}

// update attandance list
const updateEvents = async (req,res) => {

    const {
        details,
        status,
      } = req.body;
    
      try {
    
        const event = { 
            details: details,
            status: status,
        };
        
        await db('events').update(event)
        .where('id', req.params.id);


        const dt = {
            status: res.statusCode,
            data: `Sucessful update event`
        };
      
      res.json(dt);
    
      } catch(error) {
        console.log(error);
        return res.status(500).send('Error add event');
      }

}

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


// get event by id
const eventCompanyID = async (req, res) => {
    const id = req.params.id
    try {
        const companiesEvents = await db('events')
    .select('id as event_id', 'company_id', 'details', 'status', 'venue', 'date', 'time')
    .where('company_id', id );
 
    const transformedEvent = companiesEvents.map(event => ({
        event_id: event.event_id,
        company_id: event.company_id,
        details: event.details,
        venue: event.venue,
        date: event.date,
        time: event.time,
        status: event.status,
    }))

            const dt = {
              status: res.statusCode,
              data: transformedEvent,
              length: transformedEvent.length,
            };
        
        res.json(dt);
    
      } catch (error) {
        console.error('Error retrieving event:', error);
        res.status(500).json('event not found');
      }
  };

module.exports = {
    addEvents,
    addAttendance,
    updateAttendance,
    updateEvents,
    uploadFilePDF,
    uploadFileIMG,
    eventCompanyID

};
