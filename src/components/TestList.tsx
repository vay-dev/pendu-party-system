import { CheckCircle2, Circle } from 'lucide-react';
import type { Test } from '../types';
import { cn } from '../lib/utils';

interface TestListProps {
  tests: Test[];
}

export function TestList({ tests }: TestListProps) {
  return (
    <div className="space-y-2">
      {tests.map((test) => (
        <div
          key={test.id}
          className={cn(
            'flex items-start gap-3 rounded-lg border p-3',
            test.passed
              ? 'border-green-500/20 bg-green-500/5'
              : 'border-border bg-card/50'
          )}
        >
          <div className="mt-0.5 shrink-0">
            {test.passed ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                'text-sm font-medium',
                test.passed ? 'text-green-400' : 'text-foreground'
              )}
            >
              {test.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {test.passed ? 'Passed' : 'Not yet tested'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
