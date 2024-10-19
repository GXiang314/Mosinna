import axios from 'axios'

export class CheckService {
    /**
     * @type {import('../repository/service.repository').default}
     */
    serviceRepository
    /**
     * @type {import('../repository/checkResult.repository').default}
     */
    checkResultRepository
    constructor(serviceRepository, checkResultRepository) {
        this.serviceRepository = serviceRepository
        this.checkResultRepository = checkResultRepository
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
                    const endPoint = `${service.host}/api/check`
                    const { data } = await axios.post(endPoint, {
                        videoData,
                    })
                    console.log(new Date())
                    console.log(data)
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

    /**
     * @typedef {Object} checkResult
     * @property {string} service_id
     * @property {string} result
     * @property {string} details
     *
     * @param {{checkResult: checkResult[], video_id: string }} result
     */
    async saveCheckResult(result) {
        return await this.checkResultRepository.saveCheckResult(result)
    }
}

/**
 *
 * @param {String} message
 * @returns {'risky' | 'pass'}
 */
function mapResultToPassOrRisky(message) {
    const msg = message.toLowerCase()
    const resultMap = new Map([
        [true, 'risky'],
        [false, 'pass'],
    ])
    const isRisky =
        msg.includes('可能為 ai') ||
        msg.includes('可能涉及詐騙') ||
        msg.includes('fake')
    return resultMap.get(isRisky)
}

export default new CheckService()
