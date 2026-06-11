import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { StepList } from '../components/StepList';
import { TestList } from '../components/TestList';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, CheckCircle2, Clock, Users, Link2 } from 'lucide-react';


export default function GroupDetail() {
  const { id } = useParams<{ id: string }>();
  const { data } = useProgress();

  const group = data?.groups.find((g) => g.id === id);

  if (!group) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 pb-24">
        <p className="text-muted-foreground">Group not found</p>
        <Link to="/plan" className="text-accent hover:underline">
          Back to Plan
        </Link>
      </div>
    );
  }

  const doneSteps = group.steps.filter((s) => s.done).length;
  const totalSteps = group.steps.length;
  const doneTests = group.tests.filter((t) => t.passed).length;
  const totalTests = group.tests.length;

  const statusConfig = {
    done: { variant: 'done' as const, label: 'Done', icon: CheckCircle2 },
    'in-progress': { variant: 'in-progress' as const, label: 'In Progress', icon: Clock },
    blocked: { variant: 'blocked' as const, label: 'Blocked', icon: Clock },
    'not-started': { variant: 'not-started' as const, label: 'Not Started', icon: Clock },
  };
  const config = statusConfig[group.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24"
    >
      <div className="flex items-center gap-3">
        <Link
          to="/plan"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{group.title}</h1>
          <p className="text-xs text-muted-foreground">
            Owner: {group.owner === 'samuel' ? 'Samuel' : 'Partner'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={config.variant}>
          <StatusIcon className="mr-1 h-3 w-3" />
          {config.label}
        </Badge>
        <Badge variant="default">{group.fixes.length} fixes</Badge>
      </div>

      {group.dependsOn.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link2 className="h-4 w-4" />
          <span>Depends on:</span>
          {group.dependsOn.map((dep) => {
            const depGroup = data?.groups.find((g) => g.id === dep);
            return (
              <Link
                key={dep}
                to={`/group/${dep}`}
                className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground hover:bg-accent/20"
              >
                {depGroup?.title ?? dep}
              </Link>
            );
          })}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {doneSteps}/{totalSteps}
            </div>
            <Progress value={doneSteps} max={totalSteps} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4" />
              Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {doneTests}/{totalTests}
            </div>
            <Progress value={doneTests} max={totalTests} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Implementation Steps</h2>
        <StepList steps={group.steps} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Test Checklist</h2>
        <TestList tests={group.tests} />
      </div>
    </motion.div>
  );
}
