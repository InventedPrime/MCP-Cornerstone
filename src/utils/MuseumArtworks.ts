export const domain =
  "https://collectionapi.metmuseum.org/public/collection/v1";

export const MuseumArtworks = fetch(
  `${domain}/search?hasImages=true&q=painting`,
)
  .then((res) => res.json())
  .then(({ objectIDs }) =>
    [...objectIDs].sort(() => Math.random() - 0.5).slice(0, 100),
  );

export const getMuseumArtworksByIds = (ids: number[]) => {
  return Promise.all(
    ids.map((id) =>
      fetch(`${domain}/objects/${id}`)
        .then((res) => res.json())
        .then((artwork) => ({
          id: artwork.objectID,
          title: artwork.title,
          artist_display: artwork.artistDisplayName,
          imageUrl: artwork.primaryImageSmall,
        })),
    ),
  );
};
