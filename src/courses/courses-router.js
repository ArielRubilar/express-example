
const express = require('express')
const courseController = require('./course-controller')
const coursesRouter = express.Router()

coursesRouter.get('/', courseController.getAllCourses)

coursesRouter.get('/:id', courseController.getCourse)

module.exports = coursesRouter
