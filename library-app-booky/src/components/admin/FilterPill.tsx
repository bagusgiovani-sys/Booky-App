export default function FilterPill({ label, active, onClick }: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all cursor-pointer
        ${active
          ? 'bg-primary-200 border-primary-300 text-primary-300'
          : 'bg-white border-gray-200 text-gray-700'
        }`}
    >
      {label}
    </button>
  )
}
