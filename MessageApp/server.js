const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

const TEMP_DIR = path.join(__dirname, 'temp');
const MESSAGE_DIR = path.join(__dirname, 'message');

// Ensure required directories exist on startup
async function ensureDirectories() {
    await fs.mkdir(TEMP_DIR, { recursive: true });
    await fs.mkdir(MESSAGE_DIR, { recursive: true });
}

// Rate-limit the create endpoint to prevent filesystem abuse
const createLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests. Please try again later.',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'page', 'message.html');
    res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
    const filePath = path.join(__dirname, 'page', 'exists.html');
    res.sendFile(filePath);
});

app.post('/create', createLimiter, async (req, res) => {
    const { title, text } = req.body;

    // Basic input validation
    if (!title || !title.trim() || !text || !text.trim()) {
        return res.status(400).send('Title and text are required.');
    }

    // Sanitise title to prevent path traversal (replace non-alphanumeric with underscores)
    const safeTitle = path.basename(title.trim().replace(/[^a-zA-Z0-9_\-]/g, '_'));

    try {
        const tempFilePath = path.join(TEMP_DIR, `${safeTitle}.txt`);
        const finalFilePath = path.join(MESSAGE_DIR, `${safeTitle}.txt`);

        // Check if a message with this title already exists
        let exists = false;
        try {
            await fs.access(finalFilePath);
            exists = true;
        } catch (accessErr) {
            if (accessErr.code === 'ENOENT') {
                exists = false;
            } else {
                throw accessErr;
            }
        }

        if (exists) {
            return res.redirect('/exists');
        }

        await fs.writeFile(tempFilePath, text.trim());
        await fs.rename(tempFilePath, finalFilePath);
        res.redirect('/');
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Internal Server Error');
    }
});

ensureDirectories().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to initialise directories:', err);
    process.exit(1);
});

