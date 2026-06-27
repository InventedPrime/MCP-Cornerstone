import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getSavedPosts, removeSavedPost } from "../../utils/firebase";
import { type Artwork } from "../../utils/MuseumArtworks";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";

export const DashboardSavedArtworks = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [savedArtworks, setSavedArtworks] = useState<any[] | null>(null);

  useEffect(() => {
    if (!user) return;

    const unsub = getSavedPosts(user!.uid, (savedArtworks: Artwork[]) => {
      setSavedArtworks(savedArtworks);
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (savedArtworks !== null) {
      setIsLoading(false);
    }
  }, [savedArtworks]);

  const handleOnRemoveLike = async (artworkId: string) => {
    setIsLoading(true);
    setSavedArtworks((prev) =>
      prev!.filter((artwork) => artwork.id !== artworkId),
    );
    removeSavedPost(user!.uid, artworkId);
  };

  return !user ? (
    <Navigate to="/SignUp" />
  ) : (
    <div className="page-wrapper">
      <Loader isLoading={isLoading} />
      <Header />
      <div className="dashboard-container">
        <Panel />
        {savedArtworks && savedArtworks.length > 0 ? (
          <div className="liked-pictures-container">
            {savedArtworks.map((artwork) => (
              <div key={artwork.id} className="picture-div">
                <p
                  style={{
                    fontSize: artwork.title.length > 40 ? "18px" : "26px",
                  }}
                >
                  {artwork.title}
                </p>
                <img
                  src={
                    artwork.imageUrl == ""
                      ? "../src/assets/Image_Not_found.png"
                      : artwork.imageUrl
                  }
                  alt={artwork.title}
                />
                <button onClick={() => handleOnRemoveLike(artwork.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-liked-pictures-container">
            <p>No Saved Pictures.</p>
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
};
