const bookRepository = require("../repositories/book");
const memberRepository = require("../repositories/member");
const bookMemberRepository = require("../repositories/bookMember");

exports.borrowBook = async (memberCode, bookCode) => {
    const member = await memberRepository.getMemberByCode(memberCode);
    const book = await bookRepository.getBookByCode(bookCode);

    if (!member || !book) {
        throw new Error("Member or Book not found");
    }

    if (member.penaltyEndDate && new Date() < new Date(member.penaltyEndDate)) {
        throw new Error("Member is currently penalized");
    }

    // Check if the member has already borrowed 2 books
    const borrowedBooksCount = await bookMemberRepository.countByMemberId(
        member.id
    );
    if (borrowedBooksCount >= 2) {
        throw new Error("Member may not borrow more than 2 books");
    }

    if (book.stock <= 0) {
        throw new Error("Book is currently unavailable");
    }

    // Create a new record in the BookMember table
    await bookMemberRepository.createBookMember({
        memberId: member.id,
        bookId: book.id,
        borrowedDate: new Date(),
    });

    // Update stock
    await bookRepository.updateBookStock(bookCode, book.stock - 1);

    return "Book borrowed successfully";
};

exports.returnBook = async (memberCode, bookCode, returnDate) => {
    const member = await memberRepository.getMemberByCode(memberCode);
    const book = await bookRepository.getBookByCode(bookCode);

    if (!member || !book) {
        throw new Error("Member or Book not found");
    }

    // Find the record in the BookMember table
    const bookMemberEntry = await bookMemberRepository.getBookMember(
        member.id,
        book.id
    );

    if (!bookMemberEntry) {
        throw new Error("This book was not borrowed by the member");
    }

    // Remove the entry from the BookMember table
    await bookMemberRepository.deleteBookMember(member.id, book.id);

    // Update stock
    await bookRepository.updateBookStock(bookCode, book.stock + 1);

    // Calculate penalty
    const borrowedDate = new Date(bookMemberEntry.borrowedDate);
    const daysBorrowed = Math.ceil(
        (new Date(returnDate) - borrowedDate) / (1000 * 60 * 60 * 24)
    );
    if (daysBorrowed > 7) {
        const penaltyEndDate = new Date();
        penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
        await memberRepository.updateMemberPenalty(memberCode, penaltyEndDate);
        return "Book returned with penalty";
    }

    return "Book returned successfully";
};

exports.checkBooks = async () => {
    const books = await bookRepository.getAllBooks();
    return books.map((book) => ({
        code: book.code,
        title: book.title,
        author: book.author,
        availableStock: book.stock,
    }));
};

exports.checkMembers = async () => {
    const members = await memberRepository.getAllMembers();
    return members.map((member) => ({
        code: member.code,
        name: member.name,
    }));
};
