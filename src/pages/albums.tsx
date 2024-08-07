import Nav from '../components/Nav'
import Article from '../components/Article'
import TrackList from '../components/TrackList';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { PARAMS } from '../utils/paths'
import { getAlbumData } from '../api/spotify';
import { getSpecificImage } from '../utils/utils';
import '../App.style.scss';

interface IAlbumData {
  name: string
  tracks: string[]
  images: any[]
}

const Albums = () => {
  const location = useLocation();
  const [albumData, setAlbumData] = useState<IAlbumData | null>(null)

  useEffect(() => {
    const fetchAlbumData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const albumId = queryParams.get(PARAMS.ALBUM);
      if (albumId) {
        const albumData = await getAlbumData(albumId)
        setAlbumData(albumData)
      }
    }

    fetchAlbumData()
  }, [location.search])
  
  return (
    <div className='Page'>
      <div className='Page__container'>
        <Nav allowAddFav={false}/>
        <Article 
          title={albumData?.name || 'Loading'}
          image={getSpecificImage(albumData?.images || [], 300)}
        />

        <h2>Tracks</h2>
        <TrackList tracks={albumData?.tracks || []} />
      </div>
    </div>
  );
};
  
export default Albums;