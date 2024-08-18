import Nav from '../components/Nav'
import Article from '../components/Article'
import TrackList from '../components/TrackList';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Error from '../components/Error'
import { PARAMS } from '../utils/paths'
import { getAlbumData } from '../api/spotify';
import { getSpecificImage } from '../utils/utils';
import { IAlbumDetailData } from '../types/types';
import '../App.style.scss';

const Albums: React.FC = () => {
  const location = useLocation();
  const [albumData, setAlbumData] = useState<IAlbumDetailData | null>(null)
  const [albumError, setAlbumError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlbumData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const albumId = queryParams.get(PARAMS.ALBUM);
      if (albumId) {
        const albumData = await getAlbumData(albumId)
				if (albumData.error) {
					setAlbumError('Error occured trying to retrieve Album Data')
					return
				}
        setAlbumData(albumData)
      }
    }

    fetchAlbumData()
  }, [location.search])

  if (albumError) return (
		<Error errorMessage={albumError} />
	)
  
  return (
    <div className='Page'>
      <div className='Page__container'>
        <Nav allowAddFav={false}/>
        <Article 
          data={albumData}
          image={getSpecificImage(albumData?.images || [], 300)}
        />

        <h2>Tracks</h2>
        <TrackList tracks={albumData?.tracks || []} />
      </div>
    </div>
  );
};
  
export default Albums;