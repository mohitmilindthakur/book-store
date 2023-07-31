export const fetchBooks = (query, pageNum=1) => {
  return fetch(`https://openlibrary.org/search.json?q=${query}&limit=12&page=${pageNum}`)
    .then(async (response) => {
      let data = await response.json()
      return Promise.resolve({ data, response })
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    })
}

export const fetchBook = (id) => {
  return fetch(`https://openlibrary.org/works/${id}.json`)
  // return fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${id}&jscmd=data&format=json`)
  .then(response => response.json())
  .then(data => data)
  .catch(error => {
    throw new Error(error);
  })
}
