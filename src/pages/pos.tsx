import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Sale {
  id: number;
  items: CartItem[];
  timestamp: Date;
}

// Exemplo de produtos
const PRODUCTS_DATA: Product[] = [
  { id: 1, name: "Hydrate Oil", price: 50, category: "Skincare" },
  { id: 2, name: "Face Mask", price: 30, category: "Skincare" },
  { id: 3, name: "Hair Serum", price: 40, category: "Haircare" },
  { id: 4, name: "Shampoo", price: 25, category: "Haircare" },
];

export function Pos() {
  const [products] = useState<Product[]>(PRODUCTS_DATA);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Adiciona produto ao carrinho
  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove do carrinho
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Atualiza quantidade
  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  // Finaliza venda
  const finalizeSale = () => {
    if (cart.length === 0) return;
    setSalesHistory(prev => [...prev, { id: Date.now(), items: cart, timestamp: new Date() }]);
    setCart([]);
  };

  // Total do carrinho
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex w-[80rem]  h-screen font-sans">
      {/* Lista de produtos */}
      <div className="w-2/3 p-6 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        
        {/* Filtros de categoria */}
        <div className="flex gap-2 mb-4">
          {["All", "Skincare", "Haircare"].map(cat => (
            <button
              key={cat}
              className={`px-3 py-1 rounded ${
                selectedCategory === cat ? "bg-black text-white" : "bg-white border"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
              </div>
              <button
                className="mt-2 px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Carrinho */}
      <aside className="w-1/3 p-6 bg-white border-l flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-500">${item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 border rounded px-1 py-0.5"
                  />
                  <button className="text-red-600" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="font-bold mb-2">Total: ${cartTotal}</p>
          <button
            className="w-full px-3 py-2 bg-black text-white rounded hover:bg-gray-800"
            onClick={finalizeSale}
          >
            Finalize Sale
          </button>
        </div>

        {/* Histórico de vendas */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">Sales History</h3>
          {salesHistory.length === 0 ? (
            <p className="text-gray-500">No sales yet.</p>
          ) : (
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {salesHistory.map(sale => (
                <li key={sale.id} className="text-sm bg-gray-50 p-2 rounded">
                  <span className="font-bold">{sale.items.length} items</span> - {sale.timestamp.toLocaleTimeString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
