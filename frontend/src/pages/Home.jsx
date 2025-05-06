
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      // localStorage.removeItem('user')
      // localStorage.removeItem('userId')
    }
    window.location.reload()
  }

  return (
        <>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <div className="flex items-center justify-between p-6 bg-gray-800 text-white">
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        </>
  )
}