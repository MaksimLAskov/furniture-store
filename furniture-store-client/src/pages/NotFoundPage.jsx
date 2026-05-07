import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-code">404</div>

        <h1>Страница не найдена</h1>

        <p>
          Такой страницы в системе мебельного магазина нет. Возможно, адрес был
          введён неправильно или раздел ещё не создан.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="button">
            На главную
          </Link>

          <Link to="/catalog" className="button button--secondary">
            В каталог
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage