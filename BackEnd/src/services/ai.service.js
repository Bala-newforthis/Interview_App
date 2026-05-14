const {GoogleGenAI} = require ("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const { resume, selfDescription, jobDescription } = require("./temp")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("A score between 0 to 100 indicating how well the candidate's profile matches to the description "),
    technicalQuestions : z.array(z.object({
        question: z.string().describe("The technical question can be asked in the Interview "), 
        intention : z.string().describe("The intention of interview behind asking this question "),
        answer : z.string().describe("How to answer this question, what points to be cover, what approach to take etc.")
    })).describe("Technical question can be asked in the interview along with their intention and how to answer them "),
    behavioralQuestions : z.array(z.object({
        question : z.string().describe("The behavioral question can be asked in the Interview"),
        intention: z.string().describe("The intention of interview behind asking this question "),
        answer : z.string().describe("How to answer this question, what points to be cover,  what approach to take etc.")
    })).describe("Behavioral question can be asked in the interview along with their intention and how to answer them "),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking "),
        severity : z.enum(["low","medium","high"]).describe("The serverity of the skill gap i.e")
    })).describe("List of skill gaps in the candidate's profile along with their serverity"),
    preparationPlan : z.array(z.object({
        day: z.number().describe("The day number in the preparation plan,starting from 1"),
        focus : z.string().describe("The main focus of this day in the preparation plan, e.g. dataStructure , system design , mock Interview,effectively"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation")
    })).describe("A day-wise preparation plan for the candidate to follow in or all the rules "),

    
})

async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    
    const prompt = ` return only return valid json .
    do not return markdown.
    do not return explanation text.


    
    Generate an Interview report for a candidate with the following details :
    Resume : ${resume}
    Self Description : ${selfDescription}
    Job Description : ${jobDescription}
    `
try {

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",

            contents: prompt,

            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema),
                temperature : 0.2
            }
        });

        console.log(response.text);

        // CLEAN MARKDOWN
        // const cleanedText = response.text
        //     .replace(/```json/g, "")
        //     .replace(/```/g, "")
        //     .trim();

        // PARSE JSON
        // const parsedData = JSON.parse(cleanedText);

        // VALIDATE WITH ZOD
        const result = interviewReportSchema.safeParse(parsedData);

        if (!result.success) {

            console.log(result.error.format());

            throw new Error("Invalid AI Response");
        }

        return result.data;

    } catch (error) {

        console.log("AI SERVICE ERROR:");
        console.log(error);

    return {
        success : false,
        message : "Gemini API quota exceeded or AI request failed",
        error : error.message
    };
    }
}

 
generateInterviewReport({resume, selfDescription, jobDescription});


module.exports ={
    generateInterviewReport,
}





