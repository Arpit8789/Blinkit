import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Plus, Minus, X, ShoppingCart, Globe, Star, Zap, Heart, Gift, Menu, ChevronRight, ChevronDown, Phone, MapPin, Clock, IndianRupee, Home, User, Search, Settings } from 'lucide-react';

// Sample product data with Hindi translations
const categories = [
  {
    name: "Snacks",
    nameHi: "नाश्ता",
    icon: "🍿",
    gradient: "from-blue-500 to-purple-600",
    products: [
      { id: 1, name: "Lay's Classic Chips", nameHi: "लेज़ क्लासिक चिप्स", price: 20, originalPrice: 25, image: "https://images.heb.com/is/image/HEBGrocery/001865742", rating: 4.5, discount: 20 },
      { id: 2, name: "Oreo Cookies", nameHi: "ओरियो कुकीज़", price: 30, originalPrice: 35, image: "https://i5.walmartimages.com/asr/f4b2b9ae-a9d4-4c9e-8978-d5dbf8d866d1.2e7c923458a90653316559e94272a857.jpeg", rating: 4.8, discount: 14 },
      { id: 3, name: "Kurkure Masala", nameHi: "कुरकुरे मसाला", price: 25, originalPrice: 30, image: "https://apnafoodmarket.com/wp-content/uploads/2020/05/kurkure-masala.jpg", rating: 4.6, discount: 17 },
      { id: 4, name: "Haldiram's Namkeen", nameHi: "हल्दीराम नमकीन", price: 45, originalPrice: 50, image: "https://www.vrindasupermart.in/wp-content/uploads/2021/11/70000800_2-haldirams-namkeen-aloo-bhujia-del.png", rating: 4.7, discount: 10 }
    ]
  },
  {
    name: "Cold Drinks",
    nameHi: "ठंडे पेय",
    icon: "🥤",
    gradient: "from-cyan-500 to-blue-600",
    products: [
      { id: 5, name: "Coca Cola 250ml", nameHi: "कोका कोला 250ml", price: 25, originalPrice: 30, image: "https://cdn.carrefour.eu/1200_04017926_90338243_00.jpeg", rating: 4.4, discount: 17 },
      { id: 6, name: "Pepsi 250ml", nameHi: "पेप्सी 250ml", price: 25, originalPrice: 30, image: "https://www.princeofficesolutions.com/media/catalog/product/cache/bfd136ef890b09dfcd853feb466b1a68/p/o/pos1380_1.png", rating: 4.3, discount: 17 },
      { id: 7, name: "Sprite 250ml", nameHi: "स्प्राइट 250ml", price: 25, originalPrice: 30, image: "https://www.urbangroc.com/wp-content/uploads/2021/04/Sprit-Soft-Drink-2-01.jpg", rating: 4.5, discount: 17 },
      { id: 8, name: "Mango Juice", nameHi: "आम का जूस", price: 35, originalPrice: 40, image: "https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/1200Wx1200H-null?context=bWFzdGVyfGltYWdlc3wxNzQ5NDB8aW1hZ2UvanBlZ3xoNzAvaDMyLzE1NjI4NDc4MTg1NTAyLzEyMDBXeDEyMDBIX251bGx8OTFhMjFkNDhkYjI5ZDU3MWY2ODllNzg0ODk4ZTBjZTE2YmJkYzYyZDBlZmRmOWM2MDkxNzg4ZTA4YjQyMjJjMA", rating: 4.6, discount: 12 }
    ]
  },
  {
    name: "Essentials",
    nameHi: "आवश्यक सामान",
    icon: "🛒",
    gradient: "from-emerald-500 to-teal-600",
    products: [
      { id: 9, name: "Bread Loaf", nameHi: "ब्रेड", price: 30, originalPrice: 35, image: "https://picsum.photos/400/400?random=9", rating: 4.2, discount: 14 },
      { id: 10, name: "Milk 1L", nameHi: "दूध 1 लीटर", price: 55, originalPrice: 60, image: "https://picsum.photos/400/400?random=10", rating: 4.7, discount: 8 },
      { id: 11, name: "Sugar 1kg", nameHi: "चीनी 1 किलो", price: 45, originalPrice: 50, image: "https://picsum.photos/400/400?random=11", rating: 4.8, discount: 10 },
      { id: 12, name: "Rice 1kg", nameHi: "चावल 1 किलो", price: 80, originalPrice: 90, image: "https://picsum.photos/400/400?random=12", rating: 4.6, discount: 11 }
    ]
  },
  {
    name: "Dairy",
    nameHi: "डेयरी उत्पाद",
    icon: "🥛",
    gradient: "from-pink-500 to-rose-600",
    products: [
      { id: 13, name: "Butter 100g", nameHi: "मक्खन 100g", price: 45, originalPrice: 50, image: "http://upload.wikimedia.org/wikipedia/commons/f/fd/Western-pack-butter.jpg", rating: 4.5, discount: 10 },
      { id: 14, name: "Yogurt Cup", nameHi: "दही", price: 20, originalPrice: 25, image: "https://graficsea.com/wp-content/uploads/2022/12/Sweet-Khalid-Dahi-Yogurt-.png", rating: 4.4, discount: 20 },
      { id: 15, name: "Cheese Slice", nameHi: "चीज़ स्लाइस", price: 60, originalPrice: 70, image: "https://www.pngplay.com/wp-content/uploads/15/Cheese-Slices-Transparent-PNG.png", rating: 4.3, discount: 14 },
      { id: 16, name: "Paneer 200g", nameHi: "पनीर 200g", price: 90, originalPrice: 100, image: "https://images.herzindagi.info/image/2020/Aug/raw-paneer-for-health.jpg", rating: 4.8, discount: 10 }
    ]
  },
  {
    name: "Indian Spices",
    nameHi: "भारतीय मसाले",
    icon: "🌶️",
    gradient: "from-orange-500 to-red-600",
    products: [
      { id: 17, name: "Turmeric Powder", nameHi: "हल्दी पाउडर", price: 35, originalPrice: 40, image: "https://i0.wp.com/www.urbangreensmarket.com/wp-content/uploads/2019/05/turmeric-powder-1.jpg?fit=1465%2C1465&ssl=1", rating: 4.7, discount: 12 },
      { id: 18, name: "Red Chili Powder", nameHi: "लाल मिर्च पाउडर", price: 40, originalPrice: 45, image: "https://i.etsystatic.com/25828839/r/il/1a9552/2624936318/il_1588xN.2624936318_bewq.jpg", rating: 4.6, discount: 11 },
      { id: 19, name: "Garam Masala", nameHi: "गरम मसाला", price: 50, originalPrice: 60, image: "https://www.thespruceeats.com/thmb/PqpyXzxIgg-jTUsOwlO8Z0xqv5c=/3865x2576/filters:fill(auto,1)/high-angle-view-of-garam-masala-in-container-651468421-582242ae5f9b58d5b18730bb.jpg", rating: 4.8, discount: 17 },
      { id: 20, name: "Cumin Seeds", nameHi: "जीरा", price: 45, originalPrice: 50, image: "https://www.ekowarehouse.com/files/product_images/cumin+(2).jpg", rating: 4.5, discount: 10 }
    ]
  },
  {
    name: "Indian Sweets",
    nameHi: "भारतीय मिठाइयाँ",
    icon: "🍯",
    gradient: "from-yellow-500 to-orange-600",
    products: [
      { id: 21, name: "Gulab Jamun", nameHi: "गुलाब जामुन", price: 80, originalPrice: 90, image: "https://bakewithzoha.com/wp-content/uploads/2023/04/gulab-jamun-3-scaled.jpg", rating: 4.9, discount: 11 },
      { id: 22, name: "Rasgulla Pack", nameHi: "रसगुल्ला", price: 70, originalPrice: 80, image: "https://www.jiomart.com/images/product/600x600/rvyryhmgkx/jai-shoppee-royal-rasgulla-rasgulla-1kg-pack-of-2-product-images-orvyryhmgkx-p593954631-4-202209221933.jpg", rating: 4.7, discount: 12 },
      { id: 23, name: "Jaggery 500g", nameHi: "गुड़ 500g", price: 55, originalPrice: 65, image: "https://images.healthshots.com/healthshots/en/uploads/2022/09/20123940/jaggery.jpg", rating: 4.6, discount: 15 },
      { id: 24, name: "Mishti Doi", nameHi: "मिष्टी दोई", price: 45, originalPrice: 50, image: "https://graficsea.com/wp-content/uploads/2022/12/Sweet-Khalid-Dahi-Yogurt-.png", rating: 4.8, discount: 10 }
    ]
  }
];

