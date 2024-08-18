import { IArtistData, IAlbumData, IAlbumDetailData, isArtistData, isAlbumData } from '../../types/types';
import { formatDate } from '../../utils/utils';
import GenreList from '../GenreList'
import Loader from '../Loader'
import PopularityBar from '../PopularityBar';
import './Article.style.scss';

interface IArticle {
	data: null | IArtistData | IAlbumData | IAlbumDetailData
	isSmall?: boolean
	image?: string
}

const Article = ({ isSmall = false, data, image = '' }: IArticle) => {
	if (data === null) {
		return (<Loader />)
	}
  return (
		<section className={!isSmall ? 'Article' : 'Article Article--small'}>
			<img className={!isSmall ? 'Article__image-container' : 'Article__image-container Article__image-container--small'} src={image} alt={data?.name}/>
			<div className={!isSmall ? 'Article__text-container' : 'Article__text-container Article__text-container--small'}>
				<h2 className={!isSmall ? 'Article__title' : 'Article__title Article__title--small'}>{data?.name}</h2>

				{ 
					isArtistData(data) && <div>
						<PopularityBar popularity={data.popularity} followers={data.followers.total} />
						<GenreList genres={data.genres} />
					</div>
				}

				{ 
					isAlbumData(data) && <div>
						<p><strong>Released:</strong> {formatDate(data.releaseDate)}</p>
						<p><strong>Total Tracks:</strong> {data.totalTracks}</p>
					</div>
				}

				<p>Lorem ipsum dolor sit amet consectetur. Ac felis vivamus nibh malesuada viverra pellentesque eleifend aliquam ac. Convallis amet senectus blandit congue viverra blandit sed suscipit.</p>
			</div>
		</section>
	)
}

export default Article;