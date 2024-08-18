
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import '../../App.style.scss';
import './Loader.style.scss';

const Loader = () => {

  return (
		<div className='Page'>
      <div className='Page__container Loader'>
				<FontAwesomeIcon className='Loader__spinner' icon={faCircleNotch} />
			</div>
		</div>
	)
}

export default Loader;