import { motion } from 'framer-motion';
import { DecisionCard } from '../components/DecisionCard';
import { Cpu } from 'lucide-react';

const DECISIONS = [
  {
    title: 'Voice Topology',
    chose: 'mediasoup SFU (Selective Forwarding Unit)',
    rejected: ['Mesh WebRTC (current)', 'Janus', 'Pion'],
    why: 'Already referenced as a stub in the backend. Node.js native, no separate process. Supports 50+ participants per router. Handles TURN relay natively. Battle-tested by Discord and Jitsi.',
  },
  {
    title: 'Frontend State',
    chose: 'Redux Toolkit partySlice',
    rejected: ['Local component state (current)', 'Zustand', 'Jotai'],
    why: 'Redux Toolkit is already used in the project (userStore, chatStore). Normalized caching, real-time socket dispatch, optimistic UI, and async thunks all fit naturally. No new dependency.',
  },
  {
    title: 'Socket Contract',
    chose: 'Session-targeted signaling (socket.id)',
    rejected: ['User-targeted signaling (user:${id})'],
    why: 'User-targeted signaling breaks when a user has multiple tabs or devices open. The WebRTC offer lands on the wrong socket. Session-targeted (socket.id) is unambiguous.',
  },
  {
    title: 'NAT Traversal',
    chose: 'TURN relay (Coturn or Metered)',
    rejected: ['STUN only (current)'],
    why: 'STUN only fails for users behind symmetric NAT (corporate networks, schools, mobile carriers). TURN relays traffic through the server when direct P2P is impossible.',
  },
  {
    title: 'Real-Time Discovery',
    chose: 'Global discovery socket room',
    rejected: ['Polling / manual refresh (current)', 'Server-Sent Events'],
    why: 'Socket.IO is already the transport for all real-time features. A global discovery room is the simplest pattern — every authenticated socket joins it, broadcasts go to all clients.',
  },
  {
    title: 'Migration Strategy',
    chose: 'Parallel run with feature flag',
    rejected: ['Hard cutover', 'Canary per user'],
    why: 'SFU is high-risk. Running mesh and SFU in parallel behind ENABLE_SFU gives an instant rollback path. Rooms ≤4 participants can stay on mesh if needed.',
  },
];

export default function Stack() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-bold">Tech Decisions</h1>
        </div>
        <p className="text-muted-foreground">
          Key architecture decisions: what we chose, what we rejected, and why.
        </p>
      </div>

      <div className="grid gap-4">
        {DECISIONS.map((decision, i) => (
          <motion.div
            key={decision.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 100, duration: 0.4 }}
          >
            <DecisionCard {...decision} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
