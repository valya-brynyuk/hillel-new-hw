const getCommentsByPostId = (config) => (id) => {
  return fetch(`${config.BASE_URL}/comments?postId=${id}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      return resp.json();
    }).then((json) => {
      if (!Array.isArray(json)) {
        throw new Error('comments list must be a valid array');
      }

      return json.map(comment => new Comment(comment));
    });
}