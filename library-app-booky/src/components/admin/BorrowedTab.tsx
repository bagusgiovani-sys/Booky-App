import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdminLoans } from '@/hooks/useAdmin'
import SearchBar from '@/components/common/SearchBar'
import FilterPill from '@/components/admin/FilterPill'
import LoanCardSkeleton from '@/components/admin/LoanCardSkeleton'
import ReturnButton from '@/components/admin/ReturnButton'
import { formatDate } from '@/lib/utils'
import type { Loan } from '@/types/loan'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } as const,
}

const statusClass: Record<string, string> = {
  BORROWED: 'text-accent-green',
  RETURNED: 'text-gray-500',
  LATE: 'text-accent-red',
}

type StatusFilter = 'all' | 'active' | 'returned' | 'overdue' | undefined

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: undefined },
  { label: 'Active', value: 'active' },
  { label: 'Returned', value: 'returned' },
  { label: 'Overdue', value: 'overdue' },
]

export default function BorrowedTab() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>(undefined)
  const { data: loansData, isLoading } = useAdminLoans({ status, q: search })
  const loans = loansData?.data?.loans ?? []

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">Borrowed List</h1>
      <SearchBar value={search} onChange={setSearch} placeholder="Search" />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusFilters.map(({ label, value }) => (
          <FilterPill key={label} label={label} active={status === value} onClick={() => setStatus(value)} />
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => <LoanCardSkeleton key={i} />)}
        </div>
      ) : loans.length === 0 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-10">
          No loans found
        </motion.p>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-3">
          {(loans as Loan[]).map((loan: Loan) => (
            <motion.div key={loan.id} variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`text-sm font-bold ${statusClass[loan.status]}`}>
                    {loan.status === 'BORROWED' ? 'Active' : loan.status === 'LATE' ? 'Overdue' : 'Returned'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-500">Due Date</span>
                  <span className="text-sm font-bold text-accent-red bg-red-50 px-2.5 py-0.5 rounded-md">
                    {formatDate(loan.dueAt)}
                  </span>
                </div>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between px-5 py-3.5 gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-18 h-22 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    {loan.book?.coverImage ? (
                      <img src={loan.book.coverImage} alt={loan.book.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-primary-200">📚</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="inline-block w-fit text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300 text-gray-500">
                      {loan.book?.category?.name}
                    </span>
                    <p className="text-sm font-bold text-gray-900 truncate">{loan.book?.title}</p>
                    <p className="text-xs text-gray-500">{loan.book?.author?.name}</p>
                    <p className="text-xs text-gray-400">{formatDate(loan.borrowedAt)} · Duration {loan.durationDays} Days</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">borrower's name</p>
                    <p className="text-sm font-bold text-gray-900">{loan.user?.name}</p>
                  </div>
                  {loan.status !== 'RETURNED' && <ReturnButton loanId={loan.id} />}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
