// AI helped me build this file because of the slight complexities in retrieving and building the string

const getRandomPage = () => Math.floor(Math.random() * 100) + 1; // Random page 1-100

export const MuseumArtworks = fetch(
  `https://api.artic.edu/api/v1/artworks?limit=100&page=${getRandomPage()}&fields=id,title,image_id,artist_display`,
)
  .then((res) => res.json())
  .then(({ data }) =>
    data.filter(
      (artwork: any) => artwork.title !== "Untitled" && artwork.image_id,
    ),
  );

export const getMuseumArtworksByIds = (ids: string[]) => {
  return fetch(
    `https://api.artic.edu/api/v1/artworks?ids=${ids.join(",")}&fields=id,image_id,title,artist_display`,
  )
    .then((res) => res.json())
    .then(({ data }) =>
      data.map((artwork: any) => ({
        ...artwork,
        imageUrl:
          artwork.image_id ?
            `https://www.artic.edu/iiif/2/${artwork.image_id}/full/!843,843/0/default.jpg`
          : null,
      })),
    );
};
