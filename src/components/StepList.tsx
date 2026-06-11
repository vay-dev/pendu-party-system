import { CheckCircle2, Circle } from 'lucide-react';
import type { Step } from '../types';
import { cn } from '../lib/utils';

interface StepListProps {
  steps: Step[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <div
          key={step.id}
          className={cn(
            'flex items-start gap-3 rounded-lg border p-3 transition-colors',
            step.done
              ? 'border-green-500/20 bg-green-500/5'
              : 'border-border bg-card/50'
          )}
        >
          <div className="mt-0.5 shrink-0">
            {step.done ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                'text-sm font-medium',
                step.done ? 'text-green-400 line-through decoration-green-400/40' : 'text-foreground'
              )}
            >
              {step.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Owner: {step.owner === 'samuel' ? 'Samuel' : 'Partner'} · Step {i + 1}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
