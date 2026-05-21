const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

class PdfHelper {

    async generatePDF(data = {}) {
        return new Promise((resolve, reject) => {
            try {
                const dir = path.join(
                    process.cwd(),
                    "generated"
                );
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, {
                        recursive: true
                    });
                }
                const fileName =
                    `resume_${Date.now()}.pdf`;
                const filePath =
                    path.join(dir, fileName);
                const doc = new PDFDocument({
                    size: "A4",
                    margin: 50
                });
                const stream =
                    fs.createWriteStream(filePath);
                doc.pipe(stream);
                doc
                    .font("Helvetica-Bold")
                    .fontSize(24)
                    .fillColor("#111827")
                    .text(data.name || "Resume", {
                        align: "center"
                    });
                doc.moveDown(0.5);
                doc
                    .font("Helvetica")
                    .fontSize(11)
                    .fillColor("black");
                if (data.phone) {
                    doc.text(data.phone, {
                        align: "center"
                    });
                }
                if (data.email) {
                    doc
                        .fillColor("blue")
                        .text(data.email, {
                            align: "center",
                            underline: true
                        });
                }
                if (data.github) {
                    doc
                        .fillColor("blue")
                        .text(
                            `GitHub: ${data.github}`,
                            {
                                align: "center",
                                underline: true
                            }
                        );
                }
                if (data.portfolio) {
                    doc
                        .fillColor("blue")
                        .text(
                            `Portfolio: ${data.portfolio}`,
                            {
                                align: "center",
                                underline: true
                            }
                        );
                }
                doc.fillColor("black");
                doc.moveDown(1);
                const addSection = (
                    title,
                    content
                ) => {
                    if (!content) return;
                    doc
                        .font("Helvetica-Bold")
                        .fontSize(15)
                        .fillColor("#2563eb")
                        .text(title);
                    doc.moveDown(0.2);
                    const y = doc.y;
                    doc
                        .moveTo(50, y)
                        .lineTo(550, y)
                        .strokeColor("#cbd5e1")
                        .stroke();
                    doc.moveDown(0.5);
                    doc
                        .font("Helvetica")
                        .fontSize(11)
                        .fillColor("black")
                        .text(content, {
                            align: "left",
                            lineGap: 4
                        });
                    doc.moveDown(1);
                };
                addSection(
                    "SUMMARY",
                    data.summary
                );
                addSection(
                    "SKILLS",
                    data.skills
                );
                addSection(
                    "PROJECTS",
                    data.projects
                );
                addSection(
                    "EDUCATION",
                    data.education
                );
                doc.moveDown(1);
                doc
                    .fontSize(9)
                    .fillColor("gray")
                    .text(
                        "Generated Resume",
                        {
                            align: "center"
                        }
                    );
                doc.end();
                stream.on(
                    "finish",
                    () => {
                        const finalPath = [
                            process.env.APP_URL.trim(),
                            "generated",
                            fileName
                        ].join("/");
                        resolve({
                            status: true,
                            path: finalPath
                        });
                    }
                );
                stream.on(
                    "error",
                    reject
                );
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new PdfHelper();