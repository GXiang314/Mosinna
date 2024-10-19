import { expect, describe, it, beforeAll } from '@jest/globals'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ServiceStatusEnum from '../src/enum/service-status.enum'
import { Service } from '../src/db/service'
import request from 'supertest'
import app from '../src/app'
import { sequelize } from '../src/db'

describe(`驗收測試 - 影片檢測API`, () => {
    beforeAll((done) => {
        sequelize.sync({ force: true }).then(() => {
            done()
        })
    })
    it(`
        Given
            videoData: <使用者上傳的 dataURL>
            所有可用的 Service host

        When
            匿名使用者上傳了一部影片
            呼叫所有可用檢測服務

            透過可用的 host + /api/check 進行 POST API CALL<夾帶影片資料>
            e.g.
            POST http://192.168.1.123:8081
            POST http://192.168.1.123:8083
            {
            videoData: <dataURL>
            }
        Then
            預期得到每一項服務的檢測結果
            每一個服務皆會回傳
            檢測結果存到check_result資料表
 
        WHEN
            查詢本次檢測紀錄
        THEN
            影片連結
            各種檢測的檢測結果
    `, async () => {
        // given
        const videoData =
            'data:video/x-matroska;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAr9tZGF0AAACoAYF//+c3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDEyNSAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTIgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNCBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAA9liIQAV/0TAAYdeBTXzg8AAALvbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAACoAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAhl0cmFrAAAAXHRraGQAAAAPAAAAAAAAAAAAAAABAAAAAAAAACoAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAgAAAAIAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAAqAAAAAAABAAAAAAGRbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAwAAAAAgBVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABPG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAPxzdGJsAAAAmHN0c2QAAAAAAAAAAQAAAIhhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAgACABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMmF2Y0MBZAAK/+EAGWdkAAqs2V+WXAWyAAADAAIAAAMAYB4kSywBAAZo6+PLIsAAAAAYc3R0cwAAAAAAAAABAAAAAQAAAgAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAACtwAAAAEAAAAUc3RjbwAAAAAAAAABAAAAMAAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTQuNjMuMTA0'
        const services = await setupServices()
        mockAxios(services)
        // when
        const result = await request(app)
            .post('/api/check')
            .send({
                videoData: videoData,
            })
            .expect(200)
        // then
        assertCheckVideo_is_VOICE_ricky__TEXT_pass__(result)

        // when
        const history = await request(app).get('/api/history')
        // then
        const data = history.body.data?.[0]
        expect(data.services.length).toBe(2)
        expect(data).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                video_path: expect.stringContaining(process.env.RESOURCES_PATH),
                services: expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.toBeOneOf(['AI音訊檢測', '文字詐騙檢測']),
                        result: expect.toBeOneOf(['pass', 'risky']),
                        details: expect.toBeOneOf([
                            undefined,
                            expect.anything(),
                        ]),
                    }),
                ]),
                checked_at: expect.any(String),
            }),
        )
    })
})
function assertCheckVideo_is_VOICE_ricky__TEXT_pass__(result) {
    const data = result.body?.data
    expect(data?.length).toBeGreaterThan(0)
    data.forEach((item) => {
        expect(item.id).toEqual(expect.any(String))
        expect(item.name).toBeOneOf(['AI音訊檢測', '文字詐騙檢測'])
        if (item.name === 'AI音訊檢測') {
            expect(item.result).toBe('risky')
        } else {
            expect(item.result).toBe('pass')
            expect(item?.details).toEqual({
                text: expect.any(String),
            })
        }
    })
}

async function setupServices() {
    const services = [
        {
            name: 'AI音訊檢測',
            host: 'http://192.168.1.123:8081',
            status: ServiceStatusEnum.可用,
        },
        {
            name: 'AI影片檢測',
            host: 'http://192.168.1.123:8082',
            status: ServiceStatusEnum.不可用,
        },
        {
            name: '文字詐騙檢測',
            host: 'http://192.168.1.123:8083',
            status: ServiceStatusEnum.可用,
        },
    ]
    await Service.bulkCreate(services)
    return services
}

function mockAxios(services) {
    const mockAxios = new MockAdapter(axios)
    mockAxios.onPost(`${services[0].host}/api/check`).reply(200, {
        result: '此音訊可能為 AI',
    })
    mockAxios.onPost(`${services[2].host}/api/check`).reply(200, {
        result: '該文本無明顯詐騙風險',
        details: {
            text: '影片文字',
        },
    })
}
