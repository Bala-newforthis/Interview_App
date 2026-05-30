import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf  } from "../../auth/services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";
import { useEffect } from "react";



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
            return response.interviewReport
        }
        catch (error){
            console.log(error)
        }finally { 
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const  response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
        } finally {
            setLoading (false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null

        useEffect
    }

    return { loading, report , reports , generateReport , getReportById , getReports}
}