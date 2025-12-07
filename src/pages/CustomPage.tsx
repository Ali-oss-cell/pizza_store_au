import { useState } from 'react'
import { Check, ChevronRight, Minus, Plus, RotateCcw } from 'lucide-react'

// Pizza builder data
const sizes = [
  { id: 'small', name: 'Small', size: '10"', price: 10.99, feeds: '1-2' },
  { id: 'medium', name: 'Medium', size: '12"', price: 14.99, feeds: '2-3' },
  { id: 'large', name: 'Large', size: '14"', price: 18.99, feeds: '3-4' },
  { id: 'xlarge', name: 'X-Large', size: '16"', price: 22.99, feeds: '4-5' },
]

const crusts = [
  { id: 'classic', name: 'Classic Hand-Tossed', price: 0 },
  { id: 'thin', name: 'Thin & Crispy', price: 0 },
  { id: 'stuffed', name: 'Cheese Stuffed', price: 3.99 },
  { id: 'glutenfree', name: 'Gluten Free', price: 2.99 },
]

const sauces = [
  { id: 'tomato', name: 'Classic Tomato', color: '#dc2626' },
  { id: 'bbq', name: 'Smoky BBQ', color: '#7c2d12' },
  { id: 'alfredo', name: 'Creamy Alfredo', color: '#fef3c7' },
  { id: 'pesto', name: 'Basil Pesto', color: '#16a34a' },
  { id: 'buffalo', name: 'Spicy Buffalo', color: '#f97316' },
]

const cheeses = [
  { id: 'mozzarella', name: 'Mozzarella', price: 0, default: true },
  { id: 'cheddar', name: 'Cheddar', price: 1.49 },
  { id: 'parmesan', name: 'Parmesan', price: 1.99 },
  { id: 'feta', name: 'Feta', price: 2.49 },
  { id: 'goat', name: 'Goat Cheese', price: 2.99 },
]

const toppings = {
  meats: [
    { id: 'pepperoni', name: 'Pepperoni', price: 1.99 },
    { id: 'sausage', name: 'Italian Sausage', price: 2.49 },
    { id: 'bacon', name: 'Crispy Bacon', price: 2.49 },
    { id: 'chicken', name: 'Grilled Chicken', price: 2.99 },
    { id: 'ham', name: 'Ham', price: 1.99 },
  ],
  veggies: [
    { id: 'mushroom', name: 'Mushrooms', price: 1.49 },
    { id: 'onion', name: 'Red Onions', price: 0.99 },
    { id: 'pepper', name: 'Bell Peppers', price: 1.49 },
    { id: 'olive', name: 'Black Olives', price: 1.49 },
    { id: 'tomato', name: 'Fresh Tomatoes', price: 1.29 },
    { id: 'jalapeno', name: 'Jalapeños', price: 0.99 },
    { id: 'spinach', name: 'Baby Spinach', price: 1.49 },
    { id: 'pineapple', name: 'Pineapple', price: 1.29 },
  ],
}

