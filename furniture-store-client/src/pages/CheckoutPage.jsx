import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function CheckoutPage() {
  const [cart, setCart] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  })

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.name.trim()) {
      alert('Введите имя покупателя')
      return
    }

    if (!form.phone.trim()) {
      alert('Введите телефон')
      return
    }

    if (!form.address.trim()) {
      alert('Введите адрес доставки')
      return
    }

    const newOrder = {
      id: Date.now(),
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        comment: form.comment,
      },
      items: cart,
      totalPrice,
      status: 'Новый',
      createdAt: new Date().toLocaleString('ru-RU'),
    }

    const savedOrders = JSON.parse(localStorage.getItem('orders')) || []
    const updatedOrders = [...savedOrders, newOrder]

    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    localStorage.removeItem('cart')
    window.dispatchEvent(new Event('cartUpdated'))

    setCart([])
    setIsSuccess(true)

    console.log('Новый заказ:', newOrder)
  }

  if (isSuccess) {
    return (
      <section className="success-page">
        <div className="success-card">
          <div className="success-icon">✅</div>

          <h1>Заказ оформлен</h1>

          <p>
            Заказ сохранён локально. Позже мы подключим сервер, и такие заказы
            будут сохраняться в PostgreSQL.
          </p>

          <div className="success-actions">
            <Link to="/catalog" className="button">
              Вернуться в каталог
            </Link>

            <Link to="/" className="button button--secondary">
              На главную
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <section className="page-title">
        <h1>Корзина пустая</h1>
        <p>Перед оформлением заказа нужно добавить товары в корзину.</p>

        <Link to="/catalog" className="button">
          Перейти в каталог
        </Link>
      </section>
    )
  }

  return (
    <div>
      <section className="page-title">
        <h1>Оформление заказа</h1>
        <p>Заполните контактные данные для доставки.</p>
      </section>

      <section className="checkout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Имя покупателя
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Например, Иван"
            />
          </label>

          <label>
            Телефон
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+7 999 123-45-67"
            />
          </label>

          <label>
            Адрес доставки
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Город, улица, дом, квартира"
            />
          </label>

          <label>
            Комментарий к заказу
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Например, позвонить за час до доставки"
            />
          </label>

          <button className="button button--checkout" type="submit">
            Подтвердить заказ
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Ваш заказ</h2>

          <div className="checkout-items">
            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity} × {item.price.toLocaleString()} ₽
                  </p>
                </div>

                <strong>
                  {(item.price * item.quantity).toLocaleString()} ₽
                </strong>
              </div>
            ))}
          </div>

          <div className="checkout-total">
            <span>Итого:</span>
            <strong>{totalPrice.toLocaleString()} ₽</strong>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default CheckoutPage