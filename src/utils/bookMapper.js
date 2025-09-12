function formatBook(book) {
    return {
        id: book._id.toString(),
        title: book.title,
        author: book.author,
        year: book.year,
        genre: book.genre,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt
    };
}

function formatBooks(books) {
    return books.map(formatBook);
}

module.exports = { formatBook, formatBooks };