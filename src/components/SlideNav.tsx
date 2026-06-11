import { NavLink } from 'react-router-dom';
import { Home, AlertTriangle, LayoutList, PauseCircle, BarChart3, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

const items = [
  { to: '/', icon: Home, label: 'Overview' },
  { to: '/why', icon: AlertTriangle, label: 'Why' },
  { to: '/plan', icon: LayoutList, label: 'Plan' },
  { to: '/stack', icon: Cpu, label: 'Stack' },
  { to: '/parked', icon: PauseCircle, label: 'Parked' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
];

export function SlideNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-around px-2 py-2">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
