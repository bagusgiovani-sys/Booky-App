import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'
import type { Category } from '@/types/category'
import type { ApiResponse } from '@/types/api'

export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async (): Promise<Category[]> => {
      const data = await apiGet<ApiResponse<{ categories: Category[] }>>(ENDPOINTS.CATEGORIES)
      return data.data.categories
    },
  })
}
