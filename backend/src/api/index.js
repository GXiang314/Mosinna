import express from 'express'
import service from './service'
import check from './check'
import history from './history'
import list from './list'

const router = express.Router()

router.use('/service', service)
router.use('/check', check)
router.use('/history', history)
router.use('/list', list)

export default router
