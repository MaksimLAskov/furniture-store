import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <span>{product.imageEmoji}</span>
      </div>

      <div className="product-card__content">
        <p className="category">{product.category}</p>

        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <strong>{product.price.toLocaleString()} ₽</strong>

        <Link to={`/product/${product.id}`} className="button">
          Подробнее
        </Link>
      </div>
    </article>
  )
}

export default ProductCard