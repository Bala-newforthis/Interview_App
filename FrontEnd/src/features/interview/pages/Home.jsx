import React from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'

const Home = () => {
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
                        <input hidden type="file" id="resume" accept=".pdf,.docx" />
                    </div>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Self Description Section */}
                    <div className="section">
                        <label className="label">Quick Self-Description</label>
                        <textarea
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
                <button className="btn-primary">★ Generate My Interview Strategy</button>
            </div>
        </main>
    )
}

export default Home