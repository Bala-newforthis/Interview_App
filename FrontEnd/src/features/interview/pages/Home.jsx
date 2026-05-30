import React, { useState, useEffect, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
// import { report } from '../../../../../BackEnd/src/app.js'

const Home = () => {

    const { loading, generateReport, reports, getReports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [showHistory, setShowHistory] = useState(false)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        getReports()
    }, [])

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
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data?._id) {
            await getReports()
            navigate(`/interview/${data._id}`)
        }
    }

    if (loading) {
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
                <div className="footer-left">
                    <span className="timing">AI-Powered Strategy Generation - Approx 30s</span>
                    <button
                        type='button'
                        className='history-toggle'
                        onClick={() => setShowHistory(prev => !prev)}
                    >
                        {showHistory ? 'Hide Interview History' : 'Tap to view your recent reports'}
                    </button>
                    {reports.length > 0 && (
                        <span className='history-count'>Showing latest {Math.min(reports.length, 5)} of {reports.length} saved reports</span>
                    )}
                </div>
                <button 
                        onClick={handleGenerateReport}
                    className="btn-primary">★ Generate My Interview Strategy</button>
            </div>

            {showHistory && (
                <section className='history-panel'>
                    <div className='history-header'>
                        <h2>Recent Interview History</h2>
                        <p>Tap any item to open the report. The list is limited to your latest 5 reports.</p>
                    </div>
                    {reports.length > 0 ? (
                        <ul className='reports-list'>
                            {reports.slice(0, 5).map((report) => (
                                <li
                                    key={report._id}
                                    className='report-item'
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <div>
                                        <h3>{report.title || 'Untitled Position'}</h3>
                                        <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className='report-link'>Open</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='history-empty'>No previous reports were found yet.</p>
                    )}
                </section>
            )}

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href="#"> Privacy Policy </a>
                <a href="#"> Terms of Service </a>
                <a href="#"> Help Center </a>
                <p>&copy; 2026 Interview Prep AI. All rights reserved.</p>
            </footer>
        </main>

        
    )
}

export default Home