import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router'
import "../style/interview.scss"
import { useInterview } from '../hooks/useInterview.js'

const Interview = () => {

    const [activeTab, setActiveTab] = useState('technical')
    const [expandedQ, setExpandedQ] = useState(null)

    const { report, getReportById,loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    useEffect(()=> {
        getReportById(interviewId)
    }, [])

    const questions =
        activeTab === 'technical'
            ? report?.technicalQuestions || []
            : activeTab === 'behavioral'
                ? report?.behavioralQuestions || []
                : report?.preparationPlan || []

    return (
        <main className='interview-page'>

            {/* Left Sidebar */}
            <aside className='left-sidebar'>

                <h3 className='sidebar-title'>SECTIONS</h3>

                <nav className='nav-menu'>

                    <button
                        className={`nav-btn ${activeTab === 'technical' ? 'active' : ''}`}
                        onClick={() => setActiveTab('technical')}
                    >
                        <span className='nav-icon'>{'</>'}</span>
                        Technical Questions
                    </button>

                    <button
                        className={`nav-btn ${activeTab === 'behavioral' ? 'active' : ''}`}
                        onClick={() => setActiveTab('behavioral')}
                    >
                        <span className='nav-icon'>□</span>
                        Behavioral Questions
                    </button>

                    <button
                        className={`nav-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
                        onClick={() => setActiveTab('roadmap')}
                    >
                        <span className='nav-icon'>→</span>
                        Road Map
                    </button>

                    </nav>

                    <button 
                    onClick={() => {getResumePdf(interviewId)}}
                    className='button primary-button'>
                        <svg height = {"0.75rem"} style ={{marginRight: "0.8rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>

                

            </aside>

            {/* Main Content */}
            <div className='main-content'>

                <div className='content-header'>

                    <h1 className='content-title'>
                        {
                            activeTab === 'technical'
                                ? 'Technical Questions'
                                : activeTab === 'behavioral'
                                    ? 'Behavioral Questions'
                                    : 'Preparation Roadmap'
                        }
                    </h1>
                    

                    <span className='question-count'>
                        {questions.length} {activeTab === 'roadmap' ? 'days' : 'questions'}
                    </span>

                </div>

                <div className='questions-container'>

                    {activeTab !== 'roadmap' ? (

                        questions.map((q, idx) => (

                            <div key={idx} className='question-item'>

                                <button
                                    className='question-btn'
                                    onClick={() =>
                                        setExpandedQ(expandedQ === idx ? null : idx)
                                    }
                                >

                                    <span className='question-num'>
                                        Q{idx + 1}
                                    </span>

                                    <span className='question-text'>
                                        {q.question}
                                    </span>

                                    <span className={`chevron ${expandedQ === idx ? 'open' : ''}`}>
                                    ▼
                                    </span>

                                </button>

                                {expandedQ === idx && (

                                    <div className='question-answer'>

                                        <div className='answer-section'>

                                            <h4 className='answer-title'>
                                                Intention:
                                            </h4>

                                            <p className='answer-content'>
                                                {q.intention}
                                            </p>

                                        </div>

                                        <div className='answer-section'>

                                            <h4 className='answer-title'>
                                                Expected Answer:
                                            </h4>

                                            <p className='answer-content'>
                                                {q.answer}
                                            </p>

                                        </div>

                                    </div>

                                )}

                            </div>

                        ))


                    ) : (

                        <div className='roadmap-timeline'>

                            {questions.map((plan, idx) => (

                                <div key={idx} className='timeline-row'>

                                    <div className='timeline-marker'>

                                        <div className='marker-day'>Day {plan.day}</div>

                                        <div className='marker-dot' />

                                    </div>

                                    <div className='timeline-card'>

                                        <div className='card-header'>

                                            <h3>{plan.focus}</h3>

                                        </div>

                                        <ul className='card-tasks'>

                                            {plan.tasks.map((task, taskIdx) => (

                                                <li key={taskIdx} className='task-item'>
                                                    {task}
                                                </li>

                                            ))}

                                        </ul>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

            {/* Right Sidebar */}
            <aside className='right-sidebar'>

                <div className='match-score-section'>

                    <h3 className='sidebar-title'>MATCH SCORE</h3>

                    <div className='score-circle'>

                        <div className='score-value'>
                            {report?.matchScore || 0}%
                        </div>

                    </div>

                    <p className='score-text'>
                        {report?.matchText}
                    </p>

                </div>

                <div className='skill-gaps-section'>

                    <h3 className='sidebar-title'>SKILL GAPS</h3>

                    <div className='skill-tags'>

                        {report?.skillGaps?.map((gap, idx) => (

                            <span
                                key={idx}
                                className={`skill-tag ${gap.severity}`}
                            >
                                {gap.skill}
                            </span>

                        ))}

                    </div>

                </div>

            </aside>

        </main>
    )
}

export default Interview