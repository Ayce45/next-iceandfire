/**
 * Get character by id
 * @param id
 */
export function getCharacters(id: any) {
    return fetch(`https://anapioficeandfire.com/api/characters/${id}`).then(r => r.json())
}

/**
 * Get books
 */
export function getBooks() {
    return fetch(`https://anapioficeandfire.com/api/books`).then(r => r.json())
}