import { toast } from 'sonner'
import { useAdminUpdateLoan } from '@/hooks/useAdmin'

export default function ReturnButton({ loanId }: { loanId: number }) {
  const { mutate: updateLoan, isPending } = useAdminUpdateLoan(loanId)
  return (
    <button
      onClick={() => updateLoan(
        { status: 'RETURNED' },
        {
          onSuccess: () => toast.success('Book returned'),
          onError: () => toast.error('Failed to return book'),
        }
      )}
      disabled={isPending}
      className="text-xs font-semibold px-3 py-1 rounded-full border border-accent-green text-accent-green hover:bg-accent-green hover:text-white transition-colors disabled:opacity-50"
    >
      {isPending ? 'Returning...' : 'Return'}
    </button>
  )
}
