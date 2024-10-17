import { describe, it, expect } from '@jest/globals'
import request from 'supertest'
import app from '../src/app'
import { FraudType } from '../src/db/fraudType'
import { FraudSource } from '../src/db/fraudSource'

describe('驗收測試 for Get List', () => {
    it(`
        Given 資料庫已存在詐騙手法；來源資料

        1. 取得詐騙手法成功
        2. 取得詐騙來源成功
    `, async () => {
        // given
        const fraudType = await FraudType.findAll()
        expect(fraudType.length).toBeGreaterThan(0)

        // when
        await request(app)
            .get('/api/list/fraudTypes')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                const data = response.body?.data
                expect(data.length).toBeGreaterThan(0)
                data.forEach((item) => {
                    expect(
                        fraudType.find((x) => x.content === item.content),
                    ).not.toBeUndefined()
                })
            })

        // given
        const fraudSource = await FraudSource.findAll()
        expect(fraudSource.length).toBeGreaterThan(0)

        // when
        await request(app)
            .get('/api/list/fraudSources')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                const data = response.body?.data
                expect(data.length).toBeGreaterThan(0)
                data.forEach((item) => {
                    expect(
                        fraudSource.find((x) => x.content === item.content),
                    ).not.toBeUndefined()
                })
            })
    })
})
