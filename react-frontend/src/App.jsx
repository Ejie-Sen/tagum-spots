import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import MoodSelector from './components/MoodSelector'
import Modal from './components/Modal'
import CardsGrid from './components/CardsGrid'
import Admin from './components/Admin'
import Footer from './components/Footer'
import './index.css'

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const isPhantomAccess = urlParams.get('override') === 'admin';

  const [shops, setShops] = useState([])
  const [currentMood, setCurrentMood] = useState('work')
  const [selectedShop, setSelectedShop] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // --- THE NEW SEARCH ENGINE STATE ---
  const [searchQuery, setSearchQuery] = useState('')

  const [view, setView] = useState(isPhantomAccess ? 'admin' : 'app') 

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const response = await fetch(`${API_URL}/api/shops`);
        if (!response.ok) throw new Error('Network response failed')
        const data = await response.json()
        setShops(data)
      } catch (error) {
        console.error("Database connection failed:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchShops()
  }, [])

  // --- THE UPGRADED FILTER ENGINE ---
  const filteredShops = shops.filter(shop => {
    if (searchQuery.trim() !== '') {
      // Global Search: Ignore mood, search by name or tagline
      const q = searchQuery.toLowerCase();
      return shop.name.toLowerCase().includes(q) || 
             shop.tagline.toLowerCase().includes(q);
    }
    // Default Behavior: Filter by selected mood
    return shop.mood === currentMood;
  });

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading Database...</div>

  if (view === 'admin') {
    return <Admin setView={setView} />
  }

  return (
    <>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <MoodSelector currentMood={currentMood} setCurrentMood={setCurrentMood} />
      <CardsGrid 
        shops={filteredShops} 
        currentMood={currentMood} 
        searchQuery={searchQuery} 
        openModal={setSelectedShop} 
      />
      <Modal 
        shop={selectedShop} 
        closeModal={() => setSelectedShop(null)} 
      />
      <Footer />
    </>
  )
}

export default App