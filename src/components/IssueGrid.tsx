import { ISSUES } from '../types';
import { cn } from '../lib/utils';


const severityLabel = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
const severityColor = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  high: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

const categoryColor: Record<string, string> = {
  Discovery: 'text-pink-400',
  Lifecycle: 'text-cyan-400',
  Voice: 'text-violet-400',
  Moderation: 'text-amber-400',
  Data: 'text-emerald-400',
  Frontend: 'text-sky-400',
};

export function IssueGrid() {
  const severities = ['critical', 'high', 'medium', 'low'] as const;

  return (
    <div className="space-y-6">
      {severities.map((sev) => {
        const issues = ISSUES.filter((i) => i.severity === sev);
        return (
          <div key={sev}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {severityLabel[sev]} ({issues.length})
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className={cn(
                    'rounded-lg border p-3 transition-all hover:border-accent/30',
                    severityColor[issue.severity]
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold opacity-70">{issue.id}</span>
                    <span className={cn('text-[10px] font-medium uppercase', categoryColor[issue.category])}>
                      {issue.category}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium leading-snug">{issue.title}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
