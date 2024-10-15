import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import 'dotenv/config'
import middlewares from './middlewares'
import api from './api'
import { sequelize } from './db'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    })
})

app.use('/api', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)
;async () => {
    await sequelize
        .validate()
        .then(() => {
            console.log('Database connected')
        })
        .catch((error) => {
            console.error('Unable to connect to the database:', error)
        })
}

export default app
