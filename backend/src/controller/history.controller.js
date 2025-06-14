import { Service } from '../db/service'
import { Video } from '../db/video'
import { CheckResultRepository } from '../repository/checkResult.repository'
import { HistoryService } from '../service/history.service'
import { apiFormatter } from '../utils/api-formatter'
import { getResourceURL } from '../utils/env'

export class HistoryController {
    /**
     * @type {import('../service/history.service').default;}
     */
    historyService
    constructor() {
        this.historyService = new HistoryService(new CheckResultRepository())
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async getCheckHistory(req, res) {
        return res.json(
            apiFormatter(
                toCheckHistoryPresenter(
                    await this.historyService.getCheckHistory(),
                ),
            ),
        )
    }

    /**
     * @param {import("express").Request<{ videoId: string }>} req
     * @param {import("express").Response} res
     */
    async getCheckHistoryByVideoId(req, res) {
        const data = await this.historyService.getCheckHistoryByVideoId(
            req.params.videoId,
        )
        if (!data || data.length === 0) {
            return res.status(404).json(apiFormatter(null, 404, '查無資料'))
        }
        return res.json(apiFormatter(toCheckHistoryPresenter(data)[0]))
    }
}

/**
 * @typedef {Object} CheckHistory
 * @property {string} result
 * @property {string} details
 * @property {string} checked_at
 * @property {string} updated_at
 * @property {Service} service
 * @property {Video} video
 *
 * @typedef {Object} ServiceData
 * @property {string} name
 * @property {string} result
 * @property {any} details
 *
 * @typedef {Object} CheckHistoryPresenter
 * @property {string} id
 * @property {string} video_path
 * @property {string} source
 * @property {string | null} url
 * @property {ServiceData[]} services
 * @property {string} checked_at
 *
 * @param {CheckHistory[]} params
 */
function toCheckHistoryPresenter(params) {
    if (!params || params.length === 0) {
        return []
    }
    const grouped = params.reduce((groups, item) => {
        const group = groups[item.video?.id] || []
        group.push(item)
        groups[item?.video?.id] = group
        return groups
    }, {})
    const resourceHost = getResourceURL()
    return Object.keys(grouped).map((videoId) => {
        return {
            id: videoId,
            source: grouped[videoId][0].video?.source,
            url: grouped[videoId][0].video?.url,
            // ip: grouped[videoId][0].ip,
            video_path: `${resourceHost}/${grouped[videoId][0].video?.video_path}`,
            services: grouped[videoId].map((history) => {
                return {
                    name: history.service.name,
                    result: history.result,
                    details: history?.details,
                }
            }),
            checked_at: grouped[videoId][0].checked_at,
        }
    })
}
export default new HistoryController()
