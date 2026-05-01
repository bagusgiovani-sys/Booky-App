import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/services/api'
import { ENDPOINTS, QUERY_KEYS } from '@/constants'

export const useAdminOverview = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_OVERVIEW],
    queryFn: () => apiGet(ENDPOINTS.ADMIN_OVERVIEW),
  })
}
