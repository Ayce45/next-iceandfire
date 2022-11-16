export function getCharacters(id: any) {
    return fetch(`https://anapioficeandfire.com/api/characters/${id}`).then(r => r.json())
}

export function getBooks() {
    return fetch(`https://anapioficeandfire.com/api/books`).then(r => r.json())
}