import Nav from '../components/Nav'
import Article from '../components/Article'
import Error from '../components/Error'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { PARAMS } from '../utils/paths'
import { getArtistData } from '../api/spotify';
import { getSpecificImage } from '../utils/utils';
import { IArtistData, IAlbumData } from '../types/types';
import '../App.style.scss';

const Artists: React.FC = () => {
	const location = useLocation();
  const [artistData, setArtistData] = useState<IArtistData | null>(null)
	const [artistError, setArtistError] = useState<string | null>(null)
	const queryParams = new URLSearchParams(location.search);
	const artistId = queryParams.get(PARAMS.ARTIST);

	useEffect(() => {
    const fetchAlbumData = async () => {
      if (artistId) {
        const artistData = await getArtistData(artistId)
				if (artistData.error) {
					setArtistError('Error occured trying to retrieve Artist Data')
					return
				}
        setArtistData(artistData)
      }
    }

    fetchAlbumData()
  }, [artistId])

	if (artistError) return (
		<Error errorMessage={artistError} />
	)

  return (
    <div className='Page'>
      <div className='Page__container'>
        <Nav allowAddFav={true} id={artistId || '0'} name={artistData?.name || ''} />
				<Article
					data={artistData}
					image={getSpecificImage(artistData?.images || [], 300)} />

				<h2>Albums</h2>
				<div className='GridTwo'>
					{
						!!artistData && artistData?.albums.map((albData: IAlbumData, i: number) => {
							return <Article 
								key={`${albData.name}-${i}`} 
								isSmall
								data={albData}
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