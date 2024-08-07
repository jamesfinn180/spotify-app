import './TrackList.style.scss';

interface ITracks {
	tracks: string[]
}

const TrackList = ({ tracks }: ITracks) => {
  return (
		<ul className='List'>
			{tracks.map((track, i) => {
				return (
					<li className='List__item' key={track}>
						<span>Track #{i + 1} {track}</span>
					</li>
				)
			})}
		</ul>
	)
}

export default TrackList;