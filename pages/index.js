import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '' })

  const products = [
    { id: 1, name: 'Шашлык из свинины', price: 450, image: '🥩', description: '200г сочного мяса' },
    { id: 2, name: 'Шашлык из курицы', price: 350, image: '🍗', description: '200г куриного филе' },
    { id: 3, name: 'Шашлык из баранины', price: 550, image: '🍖', description: '200г баранины' },
    { id: 4, name: 'Люля-кебаб', price: 400, image: '🌭', description: '2 шт, 180г' },
    { id: 5, name: 'Овощи на мангале', price: 250, image: '🍅', description: 'Перец, помидор, баклажан' },
    { id: 6, name: 'Лаваш', price: 100, image: '🫓', description: 'Свежий армянский лаваш' },
    { id: 7, name: 'Соус ткемали', price: 80, image: '🥫', description: '100мл' },
    { id: 8, name: 'Аджика', price: 80, image: '🌶️', description: '100мл' },
  ]

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    const existing = cart.find(item => item.id === productId)
    if (existing.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId))
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ))
    }
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleOrder = (e) => {
    e.preventDefault()
    setShowOrder(false)
    alert(`Спасибо за заказ, ${form.name}! Мы свяжемся с вами по телефону ${form.phone} для подтверждения.`)
    setCart([])
    setForm({ name: '', phone: '', address: '' })
  }

  return (
    <>
      <Head>
        <title>Шашлычная - Доставка шашлыка</title>
        <meta name="description" content="Доставка свежего шашлыка и блюд на мангале" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <header>
          <div className="header-content">
            <h1>🔥 Шашлычная</h1>
            <p className="tagline">Свежий шашлык с доставкой на дом</p>
          </div>
          <button className="cart-button" onClick={() => setShowCart(!showCart)}>
            🛒 Корзина ({cart.length})
          </button>
        </header>

        <section className="hero">
          <h2>Горячий шашлык прямо к вашему столу!</h2>
          <p>Готовим на настоящем мангале. Доставка за 40 минут.</p>
        </section>

        <section className="products">
          <h2>Меню</h2>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.image}</div>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="price">{product.price} ₽</span>
                  <button onClick={() => addToCart(product)}>Добавить</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {showCart && (
          <div className="modal-overlay" onClick={() => setShowCart(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Корзина</h2>
                <button className="close-button" onClick={() => setShowCart(false)}>✕</button>
              </div>
              {cart.length === 0 ? (
                <p className="empty-cart">Корзина пуста</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div>
                          <div className="cart-item-name">{item.image} {item.name}</div>
                          <div className="cart-item-price">{item.price} ₽ × {item.quantity}</div>
                        </div>
                        <div className="cart-item-controls">
                          <button onClick={() => removeFromCart(item.id)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => addToCart(item)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <strong>Итого: {getTotal()} ₽</strong>
                  </div>
                  <button
                    className="order-button"
                    onClick={() => {
                      setShowCart(false)
                      setShowOrder(true)
                    }}
                  >
                    Оформить заказ
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {showOrder && (
          <div className="modal-overlay" onClick={() => setShowOrder(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Оформление заказа</h2>
                <button className="close-button" onClick={() => setShowOrder(false)}>✕</button>
              </div>
              <form onSubmit={handleOrder}>
                <div className="form-group">
                  <label>Имя:</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Телефон:</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Адрес доставки:</label>
                  <textarea
                    required
                    value={form.address}
                    onChange={(e) => setForm({...form, address: e.target.value})}
                  />
                </div>
                <div className="order-summary">
                  <p>Сумма заказа: <strong>{getTotal()} ₽</strong></p>
                </div>
                <button type="submit" className="order-button">Подтвердить заказ</button>
              </form>
            </div>
          </div>
        )}

        <footer>
          <div className="footer-content">
            <div>
              <h3>Контакты</h3>
              <p>📞 +7 (999) 123-45-67</p>
              <p>⏰ Ежедневно с 10:00 до 23:00</p>
            </div>
            <div>
              <h3>Доставка</h3>
              <p>🚗 Бесплатно от 1000 ₽</p>
              <p>⚡ 40-60 минут</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
