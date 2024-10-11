import serviceService from '../service/service.service'
import { apiFormatter } from '../utils/api-formatter'

export class ServiceController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async registerService(req, res) {
        res.json(apiFormatter(await serviceService.registerService(req.body)))
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async getServices(req, res) {
        res.json(apiFormatter(await serviceService.getServices()))
    }
}

export default new ServiceController()
