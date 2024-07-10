import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { query } = req.body;
      const response = await axios.post('http://127.0.0.1:5000/api/search', { query });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching search results' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
