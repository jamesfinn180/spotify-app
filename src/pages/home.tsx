import FavouritesList from '../components/FavouritesList';

const Home: React.FC = () => {
  return (
    <div className='Page'>
      <div className='Page__container'>
        <FavouritesList />
      </div>
    </div>
  );
};
  
export default Home;