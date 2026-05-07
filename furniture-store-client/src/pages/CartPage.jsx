import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function CartPage() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  function updateCart(newCart) {
  setCart(newCart)
  localStorage.setItem('cart', JSON.stringify(newCart))
  window.dispatchEvent(new Event('cartUpdated'))
}

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )

    updateCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)

    updateCart(updatedCart)
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id)
    updateCart(updatedCart)
  }

  function clearCart() {
    updateCart([])
  }

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  if (cart.length === 0) {
    return (
      <section className="page-title">
        <h1>Корзина пустая</h1>
        <p>Пока здесь нет товаров. Корзина держится, но ей тяжело.</p>

        <Link to="/catalog" className="button">
          Перейти в каталог
        </Link>
      </section>
    )
  }

  return (
    <div>
      <section className="page-title">
        <h1>Корзина</h1>
        <p>Проверьте выбранные товары перед оформлением заказа.</p>
      </section>

      <section className="cart">
        {cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <div className="cart-item__image">
              <span>{item.imageEmoji}</span>
            </div>

            <div className="cart-item__info">
              <h2>{item.name}</h2>
              <p>{item.category}</p>
              <strong>{item.price.toLocaleString()} ₽ за шт.</strong>
            </div>

            <div className="cart-item__controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>

            <div className="cart-item__total">
              {(item.price * item.quantity).toLocaleString()} ₽
            </div>

            <button
              className="cart-item__remove"
              onClick={() => removeFromCart(item.id)}
            >
              Удалить
            </button>
          </article>
        ))}

        <div className="cart-summary">
          <div>
            <p>Итого к оплате:</p>
            <h2>{totalPrice.toLocaleString()} ₽</h2>
          </div>

          <div className="cart-summary__actions">
            <button className="button button--secondary" onClick={clearCart}>
              Очистить корзину
            </button>

            <Link to="/checkout" className="button">
              Оформить заказ
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartPage