import React, { useState , useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const {loading , generateReport} = useInterview()  
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        if (!jobDescription) {
            alert("Job description is required")
            return
        }

        if (!resumeFile && !selfDescription) {
            alert ("upload resume or enterself Description ")
            return
        }
        const data = await generateReport ({ jobDescription, selfDescription, resumeFile })
        if (data?._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if(loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan ....</h1>
            </main>
        )
    }


    return (
        <main className='home'>
            <div className="form-wrapper">
                {/* Left Column */}
                <div className="column left-column">
                    <div className="header">
                        <span className="icon">■</span>
                        <h2>Target Job Description</h2>
                        <span className="badge">REQUIRED</span>
                    </div>
                    <p className="description">Paste the full job description here - e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript..."</p>
                    <textarea
                        onChange={(e) => {setJobDescription(e.target.value)}}
                        className="textarea"
                        placeholder="Paste the job description here..."
                        maxLength={5000}
                    ></textarea>
                    <span className="counter">0 / 5000 chars</span>
                </div>

                {/* Right Column */}
                <div className="column right-column">
                    <div className="header">
                        <span className="icon">■</span>
                        <h2>Your Profile</h2>
                    </div>

                    {/* Upload Section */}
                    <div className="section">
                        <label className="label">Upload Resume <span className="badge">BEST RESULTS</span></label>
                        <label className="upload-box" htmlFor="resume">
                            <div className="upload-icon">☁️</div>
                            <div className="upload-text">Click to upload or drag & drop</div>
                            <div className="upload-hint">PDF or DOCX (Max 5MB)</div>
                        </label>
                        <input  ref = {resumeInputRef} hidden type="file" id="resume" accept=".pdf,.docx" />
                    </div>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Self Description Section */}
                    <div className="section">
                        <label className="label">Quick Self-Description</label>
                        <textarea
                            onChange={(e) => {setSelfDescription(e.target.value)}}
                            className="textarea small"
                            placeholder="Briefly describe your experience, key skills, and years of experience..."
                        ></textarea>
                    </div>

                    {/* Info Box */}
                    <div className="info-box">
                        <span className="dot">●</span>
                        <span>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</span>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="footer-section">
                <span className="timing">AI-Powered Strategy Generation - Approx 30s</span>
                <button 
                        onClick={handleGenerateReport}
                    className="btn-primary">★ Generate My Interview Strategy</button>
            </div>
        </main>
    )
}

export default Home