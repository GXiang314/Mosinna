import { FraudRepository } from '../repository/fraud.repository'
import { ListService } from '../service/list.service'
import { apiFormatter } from '../utils/api-formatter'

export class ListController {
    /**
     * @type {import('../service/list.service').default;}
     */
    listService
    constructor() {
        this.listService = new ListService(new FraudRepository())
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async getFraudTypes(req, res) {
        const result = (await this.listService.getAllFraudTypes()).map((x) => {
            return {
                id: x.id,
                content: x.content,
            }
        })
        res.json(apiFormatter(result))
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async getFraudSources(req, res) {
        const result = (await this.listService.getAllFraudSources()).map(
            (x) => {
                return {
                    id: x.id,
                    content: x.content,
                }
            },
        )
        res.json(apiFormatter(result))
    }
}
export default new ListController()
