import serviceRepository from '../repository/service.repository'

export class ServiceService {
    /**
     * @typedef {Object} RegisterServiceInput
     * @property {string} host
     * @property {string} name
     *
     * @param {RegisterServiceInput} payload
     */
    async registerService(payload) {
        await serviceRepository.registerService(payload)
    }

    async getServices() {
        return await serviceRepository.getServices()
    }
}

export default new ServiceService()
