import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { use, useEffect, useState } from "react";
import { MuseumArtworks } from "../../utils/MuseumArtworks";
import { getLikedPosts, savedLikedPost } from "../../utils/firebase";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";
import { hiddenInformation } from "../../utils/sleep";

export const DashboardArtMuseum = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [likedPictures, setLikedPictures] = useState<string[]>([]);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const Artworks = use(MuseumArtworks); // this lets us read the value of a promise! very cool
  const currentArtwork = Artworks[currentArtworkIndex];

  const triggerLoading = async () => {
    setIsLoading(true);
    await hiddenInformation();
    setIsLoading(false);
  };

  const handleOnLike = async () => {
    await triggerLoading();
    if (!likedPictures.includes(currentArtwork.id)) {
      setLikedPictures((prev) => [...prev, currentArtwork.id.toString()]);
      savedLikedPost(user!.uid, currentArtwork.id.toString());
    }
  };

  useEffect(() => {
    if (!user?.uid) return;

    const unsub = getLikedPosts(user.uid, async (likedPosts: string[]) => {
      setLikedPictures(likedPosts);
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => setIsLoading(false), [Artworks]);

  return !user ? (
    <Navigate to="/SignUp" />
  ) : (
    <div className="page-wrapper">
      <Loader isLoading={isLoading} />
      <Header />
      <div className="dashboard-container">
        <Panel />
        <div className="Artmuseum-container">
          {isLoading == true && Artworks.length < 0 ? (
            <>
              <div className="no-artworks-container">
                <p> No Artworks Available.</p>
              </div>
            </>
          ) : (
            <>
              <h1>{currentArtwork.title}</h1>
              <div className="picture-container">
                <img
                  src={`https://www.artic.edu/iiif/2/${currentArtwork.image_id}/full/843,/0/default.jpg`}
                  alt="Art Museum"
                />
              </div>
              <div className="navigate-container">
                <button
                  onClick={async () => {
                    await triggerLoading();
                    setCurrentArtworkIndex((prev) =>
                      currentArtworkIndex > 0 ? prev - 1 : 0,
                    );
                  }}
                >
                  Left
                </button>
                <button
                  disabled={likedPictures.includes(
                    currentArtwork.id.toString(),
                  )}
                  style={{
                    backgroundColor: likedPictures.includes(
                      currentArtwork.id.toString(),
                    )
                      ? "var(--light-blue)"
                      : "var(--blue)",
                    cursor: likedPictures.includes(currentArtwork.id.toString())
                      ? "auto"
                      : "pointer",
                  }}
                  onClick={handleOnLike}
                >
                  Like
                </button>
                <button
                  onClick={async () => {
                    await triggerLoading();
                    setCurrentArtworkIndex((prev) =>
                      currentArtworkIndex < Artworks.length - 1
                        ? prev + 1
                        : currentArtworkIndex,
                    );
                  }}
                >
                  Right
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
