import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, MoreVertical } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdminBooks, useDeleteBook } from '@/hooks/useAdmin'
import DeleteBookModal from '@/components/admin/DeleteBookModal'
import FilterPill from '@/components/admin/FilterPill'
import BookRowSkeleton from '@/components/admin/BookRowSkeleton'
import SearchBar from '@/components/common/SearchBar'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import type { Book } from '@/types/book'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } as const,
}

type StatusFilter = 'all' | 'available' | 'borrowed' | 'returned' | undefined

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: undefined },
  { label: 'Available', value: 'available' },
  { label: 'Borrowed', value: 'borrowed' },
  { label: 'Returned', value: 'returned' },
]

export default function BookListTab() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>(undefined)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const { data: booksData, isLoading } = useAdminBooks({ q: search, status })
  const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook()
  const books = booksData?.data?.books ?? []

  const handleConfirmDelete = () => {
    if (!deleteId) return
    deleteBook(deleteId, {
      onSuccess: () => { toast.success('Book deleted'); setDeleteId(null) },
      onError: () => { toast.error('Failed to delete book'); setDeleteId(null) },
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <DeleteBookModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
      />

      <h1 className="text-2xl font-bold text-gray-900">Book List</h1>

      <div>
        <Button onClick={() => navigate('/admin/books/new')}
          className="w-full md:w-auto md:px-8 rounded-full font-semibold">
          Add Book
        </Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search book" />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusFilters.map(({ label, value }) => (
          <FilterPill key={label} label={label} active={status === value} onClick={() => setStatus(value)} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          [...Array(4)].map((_, i) => <BookRowSkeleton key={i} />)
        ) : books.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-10">
            No books found
          </motion.p>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            {(books as Book[]).map((book: Book, idx: number) => (
              <motion.div key={book.id} variants={itemVariants}
                className={`flex items-center gap-4 px-5 py-4 ${idx !== books.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="w-14 h-18 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl bg-primary-200">📚</div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="inline-block w-fit text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 bg-gray-50">
                    {book.category?.name}
                  </span>
                  <p className="text-sm font-bold text-gray-900 truncate">{book.title}</p>
                  <p className="text-xs text-gray-500">{book.author?.name}</p>
                  <div className="flex items-center gap-1 pt-0.5">
                    <Star size={12} fill="#fdb022" color="#fdb022" />
                    <span className="text-xs font-semibold text-gray-700">{book.rating?.toFixed(1)}</span>
                  </div>
                </div>

                {/* Mobile 3-dot menu */}
                <div className="relative md:hidden">
                  <button onClick={() => setOpenMenuId(openMenuId === book.id ? null : book.id)}
                    className="p-1 text-gray-400 cursor-pointer">
                    <MoreVertical size={18} />
                  </button>
                  <AnimatePresence>
                    {openMenuId === book.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-8 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[99] w-32">
                        <button onClick={() => { navigate(ROUTES.ADMIN_BOOK_PREVIEW(book.id)); setOpenMenuId(null) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Preview</button>
                        <button onClick={() => { navigate(ROUTES.ADMIN_BOOK_EDIT(book.id)); setOpenMenuId(null) }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Edit</button>
                        <button onClick={() => { setDeleteId(book.id); setOpenMenuId(null) }}
                          className="w-full text-left px-4 py-2 text-sm text-accent-red hover:bg-red-50 cursor-pointer">Delete</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop action buttons */}
                <div className="hidden md:flex items-center gap-2 shrink-0">
                  <button onClick={() => navigate(ROUTES.ADMIN_BOOK_PREVIEW(book.id))}
                    className="px-5 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                    Preview
                  </button>
                  <button onClick={() => navigate(ROUTES.ADMIN_BOOK_EDIT(book.id))}
                    className="px-5 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                    Edit
                  </button>
                  <button onClick={() => setDeleteId(book.id)}
                    className="px-5 py-2 rounded-full text-sm font-medium border border-accent-red text-accent-red hover:bg-red-50 transition-colors cursor-pointer">
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
