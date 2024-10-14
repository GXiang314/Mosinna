import express from 'express'
import checkController from '../controller/check.controller'

const router = express.Router()

router.post('', checkController.uploadVideo.bind(checkController))

export default router
