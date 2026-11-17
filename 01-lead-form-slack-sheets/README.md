# 01 — Lead Form → Slack + Google Sheets

A contact form on any website becomes a live lead pipeline: the visitor hits **Send** and within seconds the lead lands formatted in your **Slack** channel and gets logged to **Google Sheets** (timestamped, searchable). No backend, no copy-paste, no Zapier bill — one webhook on n8n.

```
Website form ──POST──▶ Webhook ──▶ Format lead fields ──┬─▶ Slack (#leads)
                                                        └─▶ Google Sheets (append row)
```

## What's in this folder

| File | Purpose |
|---|---|
| `workflow.json` | Templatized n8n workflow — import directly, no cleanup needed |
| `form-example.js` | Drop-in snippet that posts your site's contact form to the webhook |
| `README.md` | This setup guide |

## Setup (≈ 20 minutes)

### 1. Import the workflow
1. Open your n8n instance → **Workflows** → **⋮** → **Import from File** → pick `workflow.json`.
2. n8n generates a fresh webhook ID on import — nothing to do here.

### 2. Slack credential
1. Create a Slack app at https://api.slack.com/apps → **From scratch** (name it e.g. "Lead Bot", pick your workspace).
2. **OAuth & Permissions** → add scope `chat:write` and `chat:write.public` → **Install to Workspace** → copy the **Bot User OAuth Token**.
3. In n8n: **Credentials → New → Slack API** → paste the token.
4. On the **Post lead to Slack** node, select that credential and set the channel (default `#leads` — change to yours).
   - `chat:write.public` lets the bot post into public channels without inviting it. For a private channel, invite the bot with `/invite @Lead Bot`.

### 3. Google Sheets credential
1. In n8n: **Credentials → New → Google Sheets OAuth2** → **Sign in with Google** → allow access.
2. Create a spreadsheet with a tab named **Lead Form** and this header row:

   | Timestamp | Name | Email | Service | Message |
   |---|---|---|---|---|

3. Copy the spreadsheet ID from its URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`
4. On the **Log lead to Google Sheets** node, replace `YOUR_SPREADSHEET_ID` (or re-select the document from the picker) and pick the credential.

### 4. Activate + wire your form
1. Toggle the workflow **Active** (top right).
2. Open the **Receive lead webhook** node → copy the **Production URL**
   (it looks like `https://<your-n8n-host>/webhook/lead`).
3. Add `form-example.js` to your website (adjust the form field names to `name`, `email`, `service`, `message`), replacing `YOUR_N8N_WEBHOOK_URL` with the production URL.
4. Submit a test lead — it should appear in Slack and as a new row in the sheet within a second or two.
