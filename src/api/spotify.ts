import { getItemLS, setItemLS, LS_VARS } from "../storage/localStorage";

// TODO: hide secrets better
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const BASE_URL = 'https://api.spotify.com/v1/'
const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000 // 1 hour

const getToken = async (): Promise<string> => {
	const storedToken = getItemLS(LS_VARS.SPOTIFY_TOKEN);
  const tokenExpiration = getItemLS(LS_VARS.SPOTIFY_EXPIRATION);

  if (storedToken && tokenExpiration && new Date().getTime() < parseInt(tokenExpiration)) {
    return storedToken;
  }
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();
	const token = data.access_token;

	setItemLS(LS_VARS.SPOTIFY_TOKEN, token);
  setItemLS(LS_VARS.SPOTIFY_EXPIRATION, (new Date().getTime() + TOKEN_EXPIRATION_TIME).toString());

  return token;
};


export const searchSpotify = async (query: string, type?: string): Promise<any> => {
	const searchType = !type ? ['artist', 'album'].join(',') : type
	const token = await getToken();
	const SEARCH_URL = `${BASE_URL}search`;

	try {
		const response = await fetch(`${SEARCH_URL}?q=${encodeURIComponent(query)}&type=${searchType}&limit=10`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
	
		if (!response.ok) {
			const errorData = await response.json();
      const errorMessage = errorData?.error?.message || 'An error occurred during the request.';
      return { error: `HTTP error ${response.status}: ${errorMessage}` };
		}
	
		const data = await response.json();
		return data;

	} catch(error) {
		return error
	}
};


export const getAlbumData = async (albumId: string): Promise<any> => {
	const token = await getToken();
	const ALBUM_URL = `${BASE_URL}albums/${albumId}`;

	try {
		const response = await fetch(`${ALBUM_URL}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
      const errorMessage = errorData?.error?.message || 'An error occurred during the album request.';
      return { error: `HTTP error ${response.status}: ${errorMessage}` };
		}

		const data = await response.json();

		const { name, images, total_tracks: totalTracks, release_date: releaseDate } = data;
		const tracks = data?.tracks?.items.map((track: any) => track.name)
		return { name, images, totalTracks, releaseDate, tracks };

	} catch (error) {
		return error
	}
};


export const getArtistData = async (artistId: string): Promise<any> => {
	const token = await getToken();
	const ARTIST_URL = `${BASE_URL}artists/${artistId}`;
	const ARTIST_ALBUM_URL = `${ARTIST_URL}/albums`

	try {
		const artistResponse = await fetch(`${ARTIST_URL}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		if (!artistResponse.ok) {
			const errorData = await artistResponse.json();
      const errorMessage = errorData?.error?.message || 'An error occurred during the artist request.';
      return { error: `HTTP error ${artistResponse.status}: ${errorMessage}` };
		}
	
		const artistData = await artistResponse.json();
	
		const albumResponse = await fetch(`${ARTIST_ALBUM_URL}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		if (!albumResponse.ok) {
			const errorData = await albumResponse.json();
      const errorMessage = errorData?.error?.message || 'An error occurred during the album request.';
      return { error: `HTTP error ${albumResponse.status}: ${errorMessage}` };
		}
	
		const albumData = await albumResponse.json();
	
		const { name, images, popularity, genres, followers } = artistData;
		const albums = albumData.items.map((album: any) => {
			return { name: album.name, images: album.images }
		})
		
		return { name, images, popularity, genres, followers, albums };

	} catch (error) {
		return error
	}
};
  