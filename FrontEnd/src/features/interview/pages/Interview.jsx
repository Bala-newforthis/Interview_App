import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router'
import "../style/interview.scss"
import { useInterview } from '../hooks/useInterview.js'

const Interview = () => {

    const [activeTab, setActiveTab] = useState('technical')
    const [expandedQ, setExpandedQ] = useState(null)

    const { report, getReportById } = useInterview()
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