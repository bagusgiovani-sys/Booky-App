import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'

export const useAdminUsers = (params?: {
  q?: string
  page?: number
  limit?: number
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_USERS, params],
    queryFn: async () => {
      const data = await api.get(ENDPOINTS.ADMIN_USERS, { params })
      return data
    },
  })
}
