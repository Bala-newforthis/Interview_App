import React, { useState } from 'react'
import "../style/interview.scss"

const Interview = () => {

    const [activeTab, setActiveTab] = useState('technical')
    const [expandedQ, setExpandedQ] = useState(null)

    const data = {
        matchScore: 85,
        matchText: "Strong match for this role",

        technicalQuestions: [
            {
                q: "Can you walk me through the architecture of your RstStore e-commerce application? Specifically, how did you handle user authentication and data persistence for orders?",
                intention: "To assess the candidate's understanding of full-stack architecture, particularly in a MERN stack context, and their practical implementation of core features like authentication and data management.",
                answer: "Candidate should explain the role of Node.js/Express.js for the backend API, MongoDB for database, and React for the frontend. They should detail the authentication flow (e.g., JWT, session-based) and how order data is structured and stored in MongoDB."
            },
            {
                q: "You mentioned using Redux for state management in React. Can you explain a scenario where Redux was particularly useful in your RstStore project?",
                intention: "To evaluate the candidate's grasp of state management concepts in React applications.",
                answer: "Candidate should describe a complex state scenario (e.g., managing shopping cart items, user login status across multiple components) and explain the concepts of actions, reducers, and the store in Redux."
            },
            {
                q: "Describe your approach to building RESTful APIs with Node.js and Express.js. What considerations did you make for security and scalability in your RstStore project?",
                intention: "To understand the candidate's backend development skills, including API design principles and awareness of security and performance best practices.",
                answer: "Candidate should discuss concepts like routing, middleware, request/response handling, and potentially mention security measures like input validation, rate limiting, or HTTPS. For scalability, they might discuss efficient database queries or statelessness."
            },
            {
                q: "How do you ensure your React components are reusable and maintainable? Can you provide an example from your RstStore project?",
                intention: "To gauge the candidate's understanding of modern front-end development practices, component-based architecture, and code quality.",
                answer: "Candidate should talk about creating modular, single-purpose components, using props effectively, and possibly mention design patterns or UI libraries used to achieve reusability."
            },
            {
                q: "You've expressed interest in AI integrations. Can you explain how you might integrate a service like Google Gemini or Groq API into a web application, from a technical perspective?",
                intention: "To assess the candidate's proactiveness in learning new technologies relevant to the job description (AI-driven solutions) and their ability to think through technical integrations.",
                answer: "Candidate should outline steps like obtaining API keys, using fetch or axios to make requests to the AI API endpoint, handling the response, and displaying the results in the UI. They might also mention server-side proxying for security."
            }
        ],

        behavioralQuestions: [
            {
                q: "Describe a challenging problem you encountered while building the RstStore application.",
                intention: "To assess problem-solving skills and perseverance.",
                answer: "Candidate should provide a specific example, detailing the problem, their thought process, steps taken, resources used, and the final resolution."
            },
            {
                q: "How do you stay updated with rapidly evolving technologies like AI?",
                intention: "To gauge initiative in continuous learning.",
                answer: "Candidate should mention blogs, documentation, courses, and experimentation."
            },
             {
                q: "Your resume mentions mentoring junior researchers. How would you approach mentoring a junior developer who is struggling with a technical concept or task?",
                intention: "To understand the candidate's leadership potential, communication style, and ability to support and guide others.",
                answer: "Candidate should describe a patient and supportive approach, focusing on understanding the junior developer's difficulty, breaking down the problem, providing clear explanations, and encouraging independent problem-solving."
            },
            {
                q: "The job description mentions working on AI-driven solutions. How do you stay updated with rapidly evolving technologies like AI, and what motivates you to learn them?",
                intention: "To gauge the candidate's initiative in continuous learning, their passion for technology, and their proactive approach to skill development.",
                answer: "Candidate should mention specific resources (blogs, online courses, documentation, tech news) and articulate their intrinsic motivation driven by curiosity, the desire to solve complex problems, or professional growth."
            },
            {
                q: "This role involves working with global companies and potentially remote teams. How do you ensure effective communication and collaboration when working with individuals from diverse backgrounds or in different time zones?",
                intention: "To assess communication skills, cultural awareness, and adaptability in a global and potentially remote work environment.",
                answer: "Candidate should emphasize clarity in written and verbal communication, active listening, use of collaboration tools, setting clear expectations, and being mindful of time zone differences."
            }
        ],

        skillGaps: [
            { skill: "TypeScript", color: "orange" },
            { skill: "Software Testing", color: "yellow" },
            { skill: "Security Practices", color: "orange" },
            { skill: "Application for testing", color: "yellow"}
        ],

        preparationPlan: [
            {
                day: 1,
                focus: "TypeScript Fundamentals",
                tasks: [
                    "Learn TypeScript basics",
                    "Understand interfaces and types",
                    "Convert JS functions to TS"
                ]
            },
            {
                day: 2,
                focus: "TypeScript with React",
                tasks: [
                    "Learn typing props",
                    "Learn typing hooks",
                    "Refactor React component using TS"
                ]
            },
            {
                day: 3,
                focus: "Software Testing",
                tasks: [
                    "Learn Jest",
                    "Learn React Testing Library",
                    "Understand unit testing"
                ]
            },
            {
      "day": 4,
      "focus": "Web Application Security",
      "tasks": [
        "Review common web vulnerabilities (e.g., XSS, CSRF, SQL Injection).",
        "Learn about security best practices for Node.js/Express.js.",
        "Understand principles of secure coding."
      ]
    },
    {
      "day": 5,
      "focus": "Exploring Additional Frameworks (Optional)",
      "tasks": [
        "Briefly review documentation for Nest.js to understand its architecture.",
        "Look at Vue.js or Angular basic concepts if time permits.",
        "Focus on understanding how they differ from the MERN stack."
      ]
    },
    {
      "day": 6,
      "focus": "Deep Dive into AI Integration Examples",
      "tasks": [
        "Find tutorials or blog posts demonstrating integration of Groq/Gemini APIs.",
        "Experiment with making API calls in a controlled environment (e.g., Node.js script, simple React app).",
        "Focus on error handling and data processing."
      ]
    },
    {
      "day": 7,
      "focus": "Review and Practice",
      "tasks": [
        "Revisit challenging concepts from the week.",
        "Practice explaining technical topics concisely.",
        "Prepare answers for common behavioral and technical interview questions."
      ]
        }
        ]
    }

    const questions =
        activeTab === 'technical'
            ? data.technicalQuestions
            : activeTab === 'behavioral'
                ? data.behavioralQuestions
                : data.preparationPlan

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
                                        {q.q}
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
                            {data.matchScore}%
                        </div>

                    </div>

                    <p className='score-text'>
                        {data.matchText}
                    </p>

                </div>

                <div className='skill-gaps-section'>

                    <h3 className='sidebar-title'>SKILL GAPS</h3>

                    <div className='skill-tags'>

                        {data.skillGaps.map((gap, idx) => (

                            <span
                                key={idx}
                                className={`skill-tag ${gap.color}`}
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