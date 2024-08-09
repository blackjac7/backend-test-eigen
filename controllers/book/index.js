const bookUsecase = require("../../usecases");

/**
 * Handles borrowing a book.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.borrowBook = async (req, res) => {
    try {
        const { memberCode, bookCode } = req.body;
        const result = await bookUsecase.borrowBook(memberCode, bookCode);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Handles returning a book.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.returnBook = async (req, res) => {
    try {
        const { memberCode, bookCode, returnDate } = req.body;
        const result = await bookUsecase.returnBook(
            memberCode,
            bookCode,
            new Date(returnDate)
        );
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Retrieves all books.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.checkBooks = async (req, res) => {
    try {
        const books = await bookUsecase.checkBooks();
        if (books.length === 0) {
            res.status(200).json({ data: [], message: "No books available" });
        } else {
            res.status(200).json({ data: books });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
