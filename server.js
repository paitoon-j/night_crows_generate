const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBTlkCDb-GRcwP7Sz6VYiT4NjZM8l8ESDM");
const fs = require("fs").promises;
const express = require("express");
const multer = require("multer");

const server = express();
const path = require('path');
const upload = multer({ dest: "uploads/" });

server.use(express.static("scripts"));
server.use(express.static(path.join(__dirname, 'public')));

async function extractNameFromImage(imagePath) {
    try {
        const imageBuffer = await fs.readFile(imagePath);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            "แยกชื่อจากภาพ เอาแต่ชื่อเท่านั้น ลบสัญลักษณ์และเครื่องหมายออกทั้งหมด",
            { inlineData: { data: imageBuffer.toString("base64"), mimeType: "image/*" } }
        ]);
        return result.response.text();
    } catch (error) {
        console.error("Error extracting name:", error);
        return "ไม่สามารถแยกชื่อได้";
    }
}

/////////////////////////////////////////////////////////////////////////////

server.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No image file uploaded.");
        }

        const extractedName = await extractNameFromImage(req.file.path);
        await fs.unlink(req.file.path);
        res.send(extractedName);

    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).send("Error processing image.");
    }
});

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;

const localtunnel = require('localtunnel');
server.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}/`);

    const tunnel = await localtunnel({
        port: port,
        subdomain: 'night-crows-generate',
        local_https: false
    });
    console.log(`Tunnel opened at: ${tunnel.url}`);
});