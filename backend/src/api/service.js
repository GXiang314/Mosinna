import express from 'express'
import serviceController from '../controller/service.controller'

const router = express.Router()

router.post('', serviceController.registerService)

router.get('', serviceController.getServices)

export default router
