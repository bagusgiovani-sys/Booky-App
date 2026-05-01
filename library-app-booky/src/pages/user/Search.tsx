import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useBooks } from '@/hooks/useBooks'
import { ROUTES } from '@/constants'
import type { Book } from '@/types/book'
import BookCard from '@/components/common/BookCard'
import BookCardSkeleton from '@/components/common/BookCardSkeleton'
import EmptyState from '@/components/common/EmptyState'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const [page, setPage] = useState(1)

  const { data: booksData, isFetching } = useBooks({ q, page, limit: 8 })
  const books = booksData?.data?.books ?? []
  const meta = booksData?.data

  return (
    <div className="px-4 pt-4 pb-10 space-y-4">
      <div className="flex items-center gap-2">
        <Search size={18} className="text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-900">
          Results for <span className="text-primary-300">"{q}"</span>
        </h1>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <BookCardSkeleton key={i} />)}
        </div>
      ) : books.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No books found"
          description={`No results for "${q}". Try a different search.`}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {books.map((book: Book) => (
              <BookCard key={book.id} book={book} onClick={() => navigate(ROUTES.BOOK_DETAIL(book.id))} />
            ))}
          </div>
          {!!meta && meta.totalPages > page && (
            <button
              onClick={() => setPage(p => p + 1)}
              className="w-full mt-2 py-3 rounded-xl font-semibold text-sm bg-[var(--primary-200)] text-[var(--primary-300)]"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  )
}
