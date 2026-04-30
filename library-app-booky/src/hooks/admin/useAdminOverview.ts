import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'

export const useAdminOverview = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_OVERVIEW],
    queryFn: async () => {
      const data = await api.get(ENDPOINTS.ADMIN_OVERVIEW)
      return data
    },
  })
}
