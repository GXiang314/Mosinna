export class ListService {
    /**
     * @type {import('../repository/fraud.repository').default;}
     */
    fraudRepository

    constructor(fraudRepository) {
        this.fraudRepository = fraudRepository
    }

    async getAllFraudTypes() {
        return await this.fraudRepository.getFraudTypes()
    }

    async getAllFraudSources() {
        return await this.fraudRepository.getFraudSources()
    }
}

export default new ListService()
