"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BookMember extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    BookMember.init(
        {
            memberId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Members",
                    key: "id",
                },
            },
            bookId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Books",
                    key: "id",
                },
            },
            borrowedDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "BookMember",
            tableName: "BookMembers",
        }
    );
    return BookMember;
};
