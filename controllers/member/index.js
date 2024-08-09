const memberUsecase = require("../../usecases");

/**
 * Retrieves all members.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.checkMembers = async (req, res) => {
    try {
        const members = await memberUsecase.checkMembers();
        res.status(200).json({ data: members });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
