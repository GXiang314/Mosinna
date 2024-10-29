import { CheckResult } from '../db/checkResult'
import { Service } from '../db/service'
import { Video } from '../db/video'

export class CheckResultRepository {
    /**
     * @typedef {Object} checkResult
     * @property {string} service_id
     * @property {string} result
     * @property {Object} details
     *
     * @param {{checkResult: checkResult[], video_id: string }} result
     */
    async saveCheckResult(result) {
        return await CheckResult.bulkCreate(
            result.checkResult.map((x) => {
                return {
                    ...x,
                    video_id: result.video_id,
                    source: result.source,
                    ip: result.ip,
                    details: JSON.stringify(x.details),
                }
            }),
        )
    }

    async getCheckHistory() {
        return (
            await CheckResult.findAll({
                include: [
                    {
                        model: Video,
                        as: 'video',
                    },
                    {
                        model: Service,
                        as: 'service',
                    },
                ],
            })
        ).map((el) => el.get({ plain: true }))
    }
}

export default new CheckResultRepository()
