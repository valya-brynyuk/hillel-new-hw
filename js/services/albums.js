const getAlbums = (config) => async () => {
  const resp = await fetch(`${config.BASE_URL}/albums`);
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }

  const json = await resp.json();
  if (!Array.isArray(json)) {
    throw new Error('Response must be a valid array');
  }


  return json.map(item => new Album(item));
}

const generateAlbumLink = (config) => (album) => {
  if (!(album instanceof Album)) {
    throw new Error('album is not valid Album object');
  }

  return `${config.ALBUM_URL}?albumId=${album.id}`;
}

const getAlbumIdFromUrl = (urlStr) => {
  const url = new URL(urlStr);
  const albumId = url.searchParams.get('albumId');

  if (!Number.isFinite(+albumId) || +albumId < 1) {
    throw new Error('Can not parse album id from url');
  }

  return +albumId;
}

const getAlbumById = (config) => async (id) => {
  const resp = await fetch(`${config.BASE_URL}/albums?id=${id}`);
  if (!resp.ok) {
    throw new Error(resp.statusText)
  }

  const json = await resp.json();
  if (!Array.isArray(json)) {
    throw new Error('Response must be a valid array');
  } else if (!json[0]) {
    throw new Error(`Not found album ${id}`);
  }


  return new Album(json[0]);
}