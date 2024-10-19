import { CheckResult } from '../db/checkResult'

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
                    details: JSON.stringify(x.details),
                }
            }),
        )
    }
}

export default new CheckResultRepository()
