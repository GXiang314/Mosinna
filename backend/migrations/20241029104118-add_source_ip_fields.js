'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('check_result', 'source', {
            allowNull: true,
            type: Sequelize.STRING,
        })
        await queryInterface.addColumn('check_result', 'ip', {
            allowNull: true,
            type: Sequelize.STRING,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('check_result', 'source')
        await queryInterface.removeColumn('check_result', 'ip')
    },
}
