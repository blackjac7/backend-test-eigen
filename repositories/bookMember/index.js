const { BookMember } = require("../../models");

exports.createBookMember = async (data) => {
    return BookMember.create(data);
};

exports.getBookMember = async (memberId, bookId) => {
    return BookMember.findOne({
        where: {
            memberId,
            bookId,
        },
    });
};

exports.getAllBookMembers = async () => {
    return BookMember.findAll();
};

exports.updateBookMember = async (memberId, bookId, data) => {
    return BookMember.update(data, {
        where: {
            memberId,
            bookId,
        },
        returning: true,
    });
};

exports.deleteBookMember = async (memberId, bookId) => {
    return BookMember.destroy({
        where: {
            memberId,
            bookId,
        },
    });
};

exports.countByMemberId = async (memberId) => {
    return BookMember.count({
        where: {
            memberId,
        },
    });
};
