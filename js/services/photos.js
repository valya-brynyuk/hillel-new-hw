const getPhotosByAlbumId = (config) => async (id) => {
  const resp = await fetch(`${config.BASE_URL}/photos?albumId=${id}`);
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }

  const json = await resp.json();
  if (!Array.isArray(json)) {
    throw new Error('Response must be a valid array');
  }


  return json.map(item => new Photo(item));
}
