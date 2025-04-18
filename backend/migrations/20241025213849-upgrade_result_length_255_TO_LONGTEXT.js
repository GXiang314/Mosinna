'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('check_result', 'result', {
            allowNull: false,
            type: Sequelize.TEXT('long'),
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('check_result', 'result', {
            allowNull: false,
            type: Sequelize.STRING,
        })
    },
}
