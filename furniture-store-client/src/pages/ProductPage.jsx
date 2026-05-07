import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../utils/productStorage'

function ProductPage() {
  const { id } = useParams()

  const product = getProductById(id)

  if (!product) {
    return (
      <section className="page-title">
        <h1>Товар не найден</h1>
        <p>Такого товара нет в каталоге.</p>

        <Link to="/catalog" className="button">
          Вернуться в каталог
        </Link>
      </section>
    )
  }

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const existingProduct = cart.find((item) => item.id === product.id)

    let updatedCart

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }]
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart))

    window.dispatchEvent(new Event('cartUpdated'))
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: `${product.name} добавлен в корзину`
}))
  }

  return (
    <section className="product-page">
      <div className="product-page__image">
        <span>{product.imageEmoji}</span>
      </div>

      <div className="product-page__info">
        <p className="category">{product.category}</p>

        <h1>{product.name}</h1>

        <p className="product-page__description">
          {product.description}
        </p>

        <div className="product-info">
          <p>
            <strong>Материал:</strong> {product.material}
          </p>

          <p>
            <strong>Размеры:</strong> {product.width} × {product.height} × {product.depth} см
          </p>

          <p>
            <strong>Наличие:</strong>{' '}
            {product.inStock ? 'В наличии' : 'Нет в наличии'}
          </p>
        </div>

        <div className="product-page__price">
          {product.price.toLocaleString()} ₽
        </div>

        <button
          className="button button--product"
          onClick={addToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
        </button>
      </div>
    </section>
  )
}

export default ProductPage