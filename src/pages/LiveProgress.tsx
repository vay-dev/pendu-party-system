import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { ProgressChart } from '../components/ProgressChart';
import { Progress } from '../components/ui/progress';
import { BarChart3, Users, CalendarDays } from 'lucide-react';

export default function LiveProgress() {
  const { data, loading } = useProgress();

  if (loading || !data) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const totalSteps = data.groups.reduce((sum, g) => sum + g.steps.length, 0);
  const doneSteps = data.groups.reduce((sum, g) => sum + g.steps.filter((s) => s.done).length, 0);
  const totalTests = data.groups.reduce((sum, g) => sum + g.tests.length, 0);
  const passedTests = data.groups.reduce((sum, g) => sum + g.tests.filter((t) => t.passed).length, 0);

  const perOwner = Object.entries(data.owners).map(([key, name]) => {
    const ownerGroups = data.groups.filter((g) => g.owner === key);
    const ownerSteps = ownerGroups.reduce((sum, g) => sum + g.steps.length, 0);
    const ownerDone = ownerGroups.reduce((sum, g) => sum + g.steps.filter((s) => s.done).length, 0);
    return { name, steps: ownerSteps, done: ownerDone, groups: ownerGroups.length };
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-24"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-bold">Live Progress</h1>
        </div>
        <p className="text-muted-foreground">
          Steps done vs total per group. Per-owner breakdown and estimated completion.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs font-medium">Steps</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {doneSteps}/{totalSteps}
          </p>
          <Progress value={doneSteps} max={totalSteps} className="mt-2" />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs font-medium">Tests</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {passedTests}/{totalTests}
          </p>
          <Progress value={passedTests} max={totalTests} className="mt-2" />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span className="text-xs font-medium">Last Updated</span>
          </div>
          <p className="mt-2 text-lg font-bold">{data.lastUpdated}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="mb-4 text-lg font-semibold">Per-Group Breakdown</h2>
        <ProgressChart groups={data.groups} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Per-Owner Breakdown</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {perOwner.map((owner) => (
            <div
              key={owner.name}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{owner.name}</span>
                <span className="text-xs text-muted-foreground">{owner.groups} groups</span>
              </div>
              <p className="mt-2 text-2xl font-bold">
                {owner.done}/{owner.steps}
              </p>
              <Progress value={owner.done} max={owner.steps} className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
