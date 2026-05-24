// import React, { useState } from 'react'
// import "../style/interview.scss"

// const Interview = () => {
//     const [activeTab, setActiveTab] = useState('technical')
//     const [expandedQ, setExpandedQ] = useState(null)

//     const data = {
//         matchScore: 85,
//         matchText: "Strong match for this role",
//         technicalQuestions: [
//             {
//                 q: "Can you walk me through the architecture of your RstStore e-commerce application? Specifically, how did you handle user authentication and data persistence for orders?",
//                 intention: "To assess the candidate's understanding of full-stack architecture, particularly in a MERN stack context, and their practical implementation of core features like authentication and data management.",
//                 answer: "Candidate should explain the role of Node.js/Express.js for the backend API, MongoDB for database, and React for the frontend. They should detail the authentication flow (e.g., JWT, session-based) and how order data is structured and stored in MongoDB."
//             },
//             {
//                 q: "You mentioned using Redux for state management in React. Can you explain a scenario where Redux was particularly useful in your RstStore project, and how you managed actions and reducers?",
//                 intention: "To evaluate the candidate's grasp of state management concepts in React applications and their ability to apply libraries like Redux effectively.",
//                 answer: "Candidate should describe a complex state scenario (e.g., managing shopping cart items, user login status across multiple components) and explain the concepts of actions, reducers, and the store in Redux."
//             },
//             {
//                 q: "Describe your approach to building RESTful APIs with Node.js and Express.js. What considerations did you make for security and scalability in your RstStore project?",
//                 intention: "To understand the candidate's backend development skills, including API design principles and awareness of security and performance best practices.",
//                 answer: "Candidate should discuss concepts like routing, middleware, request/response handling, and potentially mention security measures like input validation, rate limiting, or HTTPS. For scalability, they might discuss efficient database queries or statelessness."
//             },
//             {
//                 q: "How do you ensure your React components are reusable and maintainable? Can you provide an example from your RstStore project?",
//                 intention: "To gauge the candidate's understanding of modern front-end development practices, component-based architecture, and code quality.",
//                 answer: "Candidate should talk about creating modular, single-purpose components, using props effectively, and possibly mention design patterns or UI libraries used to achieve reusability."
//             },
//             {
//                 q: "You've expressed interest in AI integrations. Can you explain how you might integrate a service like Google Gemini or Groq API into a web application, from a technical perspective?",
//                 intention: "To assess the candidate's proactiveness in learning new technologies relevant to the job description (AI-driven solutions) and their ability to think through technical integrations.",
//                 answer: "Candidate should outline steps like obtaining API keys, using fetch or axios to make requests to the AI API endpoint, handling the response, and displaying the results in the UI. They might also mention server-side proxying for security."
//             }
//         ],
//         behavioralQuestions: [
//             {
//                 q: "Describe a challenging problem you encountered while building the RstStore application. How did you approach solving it, and what was the outcome?",
//                 intention: "To assess problem-solving skills, critical thinking, and perseverance in a technical context.",
//                 answer: "Candidate should provide a specific example, detailing the problem, their thought process, steps taken, resources used, and the final resolution."
//             },
//             {
//                 q: "In your previous roles, you collaborated in Agile sprint planning and daily stand-ups. Can you give an example of how you contributed to a team's success during an Agile sprint?",
//                 intention: "To evaluate collaboration skills, understanding of Agile methodologies, and ability to contribute effectively in a team setting.",
//                 answer: "Candidate should describe a specific instance where they actively participated in planning, provided updates, identified blockers, or helped teammates, leading to a positive team outcome."
//             },
//             {
//                 q: "Your resume mentions mentoring junior researchers. How would you approach mentoring a junior developer who is struggling with a technical concept or task?",
//                 intention: "To understand the candidate's leadership potential, communication style, and ability to support and guide others.",
//                 answer: "Candidate should describe a patient and supportive approach, focusing on understanding the junior developer's difficulty, breaking down the problem, providing clear explanations, and encouraging independent problem-solving."
//             },
//             {
//                 q: "The job description mentions working on AI-driven solutions. How do you stay updated with rapidly evolving technologies like AI, and what motivates you to learn them?",
//                 intention: "To gauge the candidate's initiative in continuous learning, their passion for technology, and their proactive approach to skill development.",
//                 answer: "Candidate should mention specific resources (blogs, online courses, documentation, tech news) and articulate their intrinsic motivation driven by curiosity, the desire to solve complex problems, or professional growth."
//             },
//             {
//                 q: "This role involves working with global companies and potentially remote teams. How do you ensure effective communication and collaboration when working with individuals from diverse backgrounds or in different time zones?",
//                 intention: "To assess communication skills, cultural awareness, and adaptability in a global and potentially remote work environment.",
//                 answer: "Candidate should emphasize clarity in written and verbal communication, active listening, use of collaboration tools, setting clear expectations, and being mindful of time zone differences."
//             }
//         ],
        
