import { motion } from 'framer-motion';
import { IssueGrid } from '../components/IssueGrid';
import { AlertTriangle } from 'lucide-react';

export default function WhyRebuild() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <h1 className="text-2xl font-bold">Why We're Rebuilding</h1>
        </div>
        <p className="text-muted-foreground">
          23 confirmed issues across 6 categories. These are not opinions — they are confirmed bugs from the architecture audit.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: 'Critical', count: 6, color: 'bg-red-500/10 text-red-400 border-red-500/20' },
          { label: 'High', count: 9, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
          { label: 'Medium', count: 6, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
          { label: 'Low', count: 2, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
          { label: 'Categories', count: 6, color: 'bg-accent/10 text-accent border-accent/20' },
          { label: 'Total', count: 23, color: 'bg-muted text-foreground border-border' },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-lg border p-3 text-center ${item.color}`}
          >
            <p className="text-2xl font-bold">{item.count}</p>
            <p className="text-xs font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      <IssueGrid />
    </motion.div>
  );
}
