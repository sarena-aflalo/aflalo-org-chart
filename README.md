# Aflalo Org Chart

Live org chart powered by Airtable, hosted on Render.

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env

# 3. Add your Airtable API key to .env
# Get it from: https://airtable.com/create/tokens
# Needs: data.records:read scope on the Aflalo Org base

# 4. Run locally
npm run dev

# Open http://localhost:3000
```

## Deploy to Render

1. Push this repo to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Set these values:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Environment**: Node
5. Add environment variables:
   - `AIRTABLE_API_KEY` → your key from airtable.com/create/tokens
   - `AIRTABLE_BASE_ID` → appOvpcPEd9RKGNE5
   - `AIRTABLE_TABLE_ID` → tblhAzwdpHdEbcRUR
6. Deploy — you get a permanent URL like `https://aflalo-org.onrender.com`

## Embed in Notion

In any Notion page: type `/embed` → paste your Render URL → done.

## Editing via Claude

From any Claude conversation with Airtable connected:
- "Move X to report to Y"
- "Add Jane Smith, Senior Designer, reporting to Jin Lee"
- "Update Molly Malone's title to VP Finance"

Claude updates Airtable directly. The org chart reflects changes on next page refresh.
