import express from 'express'
import listController from '../controller/list.controller'

const router = express.Router()

router.get('/fraudSources', listController.getFraudSources.bind(listController))
router.get('/fraudTypes', listController.getFraudTypes.bind(listController))

export default router
