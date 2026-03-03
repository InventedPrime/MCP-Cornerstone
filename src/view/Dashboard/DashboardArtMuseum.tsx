import { Header } from '../../components/Header';
import { FooterComponent } from "../../components/FooterComponent";
import { Navigate } from 'react-router-dom';
import { Panel } from '../../components/Panel';
import { useAuth } from '../../context/AuthContext';
import { use, useEffect, useState } from 'react';
import { MuseumArtworks } from '../../utils/MuseumArtworks';
import { getLikedPosts, savedLikedPost } from '../../utils/firebase';
export const DashboardArtMuseum = () => {
    const { user } = useAuth();
    const [likedPictures, setLikedPictures] = useState<string[]>([]);
    const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
    const Artworks = use(MuseumArtworks); // this lets us read the value of a promise! very cool
    const currentArtwork = Artworks[currentArtworkIndex];

    const handleOnLike = () => {
      if (!likedPictures.includes(currentArtwork.id)) {
        setLikedPictures(prev => [...prev, currentArtwork.id.toString()]);
        savedLikedPost(user!.uid, currentArtwork.id.toString());
      }
    }

    useEffect(() => {
      if (!user?.uid) return;
      getLikedPosts(user.uid, setLikedPictures)
    }, [])

    return !user ? <Navigate to="/SignUp" /> :
      <div className="page-wrapper">
        <Header />
        <div className='dashboard-container'>
          <Panel />
          <div className='Artmuseum-container'>
            <h1>{currentArtwork.title}</h1>
            <div className='picture-container'>
              <img src={`https://www.artic.edu/iiif/2/${currentArtwork.image_id}/full/843,/0/default.jpg`} alt="Art Museum" />
            </div>
            <div className='navigate-container'>
            <button onClick={() => setCurrentArtworkIndex(prev => currentArtworkIndex > 0 ? prev - 1 : 0 )}>Left</button>
            <button 
            disabled={likedPictures.includes(currentArtwork.id.toString())} 
            style={{backgroundColor: likedPictures.includes(currentArtwork.id.toString()) ? 'var(--light-blue)' : 'var(--blue)', 
              cursor: likedPictures.includes(currentArtwork.id.toString()) ? 'auto' : 'pointer'}} 
            onClick={handleOnLike}>Like</button>
            <button onClick={() => setCurrentArtworkIndex(prev => currentArtworkIndex < Artworks.length - 1 ? prev + 1 : currentArtworkIndex )}>Right</button>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
};
