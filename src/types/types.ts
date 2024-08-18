export interface IArtistData {
	name: string
	images: any[]
	popularity: number
	genres: string[] 
	followers: {
		href: string | null
		total: number
	}
	albums: IAlbumData[]
}

export interface IAlbumDetailData {
  name: string
	releaseDate: string
	totalTracks: number
  tracks: string[]
  images: any[]
}

export interface IAlbumData {
  name: string
	images: any[]
}

export const isArtistData = (data: IArtistData | IAlbumDetailData | IAlbumData): data is IArtistData => {
  return (
		(data as IArtistData).popularity !== undefined && 
		(data as IArtistData).genres !== undefined && 
		(data as IArtistData).followers !== undefined
	)
}

export const isAlbumData = (data: IArtistData | IAlbumDetailData | IAlbumData): data is IAlbumDetailData => {
  return (
		(data as IAlbumDetailData).totalTracks !== undefined && 
		(data as IAlbumDetailData).releaseDate !== undefined
	)
}