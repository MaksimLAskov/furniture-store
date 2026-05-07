import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../utils/productStorage'

function CatalogPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Все')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    const loadedProducts = getProducts()
    setProducts(loadedProducts)
  }, [])

  const categories = ['Все', ...new Set(products.map((product) => product.category))]

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory = category === 'Все' || product.category === category

    return matchesSearch && matchesCategory
  })

  if (sort === 'cheap') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  }

  if (sort === 'expensive') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  }

  return (
    <div>
      <section className="page-title">
        <h1>Каталог мебели</h1>
        <p>Найдите товар по названию, категории или цене.</p>
      </section>

      <section className="filters">
        <input
          type="text"
          placeholder="Поиск товара..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="default">Без сортировки</option>
          <option value="cheap">Сначала дешевле</option>
          <option value="expensive">Сначала дороже</option>
        </select>
      </section>

      <section className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Товары не найдены.</p>
        )}
      </section>
    </div>
  )
}

export default CatalogPage