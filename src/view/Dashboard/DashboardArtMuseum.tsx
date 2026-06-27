import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { useEffect, use, useState } from "react";
import {
  MuseumArtworks,
  getMuseumArtworksByIds,
} from "../../utils/MuseumArtworks";
import { getSavedPosts, savePost } from "../../utils/firebase";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";

export const DashboardArtMuseum = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [savedPictures, setSavedPictures] = useState<string[]>([]);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState<number>(0);
  const [currentArtwork, setCurrentArtwork] = useState<any>(null);
  const artworkIds = use<number[]>(MuseumArtworks);

  useEffect(() => {
    if (!user?.uid) return;

    const unsub = getSavedPosts(user.uid, async (savedPosts: string[]) => {
      setSavedPictures(savedPosts);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!artworkIds.length) return;
    setIsLoading(true);
    getMuseumArtworksByIds([artworkIds[currentArtworkIndex]]).then(
      ([artwork]) => {
        setCurrentArtwork(artwork);
        setIsLoading(false);
      },
    );
  }, [currentArtworkIndex]);

  const handleOnLike = async () => {
    if (currentArtwork && !savedPictures.includes(currentArtwork.id)) {
      setSavedPictures((prev) => [...prev, currentArtwork.id.toString()]);
      savePost(user!.uid, currentArtwork.id.toString());
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
        <div className="Artmuseum-container">
          {currentArtwork ? (
            <>
              <h1>{currentArtwork.title}</h1>
              <div className="picture-container">
                <img
                  src={
                    currentArtwork.imageUrl == ""
                      ? "../src/assets/Image_Not_Found.png"
                      : currentArtwork.imageUrl
                  }
                  alt="Art Museum"
                />
              </div>
              <div className="navigate-container">
                <button
                  onClick={async () => {
                    setCurrentArtworkIndex((prev) => (prev > 0 ? prev - 1 : 0));
                  }}
                >
                  Left
                </button>
                <button
                  disabled={savedPictures.includes(
                    currentArtwork.id.toString(),
                  )}
                  style={{
                    backgroundColor: savedPictures.includes(
                      currentArtwork.id.toString(),
                    )
                      ? "var(--light-green)"
                      : "var(--blue)",
                    cursor: savedPictures.includes(currentArtwork.id.toString())
                      ? "auto"
                      : "pointer",
                  }}
                  onClick={handleOnLike}
                >
                  {savedPictures.includes(currentArtwork.id.toString())
                    ? "Saved"
                    : "Save"}
                </button>
                <button
                  onClick={() => {
                    setCurrentArtworkIndex((prev) =>
                      prev < artworkIds.length - 1 ? prev + 1 : prev,
                    );
                  }}
                >
                  Right
                </button>
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