const Navbar = ({ isHindi, setIsHindi, setShowMenu, showMenu }) => (
  <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
    <div className="px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <Zap className="text-purple-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">R.G.S.</h1>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-300" size={14} fill="currentColor" />
              <span className="text-yellow-300 text-xs font-medium">Radhika General Store</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 duration-200 shadow-md"
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{isHindi ? 'EN' : 'हिं'}</span>
          </button>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full flex items-center justify-center hover:bg-white/30 duration-200 shadow-md"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </div>
    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2 px-4 text-center shadow-md">
      <div className="flex items-center justify-center gap-2">
        <Gift size={16} />
        <span className="text-sm font-medium">
          {isHindi ? '⚡ न्यूनतम ऑर्डर ₹50 | तेज़ स्थानीय डिलीवरी' : '⚡ Minimum Order ₹50 | Fast Local Delivery'}
        </span>
      </div>
    </div>
  </div>
);

const SideMenu = ({ isOpen, onClose, isHindi }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{isHindi ? 'मेन्यू' : 'Menu'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Home size={20} className="text-gray-600" />
            <span className="font-medium">{isHindi ? 'होम' : 'Home'}</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Search size={20} className="text-gray-600" />
            <span className="font-medium">{isHindi ? 'खोजें' : 'Search'}</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <ShoppingBag size={20} className="text-gray-600" />
            <span className="font-medium">{isHindi ? 'ऑर्डर हिस्ट्री' : 'Order History'}</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <User size={20} className="text-gray-600" />
            <span className="font-medium">{isHindi ? 'प्रोफाइल' : 'Profile'}</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Settings size={20} className="text-gray-600" />
            <span className="font-medium">{isHindi ? 'सेटिंग्स' : 'Settings'}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center gap-3 p-3">
              <Phone size={20} className="text-green-600" />
              <div>
                <div className="font-medium">{isHindi ? 'सहायता' : 'Support'}</div>
                <div className="text-sm text-gray-500">+91 8789658518</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, cartItems, onUpdateQuantity, isHindi }) => {
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              {product.discount}% OFF
            </div>
          )}
          <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md">
            <Heart size={16} className="text-red-500" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="text-yellow-400" size={14} fill="currentColor" />
          <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
        </div>
        <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 h-10">
          {isHindi ? product.nameHi : product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center">
            <IndianRupee size={16} className="text-emerald-600" />{product.price}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through flex items-center">
              <IndianRupee size={12} />{product.originalPrice}
            </p>
          )}
        </div>
        {quantity === 0 ? (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-4 rounded-xl font-bold duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus size={16} />
            {isHindi ? 'कार्ट में डालें' : 'Add to Cart'}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-2 border-2 border-green-200">
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="w-9 h-9 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center duration-200 shadow-md"
            >
              <Minus size={16} />
            </button>
            <span className="font-bold text-green-700 text-lg min-w-8 text-center">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="w-9 h-9 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full flex items-center justify-center duration-200 shadow-md"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CategorySection = ({ category, cartItems, onAddToCart, onUpdateQuantity, isHindi, isExpanded }) => {
  if (!isExpanded) return null;
  
  return (
    <div className="px-4 pb-6">
      <div className="grid grid-cols-2 gap-4">
        {category.products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            cartItems={cartItems}
            onAddToCart={onAddToCart}
            onUpdateQuantity={onUpdateQuantity}
            isHindi={isHindi}
          />
        ))}
      </div>
    </div>
  );
};

