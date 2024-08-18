import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchSpotify } from '../../api/spotify';
import { ROUTES, PARAMS } from '../../utils/paths';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './Header.style.scss';

interface ISpotifyData {
  id: string;
  name: string;
}
interface ISearchData {
  artists: {
    items: ISpotifyData[];
  };
  albums: {
    items: ISpotifyData[]
  }
}
type OptionType = 'album' | 'artist'
interface IOption {
  value: string;
  label: string;
  type: OptionType
}
interface IGroupOption {
  label: string;
  options: IOption[];
}

const DEBOUNCE_TIME_MS = 500

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState<IGroupOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;
  const isHome = page === ROUTES.HOME;

  useEffect(() => {
    const fetchSearchData = async () => {
      if (searchTerm.length > 2) {
        try {
          const data = await searchSpotify(searchTerm);
          const options = generateOptions(data);
          setSearchData(options);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    const debounce = setTimeout(() => {
      fetchSearchData();
    }, DEBOUNCE_TIME_MS);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const generateOptions = (data: ISearchData): IGroupOption[] => {
    const { artists, albums } = data;
    const options = [];

    if (artists.items.length > 0) {
      options.push({
        label: 'Artists',
        options: artists.items.map((artist: ISpotifyData) => ({
          value: artist.id,
          label: artist.name,
          type: 'artist' as OptionType,
        })),
      });
    }

    if (albums.items.length > 0) {
      options.push({
        label: 'Albums',
        options: albums.items.map((album: ISpotifyData) => ({
          value: album.id,
          label: album.name,
          type: 'album' as OptionType,
        })),
      });
    }

    return options;
  };

  const customNoOptionsMessage = ({ inputValue }: { inputValue: string }) => {
    return !inputValue ? "Start typing to search..." : "No results found";
  };

  const handleChange = (option: IOption | null) => {
    setSelectedOption(option);
    if (option?.type === 'album') {
      const newParam = new URLSearchParams();
      newParam.set(PARAMS.ALBUM, option.value);
      navigate(`${ROUTES.ALBUMS}?${newParam.toString()}`);
    } 
    else if (option?.type === 'artist') {
      const newParam = new URLSearchParams();
      newParam.set(PARAMS.ARTIST, option.value);
      navigate(`${ROUTES.ARTISTS}?${newParam.toString()}`);
    }
  };

  const handleInputChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <header className={isHome ? 'Header__container Header__container--home' : 'Header__container'}>
      <div className='Header__content'>
        {isHome && <h1 className='Heading'>Music Search</h1>}

        <Select
          className='SearchInput'
          value={selectedOption}
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={searchData}
          placeholder="Search by artist or album"
          isSearchable
          classNamePrefix="SearchInput"
          components={{ DropdownIndicator: () => null }}
          isClearable
          noOptionsMessage={customNoOptionsMessage}
        />
      </div>
    </header>
  );
};

export default Header;