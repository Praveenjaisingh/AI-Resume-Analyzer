const fs = require("fs");
const path = require("path");

(async () => {

    const uploadDir = path.join(__dirname, "../uploads");
    const files = fs.readdirSync(uploadDir);

    const filePath = path.join(uploadDir, files[0]);

    console.log("Using file:", filePath);

    const buffer = fs.readFileSync(filePath);

    // ✅ FORCE CLEAN IMPORT (THIS IS THE KEY FIX)
    const pdfParse = (await import("pdf-parse")).default;

    const result = await pdfParse(buffer);

    console.log("\nEXTRACTED TEXT:\n");
    console.log(result.text);

})();