const mongoose = require('mongoose');

/**
 * - job description schema  : String  
 * - resume text : String
 * - Self description : String
 * 
 * - matchScore  : Number
 * 
 * - Technical question : [ {
 *      question : "" ,
 *      intention : "" ,
 *      answer : "" ,                         //this will store data in array form
 *      }] 
 * - Behavarioul quesion : [{
 *          question :"",
 *          intention : "",
 *          answer : "",
 * }]
 * - Skill gaps : [{
 *       skill : "",
 *       severity : {
 *          type : string,
 *          enum : ["low", "medium", "high"]
 *    }
 * }]
 * - prepartion plan : [{
 *         day : number;
 *         focus : string,
 *         tasks : [String]
 * }]
 *   
 */

const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Technical question is required"]
    },
    intention : {
        type : String,
        required : [true, "Intention is required"]
    },
    answer : {
        type : String,
        required : [true , "Answer is required"]
    }
}, {    
    _id: false
})

const behavioralQuestionSchema  = new mongoose.Schema ({
    question : {
        type : String ,
        required : [true, "Behavioral Question is required"]
    },
    intention : {
        type : String ,
        required : [true, "Intention is required"]
    },
    answer : {
        type : String,
        required : [true, "Answer is required"]
    }
} , {
    _id: false
})

const skillGapSchema = new mongoose.Schema ({
    skill : {
        type: String,
        required : [true, "Skill gap is required"]
    },
    severity : {
        type : String,
        enum : ["low", "medium", "high" ],
        required : [true, "severity is required"]
    }
}, {
    _id : false
})

const prepartionplanSchema = new mongoose.Schema ({
    day : {
        type : Number,
        required : [true, "Day is required"]
    },
    focus : {
        type : String,
        required : [true, "Focus is required"]
    },
    tasks : {
        type : String,
        required : [true , "Tasks is required"]
    }
}, {
    _id : false
})

const InterviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : [true, "Job description is required"]
    },
    resume : {
        type : String,
    },
    selfDescription : {
        type : String,
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100,
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillGapSchema],
    prepartionplan : [prepartionplanSchema],
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
} , {
    timestamps : true
})

const interviewReportModel = mongoose.model("InterviewReport" , InterviewReportSchema);

module.exports = interviewReportModel;  