# RGM Davao — Medicine Reference

A pharmacy medicine reference web app for RGM Davao. Look up medicines, dosages, precautions, and frequencies by category or search.

---

## Requirements

- [Node.js](https://nodejs.org/) v18 or higher
- A MongoDB Atlas account with a `Davao` database

---

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/marvelTedja/DAVAO.git
cd DAVAO
```

**2. Install dependencies**
```bash
npm install
```

**3. Create your environment file**

Create a file called `config.env` in the root folder:
```
DATABASE=mongodb+srv://<username>:<PASSWORD>@cluster0.ddutl4f.mongodb.net/Davao?retryWrites=true&w=majority
DATABASE_PASSWORD=yourpassword
PORT=3000
```

---

## Running the app

**Production (node)**
```bash
npm start
```

**Development (nodemon — auto-restarts on file changes)**
```bash
npm run dev
```

Then open your browser and go to:
```
http://localhost:3000/davao
```

---

## Seed the database

If the medicines collection is empty, run the seed script to populate it:
```bash
npm run seed
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run with Node.js |
| `npm run dev` | Run with Nodemon (auto-reload) |
| `npm run seed` | Populate the database with medicine data |

---

## Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Templating:** EJS
- **Styling:** Custom CSS
