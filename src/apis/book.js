export const fetchBooks = (query) => {
  return fetch(`https://openlibrary.org/search.json?q=${query}&limit=10`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    })
}
