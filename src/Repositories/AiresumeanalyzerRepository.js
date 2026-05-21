const fs = require("fs");
const pdf = require("pdf-parse");
const PdfHelper = require("../Helpers/PdfHelper");
const TextHelper = require("../Helpers/TextHelper");

class AiresumeanalyzerRepository {

    async fixResume({ file }) {
        const extractedText = await this.extractText(file.path);
        const fixedText = TextHelper.cleanResume(extractedText || "No text found");
        return await PdfHelper.generatePDF(fixedText);
    }
    async extractText(filePath) {
        const buffer = fs.readFileSync(filePath);
        const data = await pdf(buffer);
        return data.text;
    }
}

module.exports = new AiresumeanalyzerRepository();