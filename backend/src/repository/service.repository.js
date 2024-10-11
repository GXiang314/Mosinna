import { Service } from '../db/service'
import { ServiceStatusEnum } from '../enum/service-status.enum'

export class ServiceRepository {
    /**
     * @typedef {Object} RegisterServiceInput
     * @property {string} host
     * @property {string} name
     *
     * @param {RegisterServiceInput} payload
     */
    async registerService(payload) {
        return await Service.create({
            name: payload.name,
            host: payload.host,
            status: ServiceStatusEnum.不可用,
        })
    }

    async getServices() {
        return await Service.findAll()
    }
}

export default new ServiceRepository()
