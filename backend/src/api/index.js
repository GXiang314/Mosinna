import express from 'express'
import service from './service'
import check from './check'
const router = express.Router()

router.use('/service', service)
router.use('/check', check)

export default router
