import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { CalendarDays, Layers, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function Overview() {
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
  const inProgress = data.groups.filter((g) => g.status === 'in-progress').length;
  const notStarted = data.groups.filter((g) => g.status === 'not-started').length;
  const blocked = data.groups.filter((g) => g.status === 'blocked').length;
  const percent = Math.round((doneSteps / totalSteps) * 100);

  const stats = [
    { label: 'Total Steps', value: totalSteps, icon: Layers, color: 'text-accent' },
    { label: 'Completed', value: doneSteps, icon: CheckCircle2, color: 'text-green-400' },
    { label: 'In Progress', value: inProgress, icon: Clock, color: 'text-yellow-400' },
    { label: 'Not Started', value: notStarted, icon: AlertTriangle, color: 'text-gray-400' },
    { label: 'Tests Passed', value: `${passedTests}/${totalTests}`, icon: CheckCircle2, color: 'text-green-400' },
    { label: 'Blocked', value: blocked, icon: AlertTriangle, color: 'text-red-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-24"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{data.project}</h1>
        <p className="text-muted-foreground">
          Rebuilding the Pendu Party System from Sprint 1 into a production-grade feature.
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          Last updated: {data.lastUpdated}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Overall Progress</span>
          <span className="font-bold text-accent">{percent}%</span>
        </div>
        <Progress value={doneSteps} max={totalSteps} />
        <p className="text-xs text-muted-foreground">
          {doneSteps} of {totalSteps} steps completed across {data.groups.length} groups
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/20"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs font-medium">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Owner Breakdown</h2>
        <div className="flex gap-3">
          {Object.entries(data.owners).map(([key, name]) => (
            <div
              key={key}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {key[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground capitalize">{key}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="mb-3 text-lg font-semibold">Quick Status</h2>
        <div className="flex flex-wrap gap-2">
          {data.groups.map((g) => (
            <Badge
              key={g.id}
              variant={
                g.status === 'done'
                  ? 'done'
                  : g.status === 'in-progress'
                  ? 'in-progress'
                  : g.status === 'blocked'
                  ? 'blocked'
                  : 'not-started'
              }
            >
              {g.title}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
