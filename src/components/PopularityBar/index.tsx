import { useEffect, useState } from 'react';
import { formatNumberCommas } from '../../utils/utils';
import './PopularityBar.style.scss';

const PopularityBar = ({ popularity, followers }: { popularity: number, followers: number }) => {
	const [popPercent, setPopPercent] = useState<number>(0)
	useEffect(() => {
		// Simulates the CSS transition for growing popularity
		setTimeout(() => {
			setPopPercent(popularity)
		}, 100)
	}, [popularity])
	
  return (
		<div className='PopularityBar PopularityBar__exterior'>
			<div className='PopularityBar PopularityBar__interior' style={{ width: `${popPercent}%` }}>
				<span className={'Followers'}>{formatNumberCommas(followers)} fans</span>
			</div>
		</div>
	)
}

export default PopularityBar;