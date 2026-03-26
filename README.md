# 📝 Todo Message App

A simple yet functional **Todo / Message App** built with **Node.js**, **Express**, and vanilla **HTML/CSS/JavaScript**. Create and manage todo tasks directly in your browser, with optional server-side persistence to the file system.

---

## 📸 Preview

> The app presents a clean, card-based interface where users can add todo items with a title and optional description. Items can be deleted with a single click.

---

## ✨ Features

- ✅ Add new todo items with a title and description
- 🗑️ Delete individual todo items
- 💾 Server-side persistence — saved messages are stored as text files
- 🔒 Duplicate title detection — prevents overwriting existing messages
- 🐳 Docker-ready for easy deployment
- 📱 Responsive design that works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Node.js, Express 4.x                |
| Frontend   | HTML5, CSS3, Vanilla JavaScript     |
| Icons      | Font Awesome 5                      |
| Container  | Docker                              |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm (comes with Node.js)
- (Optional) [Docker](https://www.docker.com/) for containerised deployment

---

### Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/Bishalkunwar11/group-6-computing-enterprise.git
   cd group-6-computing-enterprise/MessageApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   npm start
   ```

4. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

### Running with Docker

1. **Build the image**

   ```bash
   cd MessageApp
   docker build -t todo-message-app .
   ```

2. **Run the container**

   ```bash
   docker run -p 3000:3000 todo-message-app
   ```

3. Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
group-6-computing-enterprise/
└── MessageApp/
    ├── page/
    │   ├── message.html   # Main todo app UI
    │   └── exists.html    # Error page (duplicate title)
    ├── server.js          # Express server & API routes
    ├── package.json       # Project metadata & dependencies
    └── Dockerfile         # Docker container configuration
```

---

## 🔌 API Routes

| Method | Route     | Description                                    |
|--------|-----------|------------------------------------------------|
| GET    | `/`       | Serve the main todo app page                   |
| GET    | `/exists` | Serve the "title already exists" error page    |
| POST   | `/create` | Save a new message (title + text) to the filesystem |

### POST `/create` — Request Body

| Field   | Type   | Required | Description                   |
|---------|--------|----------|-------------------------------|
| `title` | string | ✅        | Unique file name for the note |
| `text`  | string | ✅        | Content of the note           |

---

## 🧑‍💻 Development

```bash
# Install dependencies
npm install

# Start with auto-restart (if nodemon is installed)
npx nodemon server.js

# Start normally
npm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👥 Team

Built by **Group 6** as part of a Computing Enterprise module.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
