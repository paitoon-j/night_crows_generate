const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBTlkCDb-GRcwP7Sz6VYiT4NjZM8l8ESDM");
const fs = require("fs").promises;
const express = require("express");
const multer = require("multer");
const path = require('path');
const server = express();
const upload = multer({ dest: "uploads/" });


server.use(express.static("scripts"));
server.use(express.static(path.join(__dirname, 'public')));

async function extractNameFromImage(imagePath) {
    try {
        const imageBuffer = await fs.readFile(imagePath);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            "แยกชื่อจากภาพและลบสัญลักษณ์ออกทั้งหมดจนเหลือแต่ชื่อ ยกตัวอย่างเช่น - Eytenn - Eyten - CZESPass",
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
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});