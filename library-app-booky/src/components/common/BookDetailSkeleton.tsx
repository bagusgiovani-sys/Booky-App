import { motion } from 'framer-motion'

export default function BookDetailSkeleton() {
  return (
    <div className="space-y-6 px-4 pt-4 pb-28">
      {/* Cover */}
      <div className="w-full max-w-[200px] mx-auto aspect-[3/4] rounded-2xl bg-gray-100 overflow-hidden">
        <motion.div
          className="w-full h-full bg-gray-200"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Title + author block */}
      <div className="space-y-3">
        {[
          { w: '30%', h: '20px' },
          { w: '70%', h: '28px' },
          { w: '45%', h: '16px' },
        ].map(({ w, h }, i) => (
          <motion.div
            key={i}
            className="bg-gray-100 rounded-xl"
            style={{ width: w, height: h }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 py-3">
            <motion.div
              className="bg-gray-100 rounded-lg w-10 h-6"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            />
            <motion.div
              className="bg-gray-100 rounded w-8 h-3"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.05 }}
            />
          </div>
        ))}
      </div>

      {/* Description lines */}
      <div className="space-y-2">
        {['100%', '90%', '75%'].map((w, i) => (
          <motion.div
            key={i}
            className="bg-gray-100 rounded h-4"
            style={{ width: w }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
          />
        ))}
      </div>
    </div>
  )
}
