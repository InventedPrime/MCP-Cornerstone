import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { getSavedPosts, removeSavedPost } from "../../utils/firebase";
import { type Artwork } from "../../utils/MuseumArtworks";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";
import imageNotFound from "../../assets/Image_Not_Found.png";
import SearchBar from "../../components/SearchBar";

export const DashboardSavedArtworks = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [savedArtworks, setSavedArtworks] = useState<Artwork[]>([]);
  const cachedArtworks = useRef<Artwork[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsub = getSavedPosts(user!.uid, (savedArtworks: Artwork[]) => {
      cachedArtworks.current = savedArtworks;
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

  const handleOnRemoveLike = async (artworkId: number) => {
    setIsLoading(true);
    setSavedArtworks((prev) =>
      prev!.filter((artwork) => artwork.id !== artworkId),
    );
    removeSavedPost(user!.uid, artworkId.toString());
  };

  const handleSearch = (query: string) => {
    if (query == "") {
      setSavedArtworks(cachedArtworks.current);
    } else {
      const filteredArtworks = cachedArtworks.current.filter((artwork) =>
        artwork.title.toLowerCase().includes(query),
      );
      setSavedArtworks(filteredArtworks);
    }
  };

  return !user ? (
    <Navigate to="/SignUp" />
  ) : (
    <div className="page-wrapper">
      <Loader isLoading={isLoading} />
      <Header />
      <div className="dashboard-container">
        <Panel />
        <div className="dashboard-saved-artworks-container">
          <SearchBar onChange={handleSearch} />
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
                      artwork.imageUrl == "" ? imageNotFound : artwork.imageUrl
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
      </div>
      <FooterComponent />
    </div>
  );
};
