import axios from 'axios'

export class CheckService {
    /**
     * @type {import('../repository/service.repository').default}
     */
    serviceRepository
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository
    }

    async uploadVideo(videoData) {
        await uploadRepository.uploadVideo(videoData)
    }
    async callAvailableApi() {
        await uploadRepository.callAvailableApi()
    }

    async proxyToCheckService(input) {
        const { videoData } = input
        // 找出所有可用的 Services
        const services = await this.serviceRepository.getAllAvaliableServices()

        // 透過 axios 呼叫檢測服務
        const results = await Promise.all(
            services.map(async (service) => {
                const { data } = await axios.post(`${service.host}/api/check`, {
                    videoData,
                })
                return {
                    id: service.id,
                    name: service.name,
                    result: mapResultToPassOrRisky(data?.result),
                    details: data?.details || undefined,
                }
            }),
        )

        // 彙整所有檢測結果並回傳
        return results
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
