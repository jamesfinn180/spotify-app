import Nav from '../components/Nav'
import Article from '../components/Article'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { PARAMS } from '../utils/paths'
import { getArtistData } from '../api/spotify';
import { getSpecificImage } from '../utils/utils';
import '../App.style.scss';

interface IArtistData {
  name: string
  images: any[]
	albums: { name: string, images: any[] }[]
}

const Artists = () => {
	const location = useLocation();
  const [artistData, setArtistData] = useState<IArtistData | null>(null)
	const queryParams = new URLSearchParams(location.search);
	const artistId = queryParams.get(PARAMS.ARTIST);

	useEffect(() => {
    const fetchAlbumData = async () => {
      if (artistId) {
        const artistData = await getArtistData(artistId)
        setArtistData(artistData)
      }
    }

    fetchAlbumData()
  }, [artistId])

  return (
    <div className='Page'>
      <div className='Page__container'>
        <Nav allowAddFav={true} id={artistId || '0'} name={artistData?.name || ''} />
				<Article 
					title={artistData?.name || 'Loading'}
					image={getSpecificImage(artistData?.images || [], 300)} />

				<h2>Albums</h2>
				<div className='GridTwo'>
					{
						!!artistData && artistData?.albums.map((albData) => {
							return <Article 
								key={albData.name} 
								isSmall 
								title={albData.name} 
								image={getSpecificImage(albData.images, 300)} 
							/>
						})
					}
				</div>
      </div>
    </div>
	)
};
  
export default Artists;