//         skillGaps: [
//             { skill: "TypeScript", color: "orange" },
//             { skill: "Software Quality Assurance & Test Planning", color: "yellow" },
//             { skill: "Advanced Security Practices", color: "orange" }
//         ],
//         "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "TypeScript Fundamentals",
//       "tasks": [
//         "Complete an introductory TypeScript tutorial (e.g., official docs, freeCodeCamp).",
//         "Understand basic types, interfaces, and classes.",
//         "Practice converting simple JavaScript functions to TypeScript."
//       ]
//     },
//     {
//       "day": 2,
//       "focus": "TypeScript in React",
//       "tasks": [
//         "Learn how to type React props and state.",
//         "Explore using TypeScript with common React patterns (hooks, context API).",
//         "Refactor a small React component from RstStore to use TypeScript."
//       ]
//     },
//     {
//       "day": 3,
//       "focus": "Software Testing Concepts",
//       "tasks": [
//         "Read about different types of software testing (unit, integration, end-to-end).",
//         "Understand the purpose of test planning.",
//         "Explore popular testing frameworks for JavaScript (Jest, React Testing Library)."
//       ]
//     },
//     {
//       "day": 4,
//       "focus": "Web Application Security",
//       "tasks": [
//         "Review common web vulnerabilities (e.g., XSS, CSRF, SQL Injection).",
//         "Learn about security best practices for Node.js/Express.js.",
//         "Understand principles of secure coding."
//       ]
//     },
//     {
//       "day": 5,
//       "focus": "Exploring Additional Frameworks (Optional)",
//       "tasks": [
//         "Briefly review documentation for Nest.js to understand its architecture.",
//         "Look at Vue.js or Angular basic concepts if time permits.",
//         "Focus on understanding how they differ from the MERN stack."
//       ]
//     },
//     {
//       "day": 6,
//       "focus": "Deep Dive into AI Integration Examples",
//       "tasks": [
//         "Find tutorials or blog posts demonstrating integration of Groq/Gemini APIs.",
//         "Experiment with making API calls in a controlled environment (e.g., Node.js script, simple React app).",
//         "Focus on error handling and data processing."
//       ]
//     },
//     {
//       "day": 7,
//       "focus": "Review and Practice",
//       "tasks": [
//         "Revisit challenging concepts from the week.",
//         "Practice explaining technical topics concisely.",
//         "Prepare answers for common behavioral and technical interview questions."
//       ]
//         },
//     ]


//     const questions = activeTab === 'technical' ? data.technicalQuestions : data.behavioralQuestions

//     return (
//         <main className='interview-page'>
//             {/* Left Sidebar */}
//             <aside className='left-sidebar'>
//                 <h3 className='sidebar-title'>SECTIONS</h3>
//                 <nav className='nav-menu'>
//                     <button
//                         className={`nav-btn ${activeTab === 'technical' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('technical')}
//                     >
//                         <span className='nav-icon'>{'</>'}</span>
//                         Technical Questions
//                     </button>
//                     <button
//                         className={`nav-btn ${activeTab === 'behavioral' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('behavioral')}
//                     >
//                         <span className='nav-icon'>□</span>
//                         Behavioral Questions
//                     </button>
//                     <button className={`nav-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
//                              onClick={() => setActiveTab('roadmap')}>
//                         <span className='nav-icon'>→</span>
//                         Road Map
//                     </button>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <div className='main-content'>
//                 <div className='content-header'>
//                     <h1 className='content-title'>{activeTab === 'technical'? 'Technical Questions'
//                             : activeTab === 'behavioral'? 'Behavioral Questions': 'Preparation Roadmap'}
// </h1>
//                     <span className='question-count'>{questions.length} questions</span>
//                 </div>

//                 <div className='questions-container'>
//                     {questions.map((q, idx) => (
//                         <div key={idx} className='question-item'>
//                             <button
//                                 className='question-btn'
//                                 onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
//                             >
//                                 <span className='question-num'>Q{idx + 1}</span>
//                                 <span className='question-text'>{q.q}</span>
//                                 <span className={`chevron ${expandedQ === idx ? 'open' : ''}`}>∨</span>
//                             </button>
//                             {expandedQ === idx && (
//                                 <div className='question-answer'>
//                                     <div className='answer-section'>
//                                         <h4 className='answer-title'>Intention:</h4>
//                                         <p className='answer-content'>{q.intention}</p>
//                                     </div>
//                                     <div className='answer-section'>
//                                         <h4 className='answer-title'>Expected Answer:</h4>
//                                         <p className='answer-content'>{q.answer}</p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Right Sidebar */}
//             <aside className='right-sidebar'>
//                 <div className='match-score-section'>
//                     <h3 className='sidebar-title'>MATCH SCORE</h3>
//                     <div className='score-circle'>
//                         <div className='score-value'>{data.matchScore}%</div>
//                     </div>
//                     <p className='score-text'>{data.matchText}</p>
//                 </div>

//                 <div className='skill-gaps-section'>
//                     <h3 className='sidebar-title'>SKILL GAPS</h3>
//                     <div className='skill-tags'>
//                         {data.skillGaps.map((gap, idx) => (
//                             <span key={idx} className={`skill-tag ${gap.color}`}>
//                                 {gap.skill}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </aside>
//         </main>
//     )
// }

// export default Interview

