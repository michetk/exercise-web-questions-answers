const express = require('express')
router = express.Router()
const Question = require('../models/Question')

router.get('/', (req, res) => {
    Question.findAll({
        raw: true
    }).then((questions) => {
        console.log(questions)
        res.render('questions/questions', {
            questions: questions
        })
    })
})

router.get('/makequestion', (req, res) => {
    res.render('questions/makequestions')
})

router.post('/makequestion/savequestion', (req, res) => {
    let title = req.body.title
    let question = req.body.question

    Question.create({
        title: title,
        description: question
    }).then(() => {
        res.redirect("/")
    })
})

module.exports = router