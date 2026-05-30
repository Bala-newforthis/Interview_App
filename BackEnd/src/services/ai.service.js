const { GoogleGenAI } = require ("@google/genai")
const { z, formatError } = require("zod")
const { resume, selfDescription, jobDescription } = require("./temp")
const puppeteer  = require("puppeteer")


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
        answer : z.string().describe("Explain the concept with practical examples and implementation details.")
    })).describe("Technical question can be asked in the interview along with their intention and how to answer them "),
    behavioralQuestions : z.array(z.object({
        question : z.string().describe("The behavioral question can be asked in the Interview"),
        intention: z.string().describe("The intention of interview behind asking this question "),
        answer : z.string().describe("Explain the concept with practical examples and implementation details.")
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
    title:z.string().describe("The title of the job for which the interview report is generated"),

    
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

IMPORTANT:
Return ONLY valid JSON.
Do not return plain strings for arrays.
technicalQuestions, behavioralQuestions, skillGaps, and preparationPlan MUST contain objects exactly matching schema.

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
      "severity": ["low","medium","high"],
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

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. technicalQuestions must be an ARRAY OF OBJECTS.
3. behavioralQuestions must be an ARRAY OF OBJECTS.
4. skillGaps must be an ARRAY OF OBJECTS.
5. preparationPlan must be an ARRAY OF OBJECTS.
6. Do NOT return plain strings inside arrays.
7. Follow the schema exactly.

- matchScore must be between 0 and 100
- Generate exactly 5 technicalQuestions
- Generate exactly 5 behavioralQuestions
- Generate exactly 3 skillGaps
- Generate exactly 7 preparationPlan items
- severity must only be:
  "low"
  "medium"
  "high"

            Resume:${resume}

            Self Description:${selfDescription}

            Job Description:${jobDescription}
`;
const response  = await ai.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents : prompt,
  config : {
    responseMimeType : "application/json",
  }
})
const result = response.text;

const parsedData = JSON.parse(result);

parsedData.title =
    parsedData.positionApplied || "Software Developer"

parsedData.technicalQuestions =
    parsedData.technicalQuestions.map((q) => ({
        ...q,
        answer:
            q.answer && q.answer.trim() !== ""
                ? q.answer
                : "Explain your approach clearly with practical examples and implementation details."
    }))

parsedData.behavioralQuestions =
    parsedData.behavioralQuestions.map((q) => ({
        ...q,
        answer:
            q.answer && q.answer.trim() !== ""
                ? q.answer
                : "Use the STAR method to answer this behavioral question effectively."
    }))

console.log(parsedData);

return parsedData;


}

async function generatePdfFromHtml (htmlContent) {
  const browser = await puppeteer.launch()
  // console.log("puppeteer:",puppeteer);
  
  const page = await browser.newPage();
  await page.setContent(htmlContent , {waitUntil : "networkidle2"})

  const pdfBuffer = await page.pdf({ format : "A4" })

  await browser.close()

  return pdfBuffer
}

async function generateResumePdf ({resume, selfDescription, jobDescription}) {
  const resumePdfSchema = z.object({
    html:z.string().describe("The Html content of the resume which can be converted to PDF using any library like puppeteer")
  })
  const prompt = `Generate a resume for a candidate with the following details :
                  Resume = ${resume}
                  Self Description = ${selfDescription}
                  Job Description = ${jobDescription} 
                  the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer
                  `

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType : "application/json",
    }
  })


  const jsonContent =  JSON.parse(response.text)

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

  return pdfBuffer


} 


module.exports ={
    generateInterviewReport,
    generateResumePdf,
}