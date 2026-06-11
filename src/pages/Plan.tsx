import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { GroupCard } from '../components/GroupCard';
import { LayoutList } from 'lucide-react';

export default function Plan() {
  const { data, loading } = useProgress();

  if (loading || !data) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

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
          <LayoutList className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-bold">The Plan</h1>
        </div>
        <p className="text-muted-foreground">
          {data.groups.length} implementation groups. Do not deviate from dependency order.
        </p>
      </div>

      <div className="grid gap-4">
        {data.groups.map((group, i) => (
          <GroupCard key={group.id} group={group} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
