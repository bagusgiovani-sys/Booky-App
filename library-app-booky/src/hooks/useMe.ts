import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch } from "@/services/api";
import { ENDPOINTS, QUERY_KEYS } from "@/constants";
import type { User, UpdateProfilePayload } from "@/types/user";
import type { Loan } from "@/types/loan";
import type { Review } from "@/types/review";
import type { ApiResponse, PageMeta } from "@/types/api";

export const useMe = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: () => apiGet<ApiResponse<{ user: User }>>(ENDPOINTS.ME),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => apiPatch(ENDPOINTS.ME, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ME] });
    },
  });
};

export const useMyLoansProfile = (params?: {
  status?: "BORROWED" | "LATE" | "RETURNED";
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME_LOANS, params],
    queryFn: () => apiGet<ApiResponse<{ loans: Loan[] } & PageMeta>>(ENDPOINTS.ME_LOANS, { params }),
  });
};

export const useMyReviews = (params?: {
  q?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME_REVIEWS, params],
    queryFn: () => apiGet<ApiResponse<{ reviews: Review[] } & PageMeta>>(ENDPOINTS.ME_REVIEWS, { params }),
  });
};
