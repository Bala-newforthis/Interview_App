import { getAllInterviewReports, generateInterviewReport, getInterviewReportById  } from "../../auth/services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import { jobDescription, selfDescription } from "../../../../../BackEnd/src/services/temp";


export const useInterview = () => {

    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
        
    }

    const { loading , setLoading , report , setReport , reports , setReports } = context 

    const generateReport = async ({ jobDescription , selfDescription, resumeFile }) => {
        setLoading (true)
        try {
            const response = await generateInterviewReport ({jobDescription, selfDescription, resumeFile})
            setReport (response.interviewReport)
        }
        catch (err){
            console.log(error)
        }finally { 
            setLoading(false)
        }
    }
}