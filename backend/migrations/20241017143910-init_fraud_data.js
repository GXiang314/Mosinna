'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const fraudType = [
            { content: '假退費(稅)真詐財', sort: 1 },
            { content: '假綁架(恐嚇)詐財', sort: 2 },
            { content: '假借親友出事勒索(詐財)', sort: 3 },
            { content: '假借銀行貸款詐財', sort: 4 },
            { content: '假冒機構(公務員)詐財', sort: 5 },
            { content: '假借信用卡遭盜刷詐財', sort: 6 },
            { content: '假借個人資料外洩詐財', sort: 7 },
            { content: '假交友(徵婚詐財)', sort: 8 },
            { content: '假借郵件(包裹)招領', sort: 9 },
            { content: '假借催討欠款', sort: 10 },
            { content: '色情應召詐財', sort: 11 },
            { content: '互助會詐財', sort: 12 },
            { content: '芭樂票騙貨', sort: 13 },
            { content: '中獎通知', sort: 14 },
            { content: '刮刮樂', sort: 15 },
            { content: '金光黨', sort: 16 },
            { content: '假網拍', sort: 17 },
            { content: '假瓦斯安檢', sort: 18 },
            { content: '假交友(投資詐財)', sort: 19 },
            { content: '假快遞', sort: 20 },
            { content: '假投資', sort: 21 },
            { content: '假求職', sort: 22 },
            { content: '假車禍', sort: 23 },
            { content: '假廣告', sort: 24 },
            { content: '假推銷', sort: 25 },
            { content: '假催收信用卡費', sort: 26 },
            { content: '假慈善機關(急難救助)', sort: 27 },
            { content: '假預付型消費詐財', sort: 28 },
            { content: '假算命(看風水)', sort: 29 },
            { content: '六合彩', sort: 30 },
            { content: '猜猜我是誰', sort: 31 },
            { content: '擄車(鴿)勒贖', sort: 32 },
            { content: '觀光區旅遊鏢客詐財', sort: 33 },
            { content: '收購郵銀簿(電信門號)', sort: 34 },
            { content: '釣魚簡訊(惡意連結)', sort: 35 },
            { content: '騙取個人資料', sort: 36 },
            { content: '盜用網路帳號', sort: 37 },
            { content: '信用卡遭盜刷', sort: 38 },
            { content: '虛擬遊戲詐騙', sort: 39 },
            { content: '竄改電子商務郵件', sort: 40 },
            { content: '盜(冒)用 LINE 帳號', sort: 41 },
            { content: '解除分期付款(騙買家)', sort: 42 },
            { content: '解除分期付款(騙賣家)', sort: 43 },
            { content: '騙取金融帳戶(卡片)', sort: 44 },
            { content: '其他', sort: 45 },
        ]

        await queryInterface.bulkInsert(
            'fraud_type',
            fraudType.map((item) => ({
                ...item,
                created_at: new Date(),
                updated_at: new Date(),
            })),
        )

        const fraudSource = [
            { content: '接獲歹徒電話', sort: 1 },
            { content: '接獲手機簡訊', sort: 2 },
            { content: '接獲書面文件', sort: 3 },
            { content: '接獲電話語音', sort: 4 },
            { content: '網路詐騙', sort: 5 },
            { content: '直接與人接觸', sort: 6 },
            { content: '其他', sort: 7 },
        ]

        await queryInterface.bulkInsert(
            'fraud_source',
            fraudSource.map((item) => ({
                ...item,
                created_at: new Date(),
                updated_at: new Date(),
            })),
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('fraud_type', null, {})
        await queryInterface.bulkDelete('fraud_source', null, {})
    },
}
