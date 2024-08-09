const { Member } = require("../../models");

exports.getAllMembers = async () => {
    return Member.findAll({
        order: [["id", "ASC"]],
    });
};

exports.getMemberByCode = async (code) => {
    return Member.findOne({ where: { code } });
};

exports.updateMemberPenalty = async (code, penaltyEndDate) => {
    return Member.update({ penaltyEndDate }, { where: { code } });
};
