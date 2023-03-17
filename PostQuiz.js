require('dotenv').config()

const connectDB = require('./db/connect')
const QuizSchema = require('./QUIZbackend/QuizQuestion.json')

const quiz = require('./model/Quiz')

const start = async () => {
  try {
    await connectDB(process.env.MANGO_URL)
    await quiz.deleteMany()
    await quiz.create(QuizSchema)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
