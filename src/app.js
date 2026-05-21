
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const resumeRoutes = require("./Routes/AiresumeanalyzerRoutes");
const errorHandler = require("./Middleware/errorHendler");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const uploadsDir = path.join(process.cwd(), "uploads");
const generatedDir = path.join(process.cwd(), "generated");
const initFolders = () => {

    if (!fs.existsSync(uploadsDir)) {

        fs.mkdirSync(uploadsDir, {
            recursive: true
        });

    }
    if (!fs.existsSync(generatedDir)) {

        fs.mkdirSync(generatedDir, {
            recursive: true
        });

    }
};

initFolders();
app.use(
    "/generated",
    express.static(generatedDir)
);

app.use(
    express.static(
        path.join(process.cwd(), "public")
    )
);
app.use(
    "/api/airesumeanalyzer",
    resumeRoutes
);
app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            process.cwd(),
            "public",
            "Airesumeanalyzer.html"
        )
    );

});
app.use(errorHandler);

module.exports = app;
