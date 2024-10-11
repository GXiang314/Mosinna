import serviceRepository from '../repository/service.repository'

export class ServiceService {
    /**
     * @typedef {Object} RegisterServiceInput
     * @property {string} host - host of the service.
     * @property {string} name - name of the service.
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
