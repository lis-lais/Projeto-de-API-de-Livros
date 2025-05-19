function validateBookData({ title, author, year, genre }) {
    const missingFields = [];

    if (!title) missingFields.push('title');
    if (!author) missingFields.push('author');
    if (!year) missingFields.push('year');
    if (!genre) missingFields.push('genre');

    if (missingFields.length > 0) {
        throw new Error(`Os seguintes campos são obrigatórios: ${missingFields.join(',')}`);
    }
}

module.exports = validateBookData;