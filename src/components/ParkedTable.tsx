import { PauseCircle } from 'lucide-react';

interface ParkedItem {
  feature: string;
  reason: string;
}

const PARKED: ParkedItem[] = [
  { feature: 'Tournament integration', reason: 'Requires Party system to be stable first. Spec separately.' },
  { feature: 'POV streaming / screen share', reason: 'Requires SFU to be fully live and tested at scale.' },
  { feature: 'Gifts economy', reason: 'Fields exist in schema, not implemented. Needs product spec first.' },
  { feature: 'Party → Group Chat thread integration', reason: 'Schema field exists. Needs product decision on depth.' },
  { feature: 'Admin/moderation dashboard', reason: 'Audit log exists. Dashboard is a separate product surface.' },
  { feature: 'Regional routing / CDN voice', reason: 'Not needed until user base scales beyond ~1,000 concurrent.' },
  { feature: 'Bandwidth estimation / ABR', reason: 'Nice-to-have. Build after SFU is live and stable for 30 days.' },
  { feature: 'Password-protected rooms', reason: 'No product spec. Do not invent the feature.' },
  { feature: 'Party analytics dashboard', reason: 'Fields exist but analytics UI is not specced.' },
  { feature: 'Push notifications for party invites', reason: 'Separate notification system concern. Not party-specific.' },
];

export function ParkedTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-4 py-3 font-semibold text-foreground">Feature</th>
            <th className="px-4 py-3 font-semibold text-foreground">Reason Parked</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {PARKED.map((item) => (
            <tr key={item.feature} className="bg-card/50 transition-colors hover:bg-muted/30">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <PauseCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="font-medium text-foreground">{item.feature}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{item.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
