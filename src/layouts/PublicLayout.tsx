import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

export default function PublicLayout() {
  return (
    <div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
        <Chatbot />
      </main>
      <Footer />
    </div>
  )
} 