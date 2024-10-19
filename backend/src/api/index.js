import express from 'express'
import service from './service'
import check from './check'
import history from './history'

const router = express.Router()

router.use('/service', service)
router.use('/check', check)
router.use('/history', history)

export default router
