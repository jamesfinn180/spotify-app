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