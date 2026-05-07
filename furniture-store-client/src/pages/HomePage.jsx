import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../utils/productStorage'

function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadedProducts = getProducts()
    setProducts(loadedProducts)
  }, [])

  const popularProducts = products.slice(0, 3)

  return (
    <div>
      <section className="hero">
        <div>
          <p className="eyebrow">Интернет-магазин мебели</p>

          <h1>Мебель для дома и рабочего пространства</h1>

          <p>
            Система мебельного магазина с каталогом товаров, корзиной,
            оформлением заказов и административной панелью.
          </p>

          <Link to="/catalog" className="button button--large">
            Перейти в каталог
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Популярные товары</h2>
          <Link to="/catalog">Смотреть все</Link>
        </div>

        <div className="products-grid">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage