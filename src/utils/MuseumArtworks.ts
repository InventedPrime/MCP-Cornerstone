const domain = "https://collectionapi.metmuseum.org/public/collection/v1";

export const MuseumArtworks = fetch(
  `${domain}/search?hasImages=true&q=painting`,
)
  .then((res) => res.json())
  .then(({ objectIDs }) => {
    const shuffled = [...objectIDs].sort(() => Math.random() - 0.5);
    const randomIds = shuffled.slice(0, 100);
    return Promise.all(
      randomIds.map((id: number) =>
        fetch(`${domain}/objects/${id}`)
          .then((res) => res.json())
          .then((artwork) =>
            artwork.primaryImageSmall && artwork.title
              ? {
                  id: artwork.objectID,
                  title: artwork.title,
                  artist_display: artwork.artistDisplayName,
                  imageUrl: artwork.primaryImageSmall,
                }
              : null,
          )
          .catch(() => null),
      ),
    ).then((results) => results.filter(Boolean));
  });

export const getMuseumArtworksByIds = (ids: string[]) => {
  return Promise.all(
    ids.map((id) =>
      fetch(`${domain}/objects/${id}`)
        .then((res) => res.json())
        .then((artwork) => ({
          id: artwork.objectID,
          title: artwork.title,
          artist_display: artwork.artistDisplayName,
          imageUrl: artwork.primaryImageSmall || null,
        })),
    ),
  );
};
