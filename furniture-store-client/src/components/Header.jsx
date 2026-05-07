import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const isAdminAuth = localStorage.getItem('isAdminAuth') === 'true'
  const [cartCount, setCartCount] = useState(0)

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const count = cart.reduce((sum, item) => {
      return sum + item.quantity
    }, 0)

    setCartCount(count)
  }

  useEffect(() => {
    updateCartCount()

    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  function logout() {
    localStorage.removeItem('isAdminAuth')
    navigate('/admin/login')
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        МебельМаркет
      </Link>

      <nav className="nav">
        <Link to="/">Главная</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/about">О магазине</Link>
        <Link to="/delivery">Доставка</Link>

        <Link to="/cart" className="cart-link">
          Корзина
          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>

        <Link to="/admin">Админка</Link>

        {isAdminAuth && (
          <button className="nav-logout" onClick={logout}>
            Выйти
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header