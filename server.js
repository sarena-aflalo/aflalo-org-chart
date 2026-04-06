require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appOvpcPEd9RKGNE5';
const TABLE_ID = process.env.AIRTABLE_TABLE_ID || 'tblhAzwdpHdEbcRUR';

if (!AIRTABLE_API_KEY) {
  console.error('ERROR: AIRTABLE_API_KEY is not set. Add it to your .env file.');
  process.exit(1);
}

// Serve the frontend
app.use(express.static('public'));

// API proxy — fetches all pages from Airtable and returns clean JSON
app.get('/api/team', async (req, res) => {
  try {
    let records = [];
    let offset = null;

    do {
      const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100${offset ? '&offset=' + offset : ''}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
      });

      if (!response.ok) {
        const err = await response.json();
        return res.status(response.status).json({ error: err.error?.message || 'Airtable error' });
      }

      const data = await response.json();
      records = records.concat(data.records);
      offset = data.offset;
    } while (offset);

    const people = records
      .map(r => ({
        id: r.id,
        name: r.fields['Name'] || '',
        title: r.fields['Title'] || '',
        dept: {'Atelier - Development':'Atelier-Dev','Atelier - Production':'Atelier-Prod'}[r.fields['Department']] || r.fields['Department'] || '',
        manager: r.fields['Reports to'] || '',
        inGusto: r.fields['In Gusto'] === true,
        notes: r.fields['Notes'] || '',
      }))
      .filter(p => p.name);

    res.json({ people, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Aflalo org chart running at http://localhost:${PORT}`);
});
