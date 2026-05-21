const service =require("../Services/AiresumeanalyzerService");

exports.check = async (req,res,next) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                status: false,
                message:"PDF file is required"
            });
        }
        const result =await service.check(req.file);
        return res.download(
            result.localPath,
            result.fileName,
            error => {
                if (error) {
                    next(error);
                }
            }
        );
    } catch (error) {
        next(error);
    }

};