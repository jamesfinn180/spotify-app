import './GenreList.style.scss';

const GenreList = ({ genres }: {genres: string[]}) => {
  return (
		<div className='GenreList'>
			{genres.map((genre, i) => {
				return <span key={i} className='GenreItem'>{genre}</span>
			})}
		</div>
	)
}

export default GenreList;