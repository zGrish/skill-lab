import React, { useState } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const products = [
    { id: 1, name: 'Pure Cotton Saree', price: 1500, image: '/images/sareeWomen.jpeg', maxWidth: '200px', maxHeight: '200px', rating: 4, category: 'women' },
    { id: 2, name: 'Uniform Sweatshirt', price: 1270, image: '/images/blueKid.jpeg', maxWidth: '200px', maxHeight: '200px', rating: 5, category: 'kids' },
    { id: 3, name: 'Button-Up Combo', price: 1800, image: '/images/shirtsMen.jpg', maxWidth: '200px', maxHeight: '200px', rating: 3, category: 'men' },
    { id: 4, name: 'Anarkhali Kurta Set', price: 2500, image: '/images/purpleWomen.jpeg', maxWidth: '200px', maxHeight: '200px', rating: 4, category: 'women' },
    { id: 5, name: 'Nike Unisex T-Shirt', price: 2200, image: '/images/uniKid.jpeg', maxWidth: '200px', maxHeight: '200px', rating: 4, category: 'kids' },
    { id: 6, name: 'Peace T-Shirt', price: 900, image: '/images/blackMen.jpeg', maxWidth: '200px', maxHeight: '200px', rating: 5, category: 'men' },
    { id: 7, name: 'Flared Dress', price: 2100, image: '/images/blackWomen.jpeg', maxWidth: '200px', maxHeight: '200px', rating: 4, category: 'women' },
    { id: 8, name: 'Adidas T-Shirt', price: 2400, image: '/images/whiteMen.jpeg', maxWidth: '200px', maxHeight: '200px', rating: 3, category: 'men' },
  ];

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setShowCart(true);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  const placeOrder = () => {
    console.log('Order placed!');
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <header>
        <nav>
          <div className="search-bar">
            <input type="text" placeholder="Search products" />
          </div>
          <div className="categories-filter">
            <select onChange={(e) => filterProductsByCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
        </nav>
      </header>
      <main>
        <div className="product-list">
          {products
            .filter((product) => !selectedCategory || product.category === selectedCategory)
            .map((product) => (
              <div key={product.id} className={`product-card ${selectedCategory && product.category !== selectedCategory ? 'hidden' : ''}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: product.maxWidth, maxHeight: product.maxHeight }}
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                  <p>Rating: {product.rating} stars</p>
                </div>
                <div className="quantity-buttons">
                  <button onClick={() => removeFromCart(product.id)}>-</button>
                  <span>{(cart.find((item) => item.id === product.id) || {}).quantity || 0}</span>
                  <button onClick={() => addToCart(product)}>+</button>
                </div>
              </div>
            ))}
        </div>
      </main>
      {showCart && (
        <div className="cart">
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ₹{item.price} (Quantity: {item.quantity})
                <div className="remove-button">
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default App;