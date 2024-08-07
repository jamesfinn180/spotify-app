import { Link } from "react-router-dom";
import { ROUTES } from '../../utils/paths'
import FavouritesButton from "../FavouritesButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './Nav.style.scss';

interface INav {
	allowAddFav: boolean
	id?: string
	name?: string
}
const Nav = ({ allowAddFav = false, id='0', name='' }: INav) => {
  return (
		<div className='Nav'>
			<Link className='Nav__button' to={ROUTES.HOME}>
				<FontAwesomeIcon className='Icon' icon={faArrowLeft} /> Back
			</Link>
			{ allowAddFav && <FavouritesButton id={id} name={name}/> }
		</div>
	)
}

export default Nav;