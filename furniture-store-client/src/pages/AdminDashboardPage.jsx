import { Link } from 'react-router-dom'
import { getProducts } from '../utils/productStorage'

function AdminDashboardPage() {
  const products = getProducts()
  const orders = JSON.parse(localStorage.getItem('orders')) || []

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.totalPrice
  }, 0)

  const newOrdersCount = orders.filter((order) => {
    return order.status === 'Новый'
  }).length

  const completedOrdersCount = orders.filter((order) => {
    return order.status === 'Завершён'
  }).length

  const latestOrders = orders.slice(-3).reverse()

  return (
    <div>
      <section className="page-title">
        <h1>Панель администратора</h1>
        <p>
          Сводная информация по товарам, заказам и работе мебельного магазина.
        </p>
      </section>

      <section className="admin-stats">
        <article className="admin-stat-card">
          <span>📦</span>
          <div>
            <p>Товаров в каталоге</p>
            <h2>{products.length}</h2>
          </div>
        </article>

        <article className="admin-stat-card">
          <span>🧾</span>
          <div>
            <p>Всего заказов</p>
            <h2>{orders.length}</h2>
          </div>
        </article>

        <article className="admin-stat-card">
          <span>💰</span>
          <div>
            <p>Сумма заказов</p>
            <h2>{totalRevenue.toLocaleString()} ₽</h2>
          </div>
        </article>

        <article className="admin-stat-card">
          <span>🔥</span>
          <div>
            <p>Новых заказов</p>
            <h2>{newOrdersCount}</h2>
          </div>
        </article>
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-panel-card">
          <h2>Управление товарами</h2>

          <p>
            Добавляйте новые товары, изменяйте описание, цену, размеры,
            наличие и категорию мебели.
          </p>

          <Link to="/admin/products" className="button">
            Открыть товары
          </Link>
        </article>

        <article className="admin-panel-card">
          <h2>Управление заказами</h2>

          <p>
            Просматривайте заказы покупателей, состав заказа, контактные данные
            и изменяйте статус обработки.
          </p>

          <Link to="/admin/orders" className="button">
            Открыть заказы
          </Link>
        </article>

        <article className="admin-panel-card">
          <h2>Пользовательский каталог</h2>

          <p>
            Проверьте, как товары отображаются для покупателя в каталоге
            мебельного магазина.
          </p>

          <Link to="/catalog" className="button button--secondary">
            Перейти в каталог
          </Link>
        </article>
      </section>

      <section className="latest-orders">
        <div className="section-header">
          <h2>Последние заказы</h2>
          <Link to="/admin/orders">Смотреть все</Link>
        </div>

        {latestOrders.length === 0 ? (
          <div className="empty-admin-block">
            <p>Пока заказов нет. Можно оформить тестовый заказ через каталог.</p>
          </div>
        ) : (
          <div className="latest-orders-list">
            {latestOrders.map((order) => (
              <article className="latest-order-card" key={order.id}>
                <div>
                  <h3>Заказ №{order.id}</h3>
                  <p>{order.customer.name}</p>
                </div>

                <div>
                  <strong>{order.totalPrice.toLocaleString()} ₽</strong>
                  <span>{order.status}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="admin-note">
        <h2>Что показывает эта страница?</h2>

        <p>
          Эта панель собирает основные показатели системы: количество товаров,
          число заказов, сумму заказов и количество новых заявок. Позже эти
          данные будут загружаться с сервера и храниться в базе PostgreSQL.
        </p>
      </section>
    </div>
  )
}

export default AdminDashboardPage