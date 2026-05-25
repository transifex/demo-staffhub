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

The app is already configured to support **Rigi Tokens**. You don't need to change any code!

1. Locate your tokenized JSON file.
2. Open the file `src/locales/rigi.json` in this project.
3. **Replace everything** inside that file with your own tokenized data.
4. Save the file.
5. In the app, go to **Settings > Language** and select **Rigi Tokens**.

---

## What's inside?
- **Dashboard:** Overview of company stats.
- **Employees:** Manage your team and status.
- **Leave Requests:** Handle time-off applications.
- **Settings:** Easily switch between languages (including your custom Rigi Tokens).
