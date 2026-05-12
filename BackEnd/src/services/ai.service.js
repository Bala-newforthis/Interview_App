const {GoogleGenAI} = require ("@google/genai")
// const Llama = require("groq-sdk");
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const { resume, selfDescription, jobDescription } = require("./temp")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches to the description "),
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
        serverity : z.enum(["low","medium","high"]).describe("The serverity of the skill gap i.e")
    })).describe("List of skill gaps in the candidate's profile along with their serverity"),
    prepartionPlan : z.array(z.object({
        day: z.number().describe("The day number in the prepartion plan,starting from 1"),
        focus : z.string().describe("The main focus of this day in the prepartion plan, e.g. dataStructure , system design , mock Interview,effectively"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the prepartion")
    })).describe("A day-wise prepartion plan for the candidate to follow in or all the rules "),

    
})

async function generateInterviewReport({resume, selfDescription, jobDescription}) {


    const prompt = `Generate an Interview report for a candidate with the following details :
    Resume : ${resume}
    Self Description : ${selfDescription}
    Job Description : ${jobDescription}
    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents :prompt,
        config: {
            responseMimeType:"application/json",
            responseJsonSchema : zodToJsonSchema(interviewReportSchema)
        }
    })
}

// const llama = new Llama({
    apiKey: process.env.GROQ_API_KEY
// }); // i want to create for the recipe of grop ai which want to implement in it 


console.log(JSON.parse(response.text));


module.exports ={
    generateInterviewReport,
    // generateai,
}





