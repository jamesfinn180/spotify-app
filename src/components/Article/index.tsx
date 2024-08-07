import './Article.style.scss';

interface IArticle {
	isSmall?: boolean
	title: string
	image?: string
}

const Article = ({ isSmall = false, title, image = '' }: IArticle) => {
  return (
		<section className={!isSmall ? 'Article' : 'Article Article--small'}>
			<img className={!isSmall ? 'Article__image-container' : 'Article__image-container Article__image-container--small'} src={image} alt={title}/>
			<div className={!isSmall ? 'Article__text-container' : 'Article__text-container Article__text-container--small'}>
				<h2 className={!isSmall ? 'Article__title' : 'Article__title Article__title--small'}>{title}</h2>
				<p>Lorem ipsum dolor sit amet consectetur. Ac felis vivamus nibh malesuada viverra pellentesque eleifend aliquam ac. Convallis amet senectus blandit congue viverra blandit sed suscipit.</p>
			</div>
		</section>
	)
}

export default Article;