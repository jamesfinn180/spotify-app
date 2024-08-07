export enum LS_VARS {
	SPOTIFY_TOKEN = 'SPOTIFY_TOKEN',
	SPOTIFY_EXPIRATION = 'SPOTIFY_EXPIRATION',
	FAVOURITE_ARTISTS = 'FAVOURITE_ARTISTS',
}

export interface IFavourite {
	name: string
	id: string
}

export const getItemLS = (name: LS_VARS): string | null => {
	const item = localStorage.getItem(name)
	return !!item ? item : null
}

export const setItemLS = (name: LS_VARS, value: string | [] | number | IFavourite[]) => {
	localStorage.setItem(name, JSON.stringify(value))
}


export const addFavourite = ({ name, id }: IFavourite) => {
	const newFavData = { name, id };
	const currentFavStr = getItemLS(LS_VARS.FAVOURITE_ARTISTS);
	let allFavs = []

	if (!!currentFavStr) {
		allFavs.push(...JSON.parse(currentFavStr))
	}

	const exists = allFavs.some(fav => fav.id === id);

  if (!exists) {
    allFavs.push(newFavData);
  }

	setItemLS(LS_VARS.FAVOURITE_ARTISTS, allFavs)
}

export const favouriteExists = (id: string): boolean => {
	const currentFavStr = getItemLS(LS_VARS.FAVOURITE_ARTISTS);
	if (!currentFavStr) return false
	const currentFav = JSON.parse(currentFavStr)

	return currentFav.some((fav: IFavourite) => fav.id === id);
}

export const removeFavourite = (id: string) => {
	if (!favouriteExists(id)) return
	const currentFavStr = getItemLS(LS_VARS.FAVOURITE_ARTISTS);
	const allFavs = []

	if (!!currentFavStr) {
		allFavs.push(...JSON.parse(currentFavStr))
	}
	const newAllFavs = allFavs.filter((fav) => fav.id !== id)

	setItemLS(LS_VARS.FAVOURITE_ARTISTS, newAllFavs)
}

export const getFavourites = () => {
	const currentFavStr = getItemLS(LS_VARS.FAVOURITE_ARTISTS);
	if (!currentFavStr) return 
	return !currentFavStr ? [] : [...JSON.parse(currentFavStr)]
}