export const fetchBooks = (query, pageNum=1) => {
  return fetch(`https://openlibrary.org/search.json?q=${query}&limit=12&page=${pageNum}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    })
}
