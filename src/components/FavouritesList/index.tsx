import { Link } from "react-router-dom";
import { ROUTES, PARAMS } from '../../utils/paths'
import { removeFavourite, getFavourites, IFavourite } from '../../storage/localStorage';
import { useEffect, useState } from "react";
import './Favourites.style.scss';

const FavouritesList = () => {
	const [favourites, setFavourites] = useState<IFavourite[]>([])

	useEffect(() => {
		const favs = getFavourites()
		setFavourites(favs || [])
	}, [])

	const removeClicked = (id: string) => {
		removeFavourite(id)
		const favs = getFavourites()
		setFavourites(favs || [])
	}
	
  return (
		<section className='Favourites'>
			<h1 className='Favourites__title'>My Favourite Artists</h1>
			<ul className='Favourites__list'>
				{favourites.length > 0 ? 
					favourites.map((fav) => {
						return (
							<li key={fav.id} className='Favourites__list__item'>
								<Link className='Link' to={`${ROUTES.ARTISTS}?${PARAMS.ARTIST}=${fav.id}`} >{fav.name}</Link>
								<button className='RemoveButton' onClick={() => removeClicked(fav.id)}>Remove</button>
							</li>
						)
					}) 
					:
					<p className='Favourites__text'>No Favourites added yet.</p>
				}
			</ul>
		</section>
	)
}

export default FavouritesList;