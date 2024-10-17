import { FraudSource } from '../db/fraudSource'
import { FraudType } from '../db/fraudType'

export class FraudRepository {
    /**
     * @typedef {Object} RegisterServiceInput
     * @property {string} host
     * @property {string} name
     *
     * @param {RegisterServiceInput} payload
     */
    async getFraudTypes() {
        return await FraudType.findAll({
            order: [['sort', 'ASC']],
        })
    }

    async getFraudSources() {
        return await FraudSource.findAll({
            order: [['sort', 'ASC']],
        })
    }
}

export default new FraudRepository()
