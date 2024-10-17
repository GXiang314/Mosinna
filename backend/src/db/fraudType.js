'use strict'
const { Model, DataTypes } = require('sequelize')

export class FraudType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
export default (sequelize) => {
    FraudType.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sort: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'FraudType',
            tableName: 'fraud_type',
            underscored: true, // 預設為 false
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    )
    return FraudType
}
