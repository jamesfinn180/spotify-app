import { addFavourite, favouriteExists, removeFavourite, IFavourite } from '../../storage/localStorage';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import './FavouritesButton.style.scss';

const FavouritesButton = ({ id, name }: IFavourite ) => {
	const [isFavourite, setIsFavourite] = useState(false)

	useEffect(() => {
		setIsFavourite(favouriteExists(id))
	}, [id])

	const buttonClicked = () => {
		if (isFavourite) {
			removeFavourite(id)
		} else {
			addFavourite({ name, id })
		}
		setIsFavourite(prevState => !prevState);
	}
	
  return (
		isFavourite ? (
			<button className='FavouriteButton FavouriteButton--active' onClick={() => buttonClicked()}><FontAwesomeIcon className='Icon' icon={faHeartSolid} /> Remove as favourite</button>
		)	: (
			<button className='FavouriteButton' onClick={() => buttonClicked()}><FontAwesomeIcon className='Icon' icon={faHeartRegular} />Add as favourite</button>
		)
	)
}

export default FavouritesButton;