import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/layout/Container'
import BorrowedTab from '@/components/admin/BorrowedTab'
import UserTab from '@/components/admin/UserTab'
import BookListTab from '@/components/admin/BookListTab'

type Tab = 'borrowed' | 'user' | 'books'

const tabs: { key: Tab; label: string }[] = [
  { key: 'borrowed', label: 'Borrowed List' },
  { key: 'user', label: 'User' },
  { key: 'books', label: 'Book List' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('borrowed')

  return (
    <Container className="py-6">
      <div className="flex flex-col gap-4">
        <div className="flex bg-gray-100 rounded-full p-1">
          {tabs.map(({ key, label }) => (
            <motion.button key={key} onClick={() => setActiveTab(key)} whileTap={{ scale: 0.97 }}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer
                ${activeTab === key
                  ? 'bg-white text-primary-300 shadow-sm'
                  : 'bg-transparent text-gray-500'
                }`}>
              {label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {activeTab === 'borrowed' && <BorrowedTab />}
            {activeTab === 'user' && <UserTab />}
            {activeTab === 'books' && <BookListTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  )
}
