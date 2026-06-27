import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { getSavedPosts, removeSavedPost } from "../../utils/firebase";
import { getMuseumArtworksByIds } from "../../utils/MuseumArtworks";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";
import { hiddenInformation } from "../../utils/sleep";
import { PictureBox } from "../../components/PictureBox";
import SearchBar from "../../components/SearchBar";

export const DashboardSavedPictures = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [savedArtworks, setSavedArtworks] = useState<any[] | null>(null);
  const cachedArtworks = useRef<any[] | []>([]);

  useEffect(() => {
    if (!user) return;

    const unsub = getSavedPosts(user!.uid, async (ids: string[]) => {
      setIsLoading(true);

      if (ids.length > 0) {
        const data = await getMuseumArtworksByIds(ids);
        cachedArtworks.current = data;
        setSavedArtworks(data);
      } else {
        setSavedArtworks([]);
      }
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
    await hiddenInformation();
    setSavedArtworks((prev) =>
      prev!.filter((artwork) => artwork.id !== artworkId),
    );
    removeSavedPost(user!.uid, artworkId);
  };

  const handleSearchChange = (query: string) => {
    console.log(query, query === "");
    if (query === "") {
      setSavedArtworks(cachedArtworks.current);
    } else {
      const filtered = cachedArtworks.current.filter((artwork) =>
        artwork.title.toLowerCase().startsWith(query),
      );
      console.log("filtered", filtered);
      setSavedArtworks(filtered);
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
        <div className="dashboard-pictures-container">
          <SearchBar onChange={handleSearchChange} />
          {savedArtworks && savedArtworks.length > 0 ? (
            <div className="liked-pictures-container">
              {savedArtworks.map((artwork) => (
                <PictureBox
                  key={artwork.id}
                  artwork={artwork}
                  handleOnRemoveLike={handleOnRemoveLike}
                />
              ))}
            </div>
          ) : (
            <div className="no-liked-pictures-container">
              <p>No Liked Pictures.</p>
            </div>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
