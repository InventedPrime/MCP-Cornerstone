import { useLocation, useNavigate } from "react-router-dom";

export const Panel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="panel-container">
      <button
        className={
          "sidebars " +
          (location.pathname === "/Dashboard/ArtMuseum"
            ? "locationpresent"
            : "")
        }
        onClick={() => navigate("/Dashboard/ArtMuseum")}
      >
        Art Museum
      </button>
      <button
        className={
          "sidebars " +
          (location.pathname === "/Dashboard/SavedPictures"
            ? "locationpresent"
            : "")
        }
        onClick={() => navigate("/Dashboard/SavedPictures")}
      >
        Saved Pictures
      </button>
      {/* <button
        className={
          "sidebars " +
          (location.pathname === "/Dashboard/PostedOnLinkedIn"
            ? "locationpresent"
            : "")
        }
        onClick={() => navigate("/Dashboard/PostedOnLinkedIn")}
      >
        Post On LinkedIn
      </button>
      <button
        className={
          "sidebars " +
          (location.pathname === "/Dashboard/Credentials"
            ? "locationpresent"
            : "")
        }
        onClick={() => navigate("/Dashboard/Credentials")}
      >
        Credentials
      </button> */}
    </div>
  );
};
