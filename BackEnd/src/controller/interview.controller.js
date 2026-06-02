const pdfParse = require("pdf-parse")
const { generateInterviewReport , generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


/**
 * @description Controller  to generate interview report based on user self description , resume and job description  
 */
async function generateInterviewReportController(req, res) {

    try {
        let resumeText  = ""
        if (req.file) {
            const resumeContent = await (
                new pdfParse.PDFParse(
                    Uint8Array.from(req.file.buffer)
                )
            ).getText()

            resumeText = resumeContent.text
        }
    
    const { selfDescription, jobDescription } = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume : resumeText,
        selfDescription,
        jobDescription
    })

    const InterviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume : resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })
    res.status(201).json ({
        message : "Interview report generated succesfully",
        interviewReport : InterviewReport   
    })
} catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        message : error.message
    })
}
}
/**
 * @description Controller to get interview report by interviewId . 
 */

async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        console.log("Received interviewId:", interviewId);
        console.log("Logged in user:", req.user.id);

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        console.log("Mongo Result:", interviewReport);

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * @description Controller to get all the interview reports of logged  in user .
 */

async function getAllInterviewReportsController(req, res) {
    
    const interviewReports  = await interviewReportModel.find ({user: req.user.id}).sort ({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message : "Interview reports fetched successfully.",
        interviewReports
    })
}

/**
 * @description Controller to generate resume PDF based on user self Description , resume and job description 
 */

async function generateResumePdfController(req, res) {

    const {interviewReportId} = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message : "Interview report not found ."
        })
    }

    const { resume , jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf ({resume, jobDescription, selfDescription})

    res.set({
        "Content-Type" : "application/pdf",
        "Content-Disposition" : `attachment : filename=resume_${interviewReportId}.pdf` 
    })
    res.send(pdfBuffer)
}

module.exports = {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController, generateResumePdfController}