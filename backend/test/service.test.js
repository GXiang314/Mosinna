import { expect, describe, it } from '@jest/globals'
import request from 'supertest'
import app from '../src/app'

describe(`驗收測試 - 服務註冊`, () => {
    it(`
        Given (前提)
            name: 服務名稱
            host: 服務位址 <ip:port> | <domain>
            e.g. 
            name: "AI 影片 Deepfake 辨識服務"
            host: "http://192.168.1.123:8080"

        When (做)
            服務註冊

        Then (後置條件、預期結果)
            註冊成功，且服務註冊表新增了
            name: "AI 影片 Deepfake 辨識服務"
            host: "http://192.168.1.123:8080"
            status: "不可用"
    `, async () => {
        // given
        const payload = {
            name: 'AI 影片 Deepfake 辨識服務',
            host: 'http://192.168.1.123:8080',
        }

        // when
        await request(app)
            .post('/api/service')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)

        // then
        /**
         * message: '顯示訊息'
         * data: '資料'
         * status: '狀態碼'
         */
        await request(app)
            .get('/api/service')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                const { body } = response
                const { data } = body
                const service = data.find(
                    (service) => service.name === payload.name,
                )
                expect(service).toBeDefined()
                expect(service.host).toBe(payload.host)
                expect(service.status).toBe('不可用')
            })
    })
})
