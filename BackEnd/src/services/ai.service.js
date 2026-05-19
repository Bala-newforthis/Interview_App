const {GoogleGenAI} = require ("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const { resume, selfDescription, jobDescription } = require("./temp")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema =  z.object({
    candidateName: z.string().describe("Full name of candidate"),
    matchScore: z.coerce.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches to the job description "),
    positionApplied : z.string().describe("name of the tittle which i am applying for "),
    overallRecommendations:z.string().describe("what all are expecting in this position applied as a fresher and experience person in this field where they can improve by itself "),
    strength: z.string().describe("we have self_description based on give me a better strength in this field "),
    coverletter : z.string().describe("we have resume and self_description with this and we get accordindly based on the profile so that interviwer can be impressed by the coverletter "),
    areaofimprovement:z.string().describe("based on the expectation we get self_description and jobdescription make an improvement with that so that we can apply on this role "),
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

    const prompt = `
You are an AI interview analyzer.

Analyze the candidate resume, self description, and job description.

Return ONLY valid JSON.

DO NOT return explanations.
DO NOT return markdown.
DO NOT return arrays of strings.
ALL arrays must contain JSON objects.

Use EXACTLY these keys:

{
  "candidateName": "",
  "matchScore": 0,
  "positionApplied": "",
  "overallRecommendations": "",
  "strength": "",
  "coverletter": "",
  "areaofimprovement": "",

  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "skillGaps": [
    {
      "skill": "",
      "severity": "low"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": ["", ""]
    }
  ]
}

Rules:

- matchScore must be between 0 and 100
- Generate exactly 5 technicalQuestions
- Generate exactly 5 behavioralQuestions
- Generate exactly 3 skillGaps
- Generate exactly 7 preparationPlan items
- severity must only be:
  "low"
  "medium"
  "high"

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;
    
    
try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",

            contents: prompt,

            config: {
                responseMimeType: "application/json",
                // responseSchema : zodToJsonSchema(interviewReportSchema)
            }
        });

console.log(response.text);


const parsedData = JSON.parse(response.text);

console.log(JSON.stringify(parsedData, null ,2));

        // VALIDATE WITH ZOD
        const result = interviewReportSchema.safeParse(parsedData);

        if (!result.success) {

            console.log("ZOD ERROR :" , result.error.format());

            throw new Error("Invalid AI Response");
        }

        return result.data;

    } catch (error) {

        console.error("AI SERVICE ERROR :", error.message);
        

    return {
        success : false,
        message : "Gemini API quota exceeded or AI request failed",
        error : error.message
    };
}
}

module.exports ={
    generateInterviewReport,
}