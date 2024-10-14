import { ServiceRepository } from '../repository/service.repository'
import { CheckService } from '../service/check.service'
import { apiFormatter } from '../utils/api-formatter'

export class CheckController {
    /**
     * @type {import('../service/check.service').default;}
     */
    checkService
    constructor() {
        this.checkService = new CheckService(new ServiceRepository())
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async uploadVideo(req, res) {
        // proxy to ai detection services
        const { videoData } = req.body
        const result = await this.checkService.proxyToCheckService({
            videoData,
        })

        // store video

        // store check result

        // response to client
        res.json(apiFormatter(result))
    }
}
export default new CheckController()
