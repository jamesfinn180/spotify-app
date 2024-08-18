type ImageSizeType = 640 | 300 | 64

interface imageObj {
	url: string
	height: number
	width: number
}

export const getSpecificImage = (imgArr: imageObj[], size: ImageSizeType = 300) => {
	if (!Array.isArray(imgArr) || imgArr.length === 0) return ''
	const img = imgArr.find((img) => img.height === size)
	return !!img ? img.url : imgArr[0].url
}

export const formatNumberCommas = (num: number): string => new Intl.NumberFormat().format(num)

// Formats YYYY-MM-DD into Nov 15, 1998
export const formatDate = (dateStr: string): string => {
	const date = new Date(dateStr);
	if (isNaN(date.getTime())) return dateStr
	const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
	const formattedDate = date.toLocaleDateString('en-CA', options);
	return formattedDate;
}