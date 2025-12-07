import { MapPin, Phone, Mail, Clock, Users, Award, Heart } from 'lucide-react'

const teamMembers = [
  {
    name: 'Marco Rossi',
    role: 'Head Chef',
    image: '👨‍🍳',
    bio: '20 years of pizza mastery from Naples, Italy.'
  },
  {
    name: 'Sofia Chen',
    role: 'Pastry Chef',
    image: '👩‍🍳',
    bio: 'Creates our signature dessert pizzas and pastries.'
  },
  {
    name: 'Ahmed Hassan',
    role: 'Kitchen Manager',
    image: '👨‍💼',
    bio: 'Ensures every pizza meets our quality standards.'
  },
  {
    name: 'Lisa Thompson',
    role: 'Customer Experience',
    image: '👩‍💼',
    bio: 'Making sure every visit is memorable.'
  }
]

const stats = [
  { icon: Users, value: '50K+', label: 'Happy Customers' },
  { icon: Award, value: '15+', label: 'Awards Won' },
  { icon: Heart, value: '100K+', label: 'Pizzas Made' },
  { icon: Clock, value: '10+', label: 'Years Experience' },
]

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-pizza-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-24 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center">
            Our <span className="text-pizza-orange">Story</span>
          </h1>
          <p className="text-gray-300 text-xl text-center max-w-3xl mx-auto leading-relaxed">
            From a small family kitchen to your favorite pizzeria, we've been crafting 
            authentic Italian pizzas with passion and love since 2014.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-8 h-8 text-pizza-orange mx-auto mb-3" />
              <div className="text-3xl font-bold text-pizza-dark">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-pizza-dark mb-6">
              A Passion for <span className="text-pizza-orange">Perfect Pizza</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                It all started in 2014 when our founder, Marco Rossi, left his hometown 
                of Naples with a dream and his grandmother's secret pizza recipe. What 
                began as a small food truck at local farmers' markets quickly grew into 
                the beloved pizzeria you know today.
              </p>
              <p>
                We believe that great pizza starts with great ingredients. That's why we 
                source our tomatoes from San Marzano, our mozzarella from local dairy farms, 
                and our flour from a 100-year-old Italian mill. Every pizza is made fresh 
                to order in our wood-fired ovens, just like they do it in Naples.
              </p>
              <p>
                But more than just pizza, we're about community. Our restaurant has become 
                a gathering place for families, friends, and pizza lovers from all walks of 
                life. We're proud to be part of your celebrations, date nights, and everyday 
                moments.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-pizza-orange/20 to-amber-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-[150px] animate-bounce-slow">🍕</div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-pizza-orange text-white p-6 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold">Since</div>
              <div className="text-5xl font-bold">2014</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-50 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-pizza-dark mb-4 text-center">
            Meet Our <span className="text-pizza-orange">Team</span>
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            The talented people behind every delicious pizza
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pizza-orange/20 to-amber-100 rounded-full flex items-center justify-center text-5xl">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-pizza-dark">{member.name}</h3>
                <p className="text-pizza-orange font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-pizza-dark mb-4 text-center">
            Visit <span className="text-pizza-orange">Us</span>
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Come experience the warmth of our kitchen and the love in our food
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-pizza-dark text-white rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-pizza-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-gray-300">123 Pizza Street, Foodie District<br />New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-pizza-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-300">(555) 123-PIZZA</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-pizza-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-300">hello@pizzastore.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-pizza-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Hours</h4>
                  <p className="text-gray-300">
                    Mon - Thu: 11am - 10pm<br />
                    Fri - Sat: 11am - 12am<br />
                    Sunday: 12pm - 9pm
                  </p>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-3xl overflow-hidden relative min-h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-pizza-orange mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-gray-400 text-sm">123 Pizza Street, NY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pizza-orange to-pizza-red py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Taste the Difference?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Order now and experience why we're the city's favorite pizzeria
          </p>
          <button className="px-10 py-4 bg-white text-pizza-orange font-bold rounded-full text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

