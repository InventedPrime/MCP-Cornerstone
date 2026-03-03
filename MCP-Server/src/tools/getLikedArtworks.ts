/*
* AI helped me write this entire file to hook up the MCP
*/


import { db } from "../firebase";
import axios from "axios";

export async function getLikedArtworks(userId: string) {
  try {
    const snapshot = await db.ref(`users/${userId}/likedPosts`).get();

    if (!snapshot.exists()) {
      return {
        content: [{ type: "text" as const, text: "No liked artworks found" }],
      };
    }
    const likedIds = Object.keys(snapshot.val());

    const idsParam = likedIds.join(",");

    const { data: { data } } = await axios.get(
      `https://api.artic.edu/api/v1/artworks?ids=${idsParam}&fields=id,title,artist_display,date_display,medium_display,image_id`,
    );

    const artworks = data.map((artwork: any) => {
      if (artwork.image_id) {
        artwork.image_url = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
      }
      return artwork;
    });

    return {
      content: [
        { type: "text" as const, text: JSON.stringify(artworks, null, 2) },
      ],
    };
  } catch (err) {
    const message = err;
    return {
      content: [
        {
          type: "text" as const,
          text: `Error fetching liked artworks: ${message}`,
        },
      ],
      isError: true,
    };
  }
}
