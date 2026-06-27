import { Header } from "../../components/Header";
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from "react-router-dom";
import { Panel } from "../../components/Panel";
import { useAuth } from "../../context/AuthContext";
import { useEffect, use, useState } from "react";
import { MuseumArtworks } from "../../utils/MuseumArtworks";
import { getSavedPosts, savePost } from "../../utils/firebase";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../context/LoaderContext";
import { triggerLoading } from "../../utils/sleep";

export const DashboardArtMuseum = () => {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();
  const [savedPictures, setSavedPictures] = useState<string[]>([]);
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const Artworks = use(MuseumArtworks);
  const currentArtwork = Artworks[currentArtworkIndex];

  const handleOnLike = async () => {
    await triggerLoading(setIsLoading);
    if (currentArtwork && !savedPictures.includes(currentArtwork.id)) {
      setSavedPictures((prev) => [...prev, currentArtwork.id.toString()]);
      savePost(user!.uid, currentArtwork.id.toString());
    }
  };

  useEffect(() => {
    if (!user?.uid) return;

    const unsub = getSavedPosts(user.uid, async (savedPosts: string[]) => {
      setSavedPictures(savedPosts);
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
              {currentArtwork ? (
                <>
                  <h1>{currentArtwork.title}</h1>
                  <div className="picture-container">
                    <img src={`${currentArtwork.imageUrl}`} alt="Art Museum" />
                  </div>
                  <div className="navigate-container">
                    <button
                      onClick={async () => {
                        await triggerLoading(setIsLoading);
                        setCurrentArtworkIndex((prev) =>
                          currentArtworkIndex > 0 ? prev - 1 : 0,
                        );
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
                          ? "var(--light-blue)"
                          : "var(--blue)",
                        cursor: savedPictures.includes(
                          currentArtwork.id.toString(),
                        )
                          ? "auto"
                          : "pointer",
                      }}
                      onClick={handleOnLike}
                    >
                      Save
                    </button>
                    <button
                      onClick={async () => {
                        await triggerLoading(setIsLoading);
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
              ) : (
                <>
                  <div className="no-artworks-container">
                    <p> No Artworks Available.</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
