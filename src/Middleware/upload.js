const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(
    "/tmp",
    "uploads"
);
if (!fs.existsSync(uploadDir)) {

    fs.mkdirSync(uploadDir, {
        recursive: true
    });

}
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, uploadDir);

    },

    filename: (req, file, cb) => {

        const safeName =
            file.originalname
                .replace(/\s+/g, "-");

        cb(
            null,
            `${Date.now()}-${safeName}`
        );

    }

});
const fileFilter = (
    req,
    file,
    cb
) => {

    if (
        file.mimetype ===
        "application/pdf"
    ) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only PDF files allowed"
            ),
            false
        );

    }

};
const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:
            5 * 1024 * 1024 

    }

});
module.exports = upload;