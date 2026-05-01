import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdminUsers } from '@/hooks/useAdmin'
import SearchBar from '@/components/common/SearchBar'
import Skeleton from '@/components/common/Skeleton'
import { formatDateTime } from '@/lib/utils'
import type { User } from '@/types/user'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } as const,
}

export default function UserTab() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const limit = 10
  const { data: usersData, isLoading } = useAdminUsers({ q: search, page, limit })
  const users = usersData?.data?.users ?? []
  const meta = usersData?.data

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">User</h1>
      <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Search user" />

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2 border-b border-gray-100 pb-4">
              {[...Array(5)].map((__, j) => (
                <div key={j} className="flex justify-between items-center">
                  <Skeleton className="w-20 h-3.5" />
                  <Skeleton className="w-36 h-3.5" />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-10">
          No users found
        </motion.p>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-4">
          {(users as User[]).map((user: User, index: number) => (
            <motion.div key={user.id} variants={itemVariants}
              className="flex flex-col gap-2 border-b border-gray-100 pb-4">
              {[
                { label: 'No', value: (page - 1) * limit + index + 1 },
                { label: 'Name', value: user.name },
                { label: 'Email', value: user.email },
                { label: 'Nomor Handphone', value: user.phone ?? '-' },
                { label: 'Created at', value: formatDateTime(user.createdAt) },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{label}</span>
                  <span className="text-sm font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      )}

      {!!meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="text-sm text-gray-500 disabled:opacity-40 cursor-pointer">
            ‹ Previous
          </button>
          {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-full text-sm font-semibold cursor-pointer transition-colors
                ${page === p ? 'bg-primary-300 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              {p}
            </button>
          ))}
          {meta.totalPages > 5 && <span className="text-gray-400">...</span>}
          <button onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))} disabled={page === meta.totalPages}
            className="text-sm text-gray-500 disabled:opacity-40 cursor-pointer">
            Next ›
          </button>
        </div>
      )}
    </div>
  )
}
