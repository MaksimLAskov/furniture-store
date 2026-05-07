import { useEffect, useState } from 'react'
import { products as defaultProducts } from '../data/products'
import { getProducts, saveProducts } from '../utils/productStorage'

function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [editingProductId, setEditingProductId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    category: 'Диваны',
    price: '',
    imageEmoji: '🛋️',
    description: '',
    material: '',
    width: '',
    height: '',
    depth: '',
    inStock: true,
  })

    useEffect(() => {
    const loadedProducts = getProducts()
    setProducts(loadedProducts)
    }, [])

    function updateProducts(newProducts) {
    setProducts(newProducts)
    saveProducts(newProducts)
    }

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  function resetForm() {
  setForm({
    name: '',
    category: 'Диваны',
    price: '',
    imageEmoji: '🛋️',
    description: '',
    material: '',
    width: '',
    height: '',
    depth: '',
    inStock: true,
  })

  setEditingProductId(null)
}

function handleSubmit(event) {
  event.preventDefault()

  if (!form.name.trim()) {
    alert('Введите название товара')
    return
  }

  if (!form.price || Number(form.price) <= 0) {
    alert('Введите корректную цену')
    return
  }

  if (!form.description.trim()) {
    alert('Введите описание товара')
    return
  }

  const productData = {
    name: form.name,
    category: form.category,
    price: Number(form.price),
    imageEmoji: form.imageEmoji,
    description: form.description,
    material: form.material || 'Не указан',
    width: Number(form.width) || 0,
    height: Number(form.height) || 0,
    depth: Number(form.depth) || 0,
    inStock: form.inStock,
  }

  if (editingProductId) {
    const updatedProducts = products.map((product) =>
      product.id === editingProductId
        ? { ...product, ...productData }
        : product
    )

    updateProducts(updatedProducts)
    resetForm()
    return
  }

  const newProduct = {
    id: Date.now(),
    ...productData,
  }

  const updatedProducts = [...products, newProduct]
  updateProducts(updatedProducts)
  resetForm()
}

  function deleteProduct(id) {
  const isConfirmed = confirm('Удалить товар?')

  if (!isConfirmed) {
    return
  }

  const updatedProducts = products.filter((product) => product.id !== id)
  updateProducts(updatedProducts)

  if (editingProductId === id) {
    resetForm()
  }
}

  function startEditProduct(product) {
  setEditingProductId(product.id)

  setForm({
    name: product.name,
    category: product.category,
    price: String(product.price),
    imageEmoji: product.imageEmoji,
    description: product.description,
    material: product.material,
    width: String(product.width),
    height: String(product.height),
    depth: String(product.depth),
    inStock: product.inStock,
  })

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

  function resetProducts() {
    const isConfirmed = confirm('Вернуть товары по умолчанию? Все добавленные товары удалятся.')

    if (!isConfirmed) {
      return
    }

    updateProducts(defaultProducts)
  }

  return (
    <div>
      <section className="page-title admin-title">
        <div>
          <h1>Управление товарами</h1>
          <p>Добавление, просмотр и удаление товаров мебельного магазина.</p>
        </div>

        <button className="button button--secondary" onClick={resetProducts}>
          Сбросить товары
        </button>
      </section>

      <section className="admin-products-layout">
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <h2>{editingProductId ? 'Редактировать товар' : 'Добавить товар'}</h2>

          <label>
            Название товара
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Например, Диван Атланта"
            />
          </label>

          <label>
            Категория
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="Диваны">Диваны</option>
              <option value="Шкафы">Шкафы</option>
              <option value="Столы">Столы</option>
              <option value="Кровати">Кровати</option>
              <option value="Кресла">Кресла</option>
              <option value="Комоды">Комоды</option>
            </select>
          </label>

          <label>
            Цена
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="35990"
            />
          </label>

          <label>
            Иконка товара
            <select
              name="imageEmoji"
              value={form.imageEmoji}
              onChange={handleChange}
            >
              <option value="🛋️">🛋️ Диван</option>
              <option value="🚪">🚪 Шкаф</option>
              <option value="🪑">🪑 Стул/стол</option>
              <option value="🛏️">🛏️ Кровать</option>
              <option value="🧸">🧸 Детская мебель</option>
              <option value="📦">📦 Комод</option>
            </select>
          </label>

          <label>
            Описание
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Краткое описание товара"
            />
          </label>

          <label>
            Материал
            <input
              type="text"
              name="material"
              value={form.material}
              onChange={handleChange}
              placeholder="ЛДСП, ткань, дерево"
            />
          </label>

          <div className="admin-form-row">
            <label>
              Ширина, см
              <input
                type="number"
                name="width"
                value={form.width}
                onChange={handleChange}
              />
            </label>

            <label>
              Высота, см
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
              />
            </label>

            <label>
              Глубина, см
              <input
                type="number"
                name="depth"
                value={form.depth}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
            />
            Товар в наличии
          </label>

          <div className="admin-form-actions">
            <button className="button" type="submit">
                {editingProductId ? 'Сохранить изменения' : 'Добавить товар'}
            </button>

            {editingProductId && (
                <button
                className="button button--secondary"
                type="button"
                onClick={resetForm}
                >
                Отменить
                </button>
            )}
        </div>
</form>
        <div className="admin-products-list">
          <h2>Список товаров</h2>

          {products.length === 0 ? (
            <p>Товаров пока нет.</p>
          ) : (
            <div className="admin-products-table">
              {products.map((product) => (
                <article className="admin-product-card" key={product.id}>
                  <div className="admin-product-card__emoji">
                    {product.imageEmoji}
                  </div>

                  <div className="admin-product-card__info">
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <strong>{product.price.toLocaleString()} ₽</strong>
                  </div>

                  <div className="admin-product-card__details">
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

                  <div className="admin-product-card__actions">
                    <button
                        className="admin-edit"
                        onClick={() => startEditProduct(product)}
                    >
                        Редактировать
                    </button>

                    <button
                        className="admin-delete"
                        onClick={() => deleteProduct(product.id)}
                    >
                        Удалить
                    </button>
                </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminProductsPage