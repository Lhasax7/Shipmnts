const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
exports.getOverview = async(req,res,next)=>{
    console.log('Hello')
    console.log(req.cookies.jwt);
    let user;
    if(!req.cookies.jwt){
        user=null
    }
    else{
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        user = await User.findById(decoded.id);
        console.log(user);
    }
    const questions = await Question.find().populate('user').populate('answers');
    res.status(200).render('main',{
        title: 'Home',
        questions: questions,
        user: user
    })
}
// exports.viewQuestion = async(req,res,next)=>{
//     const question = await Question.findById(req.params.id).populate('user').populate('answers');
//     res.status(200).render('question',{
//         title: 'Question',
//         question: question
//     })
// }
exports.getLogin = async(req,res,next)=>{
    res.status(200).render('loginpage',{
        title: 'Login'
    })
}
exports.getaskquestion = async(req,res,next)=>{
    console.log('Hello')
    console.log(req.cookies.jwt);
    let user;
    if(!req.cookies.jwt){
        res.status(200).render('loginpage',{
            title: 'Login'
        })
    }
    else{
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        user = await User.findById(decoded.id);
        console.log(user);
    }
    res.status(200).render('askquestion',{
        title: 'Ask Question',
        user: user
    })
}

exports.getProfile = async(req,res,next)=>{
    console.log(req.cookies.jwt);
    let user;
    if(!req.cookies.jwt){
        res.status(200).render('loginpage',{
            title: 'Login'
        })
    }
    else{
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        user = await User.findById(decoded.id).populate('questions').populate('answers');
        console.log(user);
    }
    res.status(200).render('profile',{
        title: 'Profile',
        user: user
})
}
exports.getUpdateMe = async(req,res,next)=>{
    console.log(req.cookies.jwt);
    let user;
    if(!req.cookies.jwt){
        res.status(200).render('loginpage',{
            title: 'Login'
        })
    }
    else{
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        user = await User.findById(decoded.id);
        console.log(user);
    }
    res.status(200).render('settings',{
        title: 'Update Profile',
        user: user
})
}

exports.getSearchResults = async(req,res,next)=>{
    console.log(req.cookies.jwt);
    let user;
    if(!req.cookies.jwt){
        res.status(200).render('loginpage',{
            title: 'Login'
        })
    }
    else{
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        user = await User.findById(decoded.id);
        console.log(user);
    }
    
    res.status(200).render('searchResults',{
        title: 'Search Results',user:user
})
}

exports.viewQuestion = async(req,res,next)=>{
    console.log(req.cookies.jwt);
    let user;
    if(!req.cookies.jwt){
        res.status(200).render('loginpage',{
            title: 'Login'
        })
    }
    else{
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        user = await User.findById(decoded.id);
        // console.log(user);
    }
    const questionId = req.params.id;
    const question = await Question.findById(req.params.id).populate('user').populate('answers');
    const answers = await Answer.find({question:questionId}).populate('user');
    console.log("______________________________")
    console.log(answers);
    // console.log(question);
    res.status(200).render('viewquestion',{
        title: 'Question',
        user: user,
        answers: answers,
        question: question,
        questionId:questionId
    })
    
}
exports.getUserProfile = async(req,res,next)=>{
    console.log(req.cookies.jwt);
    let user;
    if(!req.cookies.jwt){
        res.status(200).render('loginpage',{
            title: 'Login'
        })
    }
    else{
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        user = await User.findById(decoded.id);
        // console.log(user);
    }
    const userId = req.params.id;
    const userProfile = await User.findById(userId).populate('questions').populate('answers');
    res.status(200).render('otherProfile',{
        title: 'User Profile',
        user: user,
        userProfile: userProfile
})
}
