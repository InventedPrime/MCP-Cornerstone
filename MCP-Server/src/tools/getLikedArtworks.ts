import { db } from "../firebase";
import axios from "axios";

export async function getLikedArtworks(userId: string) {
  try {
    console.log(`Fetching liked posts for user: ${userId}`);
    const snapshot = await db.ref(`users/${userId}/likedPosts`).get();
    console.log(`Snapshot exists: ${snapshot.exists()}`);
    console.log(`Snapshot value: ${JSON.stringify(snapshot.val())}`);

    if (!snapshot.exists()) {
      return {
        content: [{ type: "text" as const, text: "No liked artworks found" }],
      };
    }

    const likedIds = Object.keys(snapshot.val());

    // Use bulk query instead of individual requests
    const idsParam = likedIds.join(",");
    const response = await axios.get(
      `https://api.artic.edu/api/v1/artworks?ids=${idsParam}&fields=id,title,artist_display,date_display,medium_display,image_id`,
    );

    const artworks = response.data.data.map((artwork: any) => {
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
    const message = err instanceof Error ? err.message : "Unknown error";
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
