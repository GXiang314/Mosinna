import serviceService from '../service/service.service'
import { apiFormatter } from '../utils/api-formatter'

export class ServiceController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async registerService(req, res) {
        if (!req?.body?.name || !req?.body?.host) {
            return res.status(400).json(apiFormatter(null, 400, '資料給我輸好'))
        }
        return res.json(
            apiFormatter(await serviceService.registerService(req.body)),
        )
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async getServices(req, res) {
        return res.json(apiFormatter(await serviceService.getServices()))
    }
}

export default new ServiceController()
