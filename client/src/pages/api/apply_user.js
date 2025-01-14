export default async function handler(req, res) {
    try {
        
        const token = req.headers['x-token']
        const bodypayload = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            staus: 2,
            role_id: 2
        }
        
        const response = await fetch(`${process.env.BE_URL}/api/user/add`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-token':token
             },
             body: JSON.stringify(bodypayload)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
