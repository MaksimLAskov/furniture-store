import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLoginPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    login: '',
    password: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (form.login === 'admin' && form.password === 'admin123') {
      localStorage.setItem('isAdminAuth', 'true')
      navigate('/admin')
      return
    }

    alert('Неверный логин или пароль')
  }

  return (
    <section className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-icon">🔐</div>

        <h1>Вход администратора</h1>

        <p>
          Введите данные администратора для доступа к панели управления
          мебельным магазином.
        </p>

        <label>
          Логин
          <input
            type="text"
            name="login"
            value={form.login}
            onChange={handleChange}
            placeholder="admin"
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="admin123"
          />
        </label>

        <button className="button button--login" type="submit">
          Войти
        </button>

        <div className="login-hint">
          <p>
            Тестовые данные: <strong>admin / admin123</strong>
          </p>
        </div>
      </form>
    </section>
  )
}

export default AdminLoginPage