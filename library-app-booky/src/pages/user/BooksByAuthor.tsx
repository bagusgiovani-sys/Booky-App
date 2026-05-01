import { useParams, useNavigate } from 'react-router-dom'
import { BookMarked } from 'lucide-react'
import { useAuthorBooks } from '@/hooks/useAuthors'
import { ROUTES } from '@/constants'
import type { Book } from '@/types/book'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BookCard from '@/components/common/BookCard'
import BookCardSkeleton from '@/components/common/BookCardSkeleton'
import EmptyState from '@/components/common/EmptyState'
import Skeleton from '@/components/common/Skeleton'

export default function BooksByAuthor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: authorData, isLoading } = useAuthorBooks(Number(id))
  const author = authorData?.data?.author
  const books = authorData?.data?.books ?? []

  return (
    <div className="px-4 pt-4 pb-10 space-y-6">
      {/* Author Info */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <Skeleton className="w-16 h-16 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <Avatar className="w-16 h-16">
            <AvatarImage src={author?.photo ?? ''} />
            <AvatarFallback className="text-lg font-bold bg-[var(--primary-200)] text-[var(--primary-300)]">
              {author?.name?.charAt(0).toUpperCase() ?? '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-bold text-gray-900">{author?.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <BookMarked size={14} className="text-[var(--primary-300)]" />
              <span className="text-sm text-gray-500">{books.length} books</span>
            </div>
          </div>
        </div>
      )}

      {/* Book List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Book List</h2>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(6)].map((_, i) => <BookCardSkeleton key={i} />)}
          </div>
        ) : books.length === 0 ? (
          <EmptyState icon="📚" title="No books found" description="This author has no books yet." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {books.map((book: Book) => (
              <BookCard key={book.id} book={book} onClick={() => navigate(ROUTES.BOOK_DETAIL(book.id))} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}