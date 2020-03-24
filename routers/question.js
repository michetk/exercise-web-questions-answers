const express = require('express')
router = express.Router()
const Question = require('../models/Question')
const Answer = require('../models/Answer')

router.get('/', (req, res) => {
    Question.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
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

router.get('/:id', (req, res) => {
    let id = req.params.id
    Question.findOne({
        where: {
            id: id
        },
        raw: true
    }).then(question => {
        if (!question) {
            res.redirect('/questions')
        } else {
            Answer.findAll({
                where: {
                    answerid: question.id
                },
                order: [
                    ['id', 'DESC']
                ],
                raw: true
            }).then(answers => {
                res.render('questions/questionview', {
                    question: question,
                    answers: answers
                })
            })
        }
    })
})

router.post('/answer', (req, res) => {
    let body_content = req.body.body_content
    let answerid = req.body.answerid
    console.log('SUCCESSFULLY')
    Answer.create({
        body_content: body_content,
        answerid: answerid
    }).then((
        res.redirect('/questions/' + answerid)
    ))
})

module.exports = router