const CategoryHeader = ({ category, isHindi, isExpanded, onToggle }) => (
  <div className="px-4 mb-4">
    <button 
      onClick={onToggle}
      className="w-full"
    >
      <div className={`bg-gradient-to-r ${category.gradient} rounded-2xl p-5 shadow-xl relative overflow-hidden`}>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl drop-shadow-lg">{category.icon}</div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                {isHindi ? category.nameHi : category.name}
              </h2>
              <p className="text-white/90 text-sm drop-shadow-sm">
                {isHindi ? 'सबसे अच्छी गुणवत्ता' : 'Best Quality Products'}
              </p>
            </div>
          </div>
          <ChevronDown 
            className={`text-white duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            size={24} 
          />
        </div>
      </div>
    </button>
  </div>
);

const FloatingCartButton = ({ cartItems, onClick, isHindi }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems === 0) return null;
  
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl duration-300 z-40"
    >
      <div className="relative">
        <ShoppingBag size={28} />
        <span className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
          {totalItems}
        </span>
      </div>
    </button>
  );
};

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onCheckout, isHindi }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full max-w-md max-h-[85vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <ShoppingCart size={28} />
              {isHindi ? 'आपका कार्ट' : 'Your Cart'}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center duration-200 backdrop-blur-sm"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-white/90 mt-2">
            {isHindi ? `${cartItems.length} आइटम` : `${cartItems.length} items`}
          </p>
        </div>
        <div className="overflow-y-auto max-h-96">
          {cartItems.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={40} className="text-purple-400" />
              </div>
              <p className="text-gray-500 text-lg">
                {isHindi ? 'आपका कार्ट खाली है' : 'Your cart is empty'}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shadow-md" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-800 mb-1">
                      {isHindi ? item.nameHi : item.name}
                    </h3>
                    <p className="text-green-600 font-bold text-lg flex items-center">
                      <IndianRupee size={14} />{item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center duration-200 shadow-md"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-purple-700 text-lg min-w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full flex items-center justify-center duration-200 shadow-md"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-bold text-gray-800 text-lg min-w-16 text-right flex items-center">
                    <IndianRupee size={14} />{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="border-t bg-gradient-to-r from-gray-50 to-white p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">
                {isHindi ? 'कुल राशि:' : 'Total:'}
              </span>
              <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center">
                <IndianRupee size={20} />{total}
              </span>
            </div>
            {total < 50 && (
              <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 p-3 rounded-xl">
                <p className="text-sm text-orange-700 font-medium">
                  {isHindi 
                    ? `न्यूनतम ऑर्डर के लिए ₹${50 - total} और जोड़ें`
                    : `Add ₹${50 - total} more to reach minimum order value`
                  }
                </p>
              </div>
            )}
            <button
              onClick={onCheckout}
              disabled={total < 50}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg duration-200 shadow-xl ${
                total >= 50
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isHindi ? `अभी खरीदें - ₹${total}` : `Buy Now - ₹${total}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckoutMessage = ({ isVisible, onClose, isHindi }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={40} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {isHindi ? 'WhatsApp पर भेजा जा रहा है' : 'Redirecting to WhatsApp'}
        </h3>
        <p className="text-gray-600 mb-6 text-lg">
          {isHindi 
            ? 'आपका ऑर्डर पूरा करने के लिए आपको WhatsApp पर भेजा जाएगा।'
            : 'You will now be redirected to WhatsApp to complete your order.'
          }
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full w-8 h-8 border-4 border-green-500 border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};

const StoreInfoBar = ({ isHindi }) => (
  <div className="mx-4 mt-4 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-4 text-white shadow-xl">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <MapPin className="text-blue-400" size={20} />
        <div>
          <h3 className="font-bold text-sm">{isHindi ? 'स्थान' : 'Location'}</h3>
          <p className="text-xs opacity-90">{isHindi ? 'Aapke ghar' : 'Near to your Home'}</p>
        </div>
      </div>
      <div className="h-8 w-px bg-white/30"></div>
      <div className="flex items-center gap-3">
        <Clock className="text-green-400" size={20} />
        <div>
          <h3 className="font-bold text-sm">{isHindi ? 'समय' : 'Timing'}</h3>
          <p className="text-xs opacity-90">8 AM - 10 PM</p>
        </div>
      </div>
      <div className="h-8 w-px bg-white/30"></div>
      <div className="flex items-center gap-3">
        <Phone className="text-yellow-400" size={20} />
        <div>
          <h3 className="font-bold text-sm">{isHindi ? 'कॉल करें' : 'Call Us'}</h3>
          <p className="text-xs opacity-90">8789658518</p>
        </div>
      </div>
    </div>
  </div>
);

export default function QuickMartApp() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);
  const [isHindi, setIsHindi] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({ 0: true }); // First category expanded by default
  const [showMenu, setShowMenu] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const toggleCategory = (index) => {
    setExpandedCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cartItems.map(item => 
      `${isHindi ? item.nameHi : item.name} (${item.quantity}x)`
    ).join(', ');
    const message = isHindi 
      ? `नमस्ते! मैं ऑर्डर देना चाहता/चाहती हूं:\n\nआइटम: ${itemsList}\nकुल राशि: ₹${total}\n\nकृपया पुष्टि करें और डिलीवरी की जानकारी दें।\n\nधन्यवाद!`
      : `Hi! I'd like to place an order:\n\nItems: ${itemsList}\nTotal Amount: ₹${total}\n\nPlease confirm and provide delivery details.\n\nThanks!`;
    
    setShowCheckoutMessage(true);
    setIsCartOpen(false);
    
    setTimeout(() => {
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/918789658518?text=${encodedMessage}`, '_blank');
      setShowCheckoutMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <Navbar 
        isHindi={isHindi} 
        setIsHindi={setIsHindi} 
        setShowMenu={setShowMenu}
        showMenu={showMenu}
      />
      
      <SideMenu 
        isOpen={showMenu} 
        onClose={() => setShowMenu(false)} 
        isHindi={isHindi} 
      />
      
      <main className="pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-8 mx-4 mt-2 rounded-3xl shadow-2xl">
          <div className="px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="text-yellow-300" size={32} />
              <h1 className="text-3xl font-bold tracking-tight">
                {isHindi ? 'तुरंत डिलीवरी' : 'Lightning Fast Delivery'}
              </h1>
            </div>
            <p className="text-lg text-white/90 mb-4">
              {isHindi 
                ? 'मिनटों में आपके दरवाजे पर ताजा सामान' 
                : 'Fresh groceries delivered to your door in minutes'
              }
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>{isHindi ? '10 मिनट डिलीवरी' : '10 Min Delivery'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>{isHindi ? 'सबसे कम दाम' : 'Best Prices'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Store Info */}
        <StoreInfoBar isHindi={isHindi} />
        
        {/* Special Offers Banner */}
        <div className="mx-4 mt-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Gift size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {isHindi ? '🎉 विशेष छूट!' : '🎉 Special Offers!'}
                </h3>
                <p className="text-sm text-white/90">
                  {isHindi ? 'पहले ऑर्डर पर 20% छूट' : 'Up to 20% off on first order'}
                </p>
              </div>
              
            </div>
        
            <div className="text-2xl font-bold">20%</div>
          </div>
        </div>
        <br />
        
        {/* Categories */}
        {categories.map((category, index) => (
          <div key={category.name} className="mb-6">
            <CategoryHeader
              category={category}
              isHindi={isHindi}
              isExpanded={expandedCategories[index]}
              onToggle={() => toggleCategory(index)}
            />
            <CategorySection
              category={category}
              cartItems={cartItems}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
              isHindi={isHindi}
              isExpanded={expandedCategories[index]}
            />
          </div>
        ))}
        
        {/* Footer */}
        <div className="mx-4 mt-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white text-center shadow-xl">
          <h3 className="text-xl font-bold mb-2">
            {isHindi ? 'R.G.S. के साथ खुश रहें!' : 'Stay Happy with R.G.S.!'}
          </h3>
          <p className="text-gray-300 text-sm">
            {isHindi 
              ? 'हमारी सेवा के लिए धन्यवाद। आपकी खुशी हमारी प्राथमिकता है।'
              : 'Thank you for choosing us. Your satisfaction is our priority.'
            }
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400" size={16} fill="currentColor" />
              <span className="text-sm">4.8/5</span>
            </div>
            <div className="text-sm">10,000+ {isHindi ? 'खुश ग्राहक' : 'Happy Customers'}</div>
          </div>
        </div>
      </main>
      
      <FloatingCartButton 
        cartItems={cartItems} 
        onClick={() => setIsCartOpen(true)}
        isHindi={isHindi}
      />
      
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
        isHindi={isHindi}
      />
      
      <CheckoutMessage
        isVisible={showCheckoutMessage}
        onClose={() => setShowCheckoutMessage(false)}
        isHindi={isHindi}
      />
    </div>
  );
}
