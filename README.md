# StaffHub HR Demo

This is a simple HR Management system demo. Follow the steps below to run it on your computer.

## How to Start the App

### 1. Prerequisites
Make sure you have **Node.js** installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Setup
Open your terminal (Command Prompt or Terminal app) in this project folder and type:

```bash
npm install
```
This will download all the necessary files the app needs to run.

### 3. Run the App
Once the setup is finished, type:

```bash
npm run dev
```

### 4. View the App
After running the command above, you will see a link like `http://localhost:5173/`. 
**Copy and paste that link into your web browser** to see the StaffHub dashboard!

## Pseudo-Language Deployment (Rigi Tokens)

To add the tokenized "Rigi Tokens" language to the app, follow these steps:

### 1. Add the Language File
Place your tokenized JSON file in the following directory:
`src/locales/rigi.json`

### 2. Register the Language
Open `src/locales/index.js` and add the new language to the imports and exports:

```javascript
import en from './en.json';
// ... other imports
import rigi from './rigi.json'; // Add this

export const translations = {
  en,
  // ... other translations
  rigi // Add this
};

export const languageNames = {
  en: 'English',
  // ... other names
  rigi: 'Rigi Tokens' // Add this
};
```

### 3. Switch Language in App
Once registered, you can select "Rigi Tokens" from the language selector in the **Settings** page of the app to see the tokenized strings.

## What's inside?
- **Dashboard:** Overview of company stats.
- **Employees:** Manage your team.
- **Leave Requests:** Handle time-off applications.
- **Payroll:** View salary information.
- **Settings:** Change language and system preferences.
