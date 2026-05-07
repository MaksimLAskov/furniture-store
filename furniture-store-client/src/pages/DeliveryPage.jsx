import { Link } from 'react-router-dom'

function DeliveryPage() {
  return (
    <div>
      <section className="page-title">
        <h1>Доставка и оплата</h1>
        <p>
          Информация о способах доставки, оплате и обработке заказов
          мебельного магазина.
        </p>
      </section>

      <section className="delivery-grid">
        <article className="delivery-card">
          <div className="delivery-icon">🚚</div>

          <h2>Доставка мебели</h2>

          <p>
            После оформления заказа администратор получает информацию о
            покупателе, адрес доставки и состав заказа. Далее заказ переводится
            в статус обработки.
          </p>
        </article>

        <article className="delivery-card">
          <div className="delivery-icon">💳</div>

          <h2>Оплата заказа</h2>

          <p>
            В учебной версии проекта онлайн-оплата не подключена. Заказ
            оформляется через форму, а оплата может быть произведена при
            получении или после согласования с менеджером.
          </p>
        </article>

        <article className="delivery-card">
          <div className="delivery-icon">📦</div>

          <h2>Обработка заказа</h2>

          <p>
            Администратор может менять статус заказа: новый, в обработке,
            доставляется, завершён или отменён. Это позволяет отслеживать
            состояние заявки.
          </p>
        </article>
      </section>

      <section className="delivery-steps">
        <h2>Как проходит оформление заказа</h2>

        <div className="steps-list">
          <article className="step-card">
            <span>1</span>
            <div>
              <h3>Выбор товара</h3>
              <p>Покупатель выбирает мебель в каталоге и открывает карточку товара.</p>
            </div>
          </article>

          <article className="step-card">
            <span>2</span>
            <div>
              <h3>Добавление в корзину</h3>
              <p>Товар добавляется в корзину, где можно изменить количество.</p>
            </div>
          </article>

          <article className="step-card">
            <span>3</span>
            <div>
              <h3>Оформление заказа</h3>
              <p>Покупатель вводит имя, телефон, адрес доставки и комментарий.</p>
            </div>
          </article>

          <article className="step-card">
            <span>4</span>
            <div>
              <h3>Работа администратора</h3>
              <p>Администратор видит заказ в панели управления и меняет его статус.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="delivery-warning">
        <h2>Важно</h2>

        <p>
          Эта страница используется как часть демонстрационной версии дипломного
          проекта. После подключения сервера данные о заказах будут сохраняться
          в базе данных PostgreSQL.
        </p>

        <Link to="/catalog" className="button">
          Перейти к покупкам
        </Link>
      </section>
    </div>
  )
}

export default DeliveryPage