import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AdminOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || []
    setOrders(savedOrders)
  }, [])

  function updateOrders(newOrders) {
    setOrders(newOrders)
    localStorage.setItem('orders', JSON.stringify(newOrders))
  }

  function changeStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    )

    updateOrders(updatedOrders)
  }

  function deleteOrder(orderId) {
    const isConfirmed = confirm('Удалить заказ?')

    if (!isConfirmed) {
      return
    }

    const updatedOrders = orders.filter((order) => order.id !== orderId)
    updateOrders(updatedOrders)
  }

  function clearOrders() {
    const isConfirmed = confirm('Удалить все заказы?')

    if (!isConfirmed) {
      return
    }

    updateOrders([])
  }

  if (orders.length === 0) {
    return (
      <section className="page-title">
        <h1>Заказы</h1>
        <p>Пока заказов нет. Сначала оформи заказ через корзину.</p>

        <Link to="/catalog" className="button">
          Перейти в каталог
        </Link>
      </section>
    )
  }

  return (
    <div>
      <section className="page-title admin-title">
        <div>
          <h1>Заказы</h1>
          <p>Панель администратора для просмотра и обработки заказов.</p>
        </div>

        <button className="button button--secondary" onClick={clearOrders}>
          Очистить заказы
        </button>
      </section>

      <section className="admin-orders">
        {orders.map((order) => (
          <article className="admin-order" key={order.id}>
            <div className="admin-order__top">
              <div>
                <h2>Заказ №{order.id}</h2>
                <p>Дата: {order.createdAt}</p>
              </div>

              <span className="order-status">
                {order.status}
              </span>
            </div>

            <div className="admin-order__grid">
              <div className="admin-box">
                <h3>Покупатель</h3>

                <p>
                  <strong>Имя:</strong> {order.customer.name}
                </p>

                <p>
                  <strong>Телефон:</strong> {order.customer.phone}
                </p>

                <p>
                  <strong>Адрес:</strong> {order.customer.address}
                </p>

                {order.customer.comment && (
                  <p>
                    <strong>Комментарий:</strong> {order.customer.comment}
                  </p>
                )}
              </div>

              <div className="admin-box">
                <h3>Товары</h3>

                <div className="admin-order__items">
                  {order.items.map((item) => (
                    <div className="admin-order__item" key={item.id}>
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <strong>
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="admin-order__total">
                  <span>Итого:</span>
                  <strong>{order.totalPrice.toLocaleString()} ₽</strong>
                </div>
              </div>
            </div>

            <div className="admin-order__actions">
              <label>
                Статус заказа
                <select
                  value={order.status}
                  onChange={(event) => changeStatus(order.id, event.target.value)}
                >
                  <option value="Новый">Новый</option>
                  <option value="В обработке">В обработке</option>
                  <option value="Доставляется">Доставляется</option>
                  <option value="Завершён">Завершён</option>
                  <option value="Отменён">Отменён</option>
                </select>
              </label>

              <button
                className="admin-delete"
                onClick={() => deleteOrder(order.id)}
              >
                Удалить заказ
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default AdminOrdersPage