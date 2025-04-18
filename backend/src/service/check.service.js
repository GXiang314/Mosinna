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

    /**
     *
     * @param {import("express").Response} res
     * @param {string} type
     * @param {*} data
     * @returns
     */
    sendSSE(res, type, data) {
        res.write(
            `data: ${JSON.stringify({
                type,
                data,
            })} \n\n`,
        )
        console.log(
            `SSE: ${type} - ${JSON.stringify(data)} - ${new Date().toISOString()}`,
        )
        // res.flush()
    }

    /**
     *
     * @param {import("express").Response} res
     * @param {{videoData: string}} input
     * @returns
     */
    async proxyToCheckServiceSSE(res, input) {
        const { videoData } = input
        // 找出所有可用的 Services
        const services = await this.serviceRepository.getServices()

        if (!services.length) {
            this.sendSSE(res, 'ValidationError', {
                message: '沒有可用的檢測服務',
            })
            return
        }
        this.sendSSE(res, 'VideoUploaded', {
            checkServices: services.map((x) => ({
                id: x.id,
                name: x.name,
            })),
        })
        // 透過 axios 呼叫檢測服務
        const results = await Promise.all(
            services.map(async (service) => {
                try {
                    const endPoint = `${service.host}/api/check`

                    // Mock response time between 5-30 seconds
                    const mockResponseTime = Math.floor(Math.random() * 21) + 5 // Random number between 10-30
                    await new Promise((resolve) =>
                        setTimeout(resolve, mockResponseTime * 1000),
                    )

                    // Simulate response data
                    const data = {
                        result: Math.random() > 0.5 ? '可能為 ai' : 'pass',
                        details: `Checked in ${mockResponseTime} seconds`,
                    }

                    console.log(new Date())
                    console.log(data)
                    const payload = {
                        id: service.id,
                        name: service.name,
                        result: mapResultToPassOrRisky(data?.result),
                        details: data?.details || undefined,
                    }
                    this.sendSSE(res, 'VideoCheckFinished', payload)
                    return payload
                } catch (error) {
                    console.log(error.message)
                    return null
                }
            }),
        )

        // 彙整所有檢測結果並回傳
        return results.filter((x) => x !== null)
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
     * @param {{checkResult: checkResult[], video_id: string, source: string, ip: string }} result
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
