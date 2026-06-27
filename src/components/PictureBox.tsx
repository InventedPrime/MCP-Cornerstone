import { useEffect, useState } from "react";

type PictureBoxProps = {
  artwork: any;
  handleOnRemoveLike: (id: string) => void;
};

export const PictureBox = ({
  artwork,
  handleOnRemoveLike,
}: PictureBoxProps) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return <></>;

  return (
    <div key={artwork.id} className="picture-div">
      <p>{artwork.title}</p>
      <img src={artwork.imageUrl} alt={artwork.title} />
      <button onClick={() => handleOnRemoveLike(artwork.id)}>
        Remove Like
      </button>
    </div>
  );
};
