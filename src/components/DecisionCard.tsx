import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';

interface DecisionCardProps {
  title: string;
  chose: string;
  rejected: string[];
  why: string;
}

export function DecisionCard({ title, chose, rejected, why }: DecisionCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Chose</p>
            <p className="text-sm font-medium text-foreground">{chose}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Rejected</p>
            <p className="text-sm text-foreground">{rejected.join(', ')}</p>
          </div>
        </div>
        <div className="rounded-md bg-muted/50 p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Why</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{why}</p>
        </div>
      </CardContent>
    </Card>
  );
}
