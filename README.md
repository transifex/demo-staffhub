# StaffHub HR Demo

A simple, interactive HR Management system dashboard. This guide will help you get it running on your computer and share it with others in just a few minutes.

## 🚀 Quick Start (Running Locally)

### 1. Prerequisites
You need **Node.js** installed. If you don't have it, download the "LTS" version from [nodejs.org](https://nodejs.org/).

### 2. Setup the Project
Open your terminal (or Command Prompt) and run these commands one by one:

```bash
# Clone the repository
git clone git@github.com:transifex/demo-staffhub.git

# Go into the project folder
cd demo-staffhub

# Install the app (only needed once)
npm install

# Start the app
npm run dev
```

### 3. View the App
Once started, you will see a link like `http://localhost:5173/`. **Copy and paste that link into your web browser** to see the dashboard!

---

## 🌍 How to share it (Using ngrok)

If you want to show this app to someone else over the internet:

1. **Keep the app running** in your first terminal.
2. Open a **second, new terminal** window.
3. Run the following command (requires [ngrok](https://ngrok.com/download) installed):

```bash
ngrok http 5173
```

4. Ngrok will give you a "Forwarding" link (like `https://random-words.ngrok-free.app`). **Send that link to anyone** and they can see your app!

---

## 💎 Adding "Rigi Tokens" (Translation Files)

The app is already configured to support **Rigi Tokens**. To use your own tokenized files, follow these steps:

### 1. Preparation (in Transifex & Rigi)
Before you can use the app, you need to generate your tokenized file:
1. **Upload Source File:** Download the `src/locales/en.json` file from this repository and upload it as the source file to a new project in **Transifex**.
2. **Rigi Project Setup:** Create a project in **Rigi**. **Important:** Ensure the Rigi project has the exact same target languages as your Transifex project.
3. **Generate API Token:** In Rigi, create an API token with "Tokenize strings" authorization.
4. **Connect to Transifex:** In your Transifex project settings, add the Rigi token to enable the integration.
5. **Sync for Signatures:** Run the synchronization in Transifex. This sends the strings to Rigi to generate unique signatures (no state is stored in Rigi).
6. **Download Tokenized File:** Download the resulting tokenized file **from Transifex** (save it as `rigi.json`).

### 2. Add the File to the App
1. **Replace the existing file** at `src/locales/rigi.json` in this project with your newly downloaded file.
2. Now you can capture previews (in rigi) by selecting the rigi tokens language in the app.

---

## What's inside?
- **Dashboard:** Overview of company stats.
- **Employees:** Manage your team and status.
- **Leave Requests:** Handle time-off applications.
- **Settings:** Easily switch between languages (including your custom Rigi Tokens).
