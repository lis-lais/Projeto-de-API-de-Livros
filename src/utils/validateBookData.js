function validateBookData({ title, author, year, genre }) {
    const missingFields = [];

    if (!title || title.trim() === '') missingFields.push('title');
    if (!author || author.trim() === '') missingFields.push('author');
    if (!year && year !== 0) missingFields.push('year'); // cuidado com 0 como falso
    if (!genre || genre.trim() === '') missingFields.push('genre');

    return missingFields;
}

module.exports = validateBookData;