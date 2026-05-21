const repository = require("../Repositories/AiresumeanalyzerRepository");
const appError = require("../Helpers/appError");

class AiresumeanalyzerService {

    async check(file) {
        if (!file) {
            throw new appError("PDF file is required");
        }
        return await repository.fixResume({
            file
        });
    }
}

module.exports = new AiresumeanalyzerService();