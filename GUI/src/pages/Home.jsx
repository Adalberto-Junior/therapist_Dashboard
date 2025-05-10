
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
          <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6">
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </div>
          </div>
        </>
  )
}