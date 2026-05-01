import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { Author, PopularAuthor } from '@/types/author'
import type { Book } from '@/types/book'
import type { ApiResponse, PageMeta } from '@/types/api'

export const useAuthors = (q?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTHORS, q],
    queryFn: () => apiGet<ApiResponse<{ authors: Author[] } & PageMeta>>(ENDPOINTS.AUTHORS, { params: { q } }),
  })
}

export const usePopularAuthors = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTHORS_POPULAR],
    queryFn: async (): Promise<PopularAuthor[]> => {
      const data = await apiGet<ApiResponse<{ authors: PopularAuthor[] }>>(ENDPOINTS.AUTHORS_POPULAR, { params: { limit } })
      return data.data.authors
    },
  })
}

export const useAuthorBooks = (id: number, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTHOR_BOOKS, id, params],
    queryFn: () => apiGet<ApiResponse<{ author: Author; books: Book[] } & PageMeta>>(ENDPOINTS.AUTHOR_BOOKS(id), { params }),
    enabled: !!id,
  })
}
