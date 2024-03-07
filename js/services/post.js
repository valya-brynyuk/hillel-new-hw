const getPostById = (config) => (id) => {
  return fetch(`${config.BASE_URL}/posts/${id}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      return resp.json();
    }).then((json) => new Post(json));
}