import { Header } from '../../components/Header';
import { FooterComponent } from "../../components/FooterComponent";
import { Link } from 'react-router-dom';
import { Panel } from '../../components/Panel';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { getLikedPosts, removeLikedPost } from '../../utils/firebase';
import { getMuseumArtworksByIds } from '../../utils/MuseumArtworks';
export const DashboardArtPictures = () => {
    const { user } = useAuth();
    const [likedArtworks, setLikedArtworks] = useState<any[]>([]);


    useEffect(() => {
  
      const unsub = getLikedPosts(user!.uid, async (ids: string[]) => {
        if (ids.length > 0) {
          const data = await getMuseumArtworksByIds(ids)
          setLikedArtworks(data)
        } else {
          setLikedArtworks([])
        }
      })

      return () => unsub()
    }, [])

    const handleOnRemoveLike = (artworkId: string) => {
      setLikedArtworks(prev => prev.filter(artwork => artwork.id !== artworkId));
      removeLikedPost(user!.uid, artworkId);
    }

    return !user ? <Link to="/SignIn" /> :
      <div className="page-wrapper">
        <Header />
        <div className='dashboard-container'>
          <Panel />
          <div className='liked-pictures-container'>
            {likedArtworks.map((artwork) => (
              <div key={artwork.id} className='picture-div'>
              <p>{artwork.title}</p>
              <img src={artwork.imageUrl} alt={artwork.title} />
              <button onClick={() => handleOnRemoveLike(artwork.id)}>Remove Like</button>
              </div>
            ))}
          </div>
        </div>
        <FooterComponent />
      </div>
};
