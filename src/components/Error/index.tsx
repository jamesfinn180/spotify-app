import { Link } from "react-router-dom";
import { ROUTES } from '../../utils/paths'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../App.style.scss';

const Error = ({errorMessage}: {errorMessage: string}) => {

  return (
		<div className='Page'>
      <div className='Page__container'>
				<h3>{errorMessage}</h3>
				<Link className='Nav__button' to={ROUTES.HOME}>
					<FontAwesomeIcon className='Icon' icon={faArrowLeft} /> Home
				</Link>
			</div>
		</div>
	)
}

export default Error;