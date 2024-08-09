const express = require("express");
const bookController = require("../controllers/book");
const memberController = require("../controllers/member");

const router = express.Router();

/**
 * @openapi
 * /api/v1/books/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a member to borrow a book if they meet the borrowing criteria.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: M001
 *               bookCode:
 *                 type: string
 *                 example: JK-45
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Error message if borrowing fails
 */
router.post("/books/borrow", bookController.borrowBook);

/**
 * @openapi
 * /api/v1/books/return:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows a member to return a book and handles penalties if applicable.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: M001
 *               bookCode:
 *                 type: string
 *                 example: JK-45
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-08-28
 *     responses:
 *       200:
 *         description: Book returned successfully with or without penalty
 *       400:
 *         description: Error message if return fails
 */
router.post("/books/return", bookController.returnBook);

/**
 * @openapi
 * /api/v1/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieves all books with their available stock.
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   availableStock:
 *                     type: integer
 */
router.get("/books", bookController.checkBooks);

/**
 * @openapi
 * /api/v1/members:
 *   get:
 *     summary: Get all members
 *     description: Retrieves all members.
 *     responses:
 *       200:
 *         description: List of all members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get("/members", memberController.checkMembers);

module.exports = router;

module.exports = router;
