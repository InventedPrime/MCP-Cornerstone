import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getLikedPosts, removeLikedPost } from "../../utils/firebase";
import { getMuseumArtworksByIds } from "../../utils/MuseumArtworks";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";
import { hiddenInformation } from "../../utils/sleep";

export const DashboardArtPictures = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [likedArtworks, setLikedArtworks] = useState<any[] | null>(null);

  useEffect(() => {
    if (!user) return;

    const unsub = getLikedPosts(user!.uid, async (ids: string[]) => {
      setIsLoading(true);
      await hiddenInformation();
      if (ids.length > 0) {
        const data = await getMuseumArtworksByIds(ids);
        setLikedArtworks(data);
      } else {
        setLikedArtworks([]);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (likedArtworks !== null) {
      setIsLoading(false);
    }
  }, [likedArtworks]);

  const handleOnRemoveLike = async (artworkId: string) => {
    setIsLoading(true);
    await hiddenInformation();
    setLikedArtworks((prev) =>
      prev!.filter((artwork) => artwork.id !== artworkId),
    );
    removeLikedPost(user!.uid, artworkId);
  };

  return !user ? (
    <Navigate to="/SignUp" />
  ) : (
    <div className="page-wrapper">
      <Loader isLoading={isLoading} />
      <Header />
      <div className="dashboard-container">
        <Panel />
        {likedArtworks && likedArtworks.length > 0 ? (
          <div className="liked-pictures-container">
            {likedArtworks.map((artwork) => (
              <div key={artwork.id} className="picture-div">
                <p>{artwork.title}</p>
                <img src={artwork.imageUrl} alt={artwork.title} />
                <button onClick={() => handleOnRemoveLike(artwork.id)}>
                  Remove Like
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-liked-pictures-container">
            <p>No Liked Pictures.</p>
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
};
