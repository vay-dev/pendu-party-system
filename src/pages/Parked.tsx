import { motion } from 'framer-motion';
import { ParkedTable } from '../components/ParkedTable';
import { PauseCircle } from 'lucide-react';

export default function Parked() {
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
          <PauseCircle className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Do Not Build Yet</h1>
        </div>
        <p className="text-muted-foreground">
          These features are explicitly parked until the foundation above is stable and shipped.
          Do not implement these regardless of how natural they feel to add.
        </p>
      </div>

      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
        <p className="text-sm font-medium text-red-400">
          Hard Stop — No exceptions. If a feature is on this list, it does not get built until the
          Party System v2 Definition of Done is met.
        </p>
      </div>

      <ParkedTable />
    </motion.div>
  );
}
