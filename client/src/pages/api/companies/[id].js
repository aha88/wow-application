export default async function handler(req, res) {
    try {
        const token = req.headers['x-token']
        const id = req.query.id

        const response = await fetch(`${process.env.BE_URL}/api/companies/company/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-token':token
             }
        });
        const data = await response.json();
        return res.json(data);
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error` });
    }
}
