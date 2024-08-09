const { Book } = require("../../models");

exports.getAllBooks = async () => {
    return Book.findAll({
        order: [["id", "ASC"]],
    });
};

exports.getBookByCode = async (code) => {
    return Book.findOne({ where: { code } });
};

exports.updateBookStock = async (code, stock) => {
    return Book.update({ stock }, { where: { code } });
};
