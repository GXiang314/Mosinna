import axios from 'axios'

export class CheckService {
    /**
     * @type {import('../repository/service.repository').default}
     */
    serviceRepository
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository
    }

    async proxyToCheckService(input) {
        const { videoData } = input
        // 找出所有可用的 Services
        const services = await this.serviceRepository.getAllAvaliableServices()

        if (!services.length) {
            throw new Error('沒有可用的檢測服務')
        }

        // 透過 axios 呼叫檢測服務
        const results = await Promise.all(
            services.map(async (service) => {
                try {
                    const { data } = await axios.post(
                        `${service.host}/api/check`,
                        {
                            videoData,
                        },
                    )
                    return {
                        id: service.id,
                        name: service.name,
                        result: mapResultToPassOrRisky(data?.result),
                        details: data?.details || undefined,
                    }
                } catch (error) {
                    console.log(error.message)
                    return null
                }
            }),
        )

        // 彙整所有檢測結果並回傳
        return results.filter((x) => x !== null)
    }
}

/**
 *
 * @param {String} message
 * @returns {'risky' | 'pass'}
 */
function mapResultToPassOrRisky(message) {
    const resultMap = new Map([
        [true, 'risky'],
        [false, 'pass'],
    ])
    const isRisky =
        message.includes('可能為 AI') || message.includes('可能涉及詐騙')
    return resultMap.get(isRisky)
}

export default new CheckService()
