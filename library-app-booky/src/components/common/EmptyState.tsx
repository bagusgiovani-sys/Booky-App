import { motion } from 'framer-motion'

interface Props {
  icon?: string
  title: string
  description?: string
}

export default function EmptyState({ icon = '📭', title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 gap-3 text-center"
    >
      <p className="text-4xl">{icon}</p>
      <p className="text-base font-semibold text-gray-600">{title}</p>
      {description && <p className="text-sm text-gray-400 max-w-xs">{description}</p>}
    </motion.div>
  )
}
