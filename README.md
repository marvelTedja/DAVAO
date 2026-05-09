# RGM Davao — Medicine Reference

## How to Run (Step by Step)

### Before you start — install Node.js
If you have never done this before, download and install Node.js first:
👉 https://nodejs.org/en — click the big **LTS** button and install it like a normal program.

---

### Step 1 — Unzip the file
Right-click the zip file → **Extract All** → save it to a folder you can find easily (e.g. Desktop).

---

### Step 2 — Open the folder in VS Code
1. Open **VS Code**
2. Click **File** in the top left
3. Click **Open Folder**
4. Find and select the folder you just unzipped
5. Click **Select Folder**

---

### Step 3 — Open the Terminal
In VS Code, click **Terminal** in the top menu bar → click **New Terminal**

A black panel will appear at the bottom of the screen. That is the terminal.

---

### Step 4 — Install the app
In the terminal, type this and press **Enter**:
```
npm i
```
Wait for it to finish. You will see a lot of text — that is normal. Wait until it stops.

---

### Step 5 — Start the app
Once Step 4 is done, type this and press **Enter**:
```
nodemon server.js
```
You should see:
```
MongoDB connected successfully
RGM Davao running on port 3000
```

---

### Step 6 — Open the app
Open your browser (Chrome, Edge, etc.) and go to:
```
http://localhost:3000/davao
```

The app is now running!

---

### How to stop the app
Click on the terminal and press **Ctrl + C** on your keyboard.

### How to start it again next time
Just do **Step 3 → Step 5** again. You do not need to run `npm i` again.
