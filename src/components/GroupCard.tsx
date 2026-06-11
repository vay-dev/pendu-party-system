import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import type { Group } from '../types';
import { cn } from '../lib/utils';
import { Users, Clock, CheckCircle2 } from 'lucide-react';

interface GroupCardProps {
  group: Group;
  index: number;
}

const statusConfig = {
  done: { variant: 'done' as const, label: 'Done', icon: CheckCircle2 },
  'in-progress': { variant: 'in-progress' as const, label: 'In Progress', icon: Clock },
  blocked: { variant: 'blocked' as const, label: 'Blocked', icon: Clock },
  'not-started': { variant: 'not-started' as const, label: 'Not Started', icon: Clock },
};

export function GroupCard({ group, index }: GroupCardProps) {
  const doneCount = group.steps.filter((s) => s.done).length;
  const totalSteps = group.steps.length;
  const doneTests = group.tests.filter((t) => t.passed).length;
  const totalTests = group.tests.length;
  const config = statusConfig[group.status];
  const StatusIcon = config.icon;

  const ownerLabel = group.owner === 'samuel' ? 'Samuel' : 'Partner';

  return (
    <Link to={`/group/${group.id}`}>
      <Card
        className={cn(
          'group cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5',
          'animate-slideIn'
        )}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold group-hover:text-accent transition-colors">
                {group.title}
              </CardTitle>
              <CardDescription className="text-xs">
                Fixes: {group.fixes.join(', ')}
              </CardDescription>
            </div>
            <Badge variant={config.variant} className="shrink-0">
              <StatusIcon className="mr-1 h-3 w-3" />
              {config.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={doneCount} max={totalSteps} />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {doneCount}/{totalSteps} steps
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {doneTests}/{totalTests} tests
              </span>
            </div>
            <span className="font-medium text-foreground/70">{ownerLabel}</span>
          </div>
          {group.dependsOn.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {group.dependsOn.map((dep) => (
                <span
                  key={dep}
                  className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  needs {dep}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
