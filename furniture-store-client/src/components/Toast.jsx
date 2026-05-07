import { useEffect, useState } from 'react'

function Toast() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    function showToast(event) {
      setMessage(event.detail)

      setTimeout(() => {
        setMessage('')
      }, 2500)
    }

    window.addEventListener('showToast', showToast)

    return () => {
      window.removeEventListener('showToast', showToast)
    }
  }, [])

  if (!message) {
    return null
  }

  return (
    <div className="toast">
      <span>✅</span>
      <p>{message}</p>
    </div>
  )
}

export default Toast