export const CustomPage = () => {
  const [step, setStep] = useState(1)
  const [selectedSize, setSelectedSize] = useState(sizes[1])
  const [selectedCrust, setSelectedCrust] = useState(crusts[0])
  const [selectedSauce, setSelectedSauce] = useState(sauces[0])
  const [selectedCheeses, setSelectedCheeses] = useState<string[]>(['mozzarella'])
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)

  const toggleCheese = (id: string) => {
    setSelectedCheeses(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const calculateTotal = () => {
    let total = selectedSize.price + selectedCrust.price
    
    selectedCheeses.forEach(id => {
      const cheese = cheeses.find(c => c.id === id)
      if (cheese) total += cheese.price
    })
    
    selectedToppings.forEach(id => {
      const allToppings = [...toppings.meats, ...toppings.veggies]
      const topping = allToppings.find(t => t.id === id)
      if (topping) total += topping.price
    })
    
    return total * quantity
  }

  const resetBuilder = () => {
    setStep(1)
    setSelectedSize(sizes[1])
    setSelectedCrust(crusts[0])
    setSelectedSauce(sauces[0])
    setSelectedCheeses(['mozzarella'])
    setSelectedToppings([])
    setQuantity(1)
  }

  const steps = [
    { num: 1, title: 'Size & Crust' },
    { num: 2, title: 'Sauce' },
    { num: 3, title: 'Cheese' },
    { num: 4, title: 'Toppings' },
    { num: 5, title: 'Review' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-pizza-dark via-gray-800 to-pizza-dark py-16 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-pizza-orange rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-pizza-orange/50 rounded-full"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Build Your <span className="text-pizza-orange">Dream Pizza</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Create your perfect pizza in 5 easy steps
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-5xl mx-auto px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => setStep(s.num)}
                  className={`flex flex-col items-center ${
                    step === s.num ? 'scale-110' : ''
                  } transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    step > s.num 
                      ? 'bg-green-500 text-white' 
                      : step === s.num 
                        ? 'bg-pizza-orange text-white shadow-lg shadow-pizza-orange/30' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step > s.num ? <Check className="w-6 h-6" /> : s.num}
                  </div>
                  <span className={`mt-2 text-sm font-medium hidden md:block ${
                    step === s.num ? 'text-pizza-orange' : 'text-gray-500'
                  }`}>
                    {s.title}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-12 lg:w-24 h-1 mx-2 rounded-full ${
                    step > s.num ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Builder Content */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            {/* Step 1: Size & Crust */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Size</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sizes.map(size => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          selectedSize.id === size.id
                            ? 'border-pizza-orange bg-pizza-orange/5 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl font-bold text-pizza-dark">{size.size}</div>
                        <div className="text-sm text-gray-500">{size.name}</div>
                        <div className="text-lg font-bold text-pizza-orange mt-2">${size.price}</div>
                        <div className="text-xs text-gray-400">Feeds {size.feeds}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Crust</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {crusts.map(crust => (
                      <button
                        key={crust.id}
                        onClick={() => setSelectedCrust(crust)}
                        className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all duration-300 ${
                          selectedCrust.id === crust.id
                            ? 'border-pizza-orange bg-pizza-orange/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{crust.name}</span>
                        <span className="font-bold text-pizza-orange">
                          {crust.price > 0 ? `+$${crust.price}` : 'Free'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Sauce */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pick Your Sauce</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sauces.map(sauce => (
                    <button
                      key={sauce.id}
                      onClick={() => setSelectedSauce(sauce)}
                      className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                        selectedSauce.id === sauce.id
                          ? 'border-pizza-orange bg-pizza-orange/5 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div 
                        className="w-16 h-16 rounded-full shadow-inner"
                        style={{ backgroundColor: sauce.color }}
                      ></div>
                      <span className="font-medium text-gray-900 text-center">{sauce.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Cheese */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Your Cheese</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cheeses.map(cheese => (
                    <button
                      key={cheese.id}
                      onClick={() => toggleCheese(cheese.id)}
                      className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all duration-300 ${
                        selectedCheeses.includes(cheese.id)
                          ? 'border-pizza-orange bg-pizza-orange/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedCheeses.includes(cheese.id)
                            ? 'border-pizza-orange bg-pizza-orange'
                            : 'border-gray-300'
                        }`}>
                          {selectedCheeses.includes(cheese.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{cheese.name}</span>
                      </div>
                      <span className="text-sm font-bold text-pizza-orange">
                        {cheese.price > 0 ? `+$${cheese.price}` : 'Free'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Toppings */}
            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🥩 Meats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {toppings.meats.map(topping => (
                      <button
                        key={topping.id}
                        onClick={() => toggleTopping(topping.id)}
                        className={`p-3 rounded-xl border-2 flex items-center justify-between text-sm transition-all duration-300 ${
                          selectedToppings.includes(topping.id)
                            ? 'border-pizza-orange bg-pizza-orange/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{topping.name}</span>
                        <span className="font-bold text-pizza-orange">+${topping.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🥬 Veggies</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {toppings.veggies.map(topping => (
                      <button
                        key={topping.id}
                        onClick={() => toggleTopping(topping.id)}
                        className={`p-3 rounded-xl border-2 flex items-center justify-between text-sm transition-all duration-300 ${
                          selectedToppings.includes(topping.id)
                            ? 'border-pizza-orange bg-pizza-orange/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{topping.name}</span>
                        <span className="font-bold text-pizza-orange">+${topping.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Pizza</h2>
                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Size</span>
                    <span className="font-bold">{selectedSize.name} ({selectedSize.size})</span>
                  </div>
                  <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Crust</span>
                    <span className="font-bold">{selectedCrust.name}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Sauce</span>
                    <span className="font-bold">{selectedSauce.name}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Cheese</span>
                    <span className="font-bold">{selectedCheeses.map(id => cheeses.find(c => c.id === id)?.name).join(', ')}</span>
                  </div>
                  {selectedToppings.length > 0 && (
                    <div className="flex justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">Toppings</span>
                      <span className="font-bold text-right max-w-[60%]">
                        {selectedToppings.map(id => {
                          const allToppings = [...toppings.meats, ...toppings.veggies]
                          return allToppings.find(t => t.id === id)?.name
                        }).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  step === 1 
                    ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={step === 1}
              >
                Back
              </button>
              <button
                onClick={() => setStep(Math.min(5, step + 1))}
                className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                  step === 5
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-pizza-orange text-white hover:bg-pizza-red'
                }`}
              >
                {step === 5 ? 'Add to Cart' : 'Continue'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Your Pizza</h3>
              <button
                onClick={resetBuilder}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Pizza Preview */}
            <div className="relative w-full aspect-square mb-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
              <div 
                className="w-3/4 h-3/4 rounded-full shadow-inner"
                style={{ backgroundColor: selectedSauce.color + '40' }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-6xl">
                  🍕
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{selectedSize.name} Pizza</span>
                <span>${selectedSize.price}</span>
              </div>
              {selectedCrust.price > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>{selectedCrust.name}</span>
                  <span>+${selectedCrust.price}</span>
                </div>
              )}
              {selectedCheeses.map(id => {
                const cheese = cheeses.find(c => c.id === id)
                return cheese && cheese.price > 0 ? (
                  <div key={id} className="flex justify-between text-gray-600">
                    <span>{cheese.name}</span>
                    <span>+${cheese.price}</span>
                  </div>
                ) : null
              })}
              {selectedToppings.map(id => {
                const allToppings = [...toppings.meats, ...toppings.veggies]
                const topping = allToppings.find(t => t.id === id)
                return topping ? (
                  <div key={id} className="flex justify-between text-gray-600">
                    <span>{topping.name}</span>
                    <span>+${topping.price}</span>
                  </div>
                ) : null
              })}
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-center gap-4 my-6 py-4 border-y border-gray-100">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="text-3xl font-bold text-pizza-orange">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

