export const domain =
  "https://collectionapi.metmuseum.org/public/collection/v1";

export type ArtworkResponse = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
  department: string;
};
export type Artwork = {
  id: number;
  title: string;
  artist_display: string;
  imageUrl: string;
  department: string;
};

export const MuseumArtworks = fetch(
  `${domain}/search?hasImages=true&isOnView=true&q=art`,
)
  .then((res) => res.json())
  .then(({ objectIDs }) =>
    [...objectIDs].sort(() => Math.random() - 0.5).slice(0, 100),
  );

export const getMuseumArtworkById = (id: number) =>
  fetch(`${domain}/objects/${id}`)
    .then((res) => res.json())
    .then(
      (artwork: ArtworkResponse): Artwork => ({
        id: artwork.objectID,
        title: artwork.title,
        artist_display: artwork.artistDisplayName,
        imageUrl: artwork.primaryImageSmall,
        department: artwork.department,
      }),
    )
    .catch((error) => {
      console.error(`Error fetching artwork with ID ${id}:`, error);
      return null; // Return null or handle the error as needed
    });
