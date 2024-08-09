"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("BookMembers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            memberId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Members",
                    key: "id",
                },
            },
            bookId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Books",
                    key: "id",
                },
            },
            borrowedDate: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("BookMembers");
    },
};
