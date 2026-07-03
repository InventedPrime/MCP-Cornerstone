import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { useEffect, use, useState } from "react";
import {
  MuseumArtworks,
  getMuseumArtworkById,
  type Artwork,
} from "../../utils/MuseumArtworks";
import { getSavedPosts, savePost } from "../../utils/firebase";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";
import imageNotFound from "../../assets/Image_Not_Found.png";

export const DashboardArtMuseum = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [savedPosts, setSavedPosts] = useState<Artwork[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState<number>(0);
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
  const artworkIds = use<number[]>(MuseumArtworks);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = getSavedPosts(user.uid, (savedPosts: Artwork[]) =>
      setSavedPosts(savedPosts),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!artworkIds.length) return;
    setIsLoading(true);
    getMuseumArtworkById(artworkIds[currentArtworkIndex]).then((artwork) => {
      setIsLoading(false);
      setCurrentArtwork(artwork);
    });
  }, [currentArtworkIndex]);

  useEffect(() => {
    if (!currentArtwork) return;
    setIsSaved(savedPosts.some((artwork) => artwork.id === currentArtwork.id));
  }, [currentArtwork]);

  const handleOnLike = async () => {
    if (
      currentArtwork &&
      !savedPosts.some((artwork) => artwork.id === currentArtwork.id)
    ) {
      setIsSaved(true);
      const data: Artwork = {
        id: currentArtwork.id,
        title: currentArtwork.title,
        artist_display: currentArtwork.artist_display,
        imageUrl: currentArtwork.imageUrl,
        department: currentArtwork.department,
      };
      setSavedPosts((prev) => [...prev, data]);
      savePost(user!.uid, data);
    }
  };

  const handleRight = () => {
    setCurrentArtworkIndex((prev) =>
      prev < artworkIds.length - 1 ? prev + 1 : prev,
    );
  };

  const handleLeft = () => {
    setCurrentArtworkIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return !user ? (
    <Navigate to="/SignUp" />
  ) : (
    <div className="page-wrapper">
      <Loader isLoading={isLoading} />
      <Header />
      <div className="dashboard-container">
        <Panel />
        <div className="Artmuseum-container">
          {currentArtwork ? (
            <>
              <h1>
                {currentArtwork?.title
                  ? currentArtwork.title
                  : "Unavailable Title"}
              </h1>
              <div className="picture-container">
                <img
                  src={
                    currentArtwork?.imageUrl
                      ? currentArtwork.imageUrl
                      : imageNotFound
                  }
                  alt="Art Museum"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = imageNotFound)
                  }
                />
              </div>
              <div className="navigate-container">
                <button onClick={handleLeft}>Left</button>
                <button
                  disabled={isSaved}
                  style={{
                    backgroundColor: isSaved
                      ? "var(--light-green)"
                      : "var(--blue)",
                    cursor: isSaved ? "auto" : "pointer",
                  }}
                  onClick={handleOnLike}
                >
                  {isSaved ? "Saved" : "Save"}
                </button>
                <button onClick={handleRight}>Right</button>
              </div>
            </>
          ) : (
            <div className="no-artworks-container">
              <p>No Artworks Available.</p>
            </div>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
