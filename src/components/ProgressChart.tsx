import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Group } from '../types';

interface ProgressChartProps {
  groups: Group[];
}

export function ProgressChart({ groups }: ProgressChartProps) {
  const data = groups.map((g) => {
    const doneSteps = g.steps.filter((s) => s.done).length;
    const totalSteps = g.steps.length;
    const doneTests = g.tests.filter((t) => t.passed).length;
    const totalTests = g.tests.length;
    return {
      name: g.title.replace(' (Web)', '').replace(' (Flutter)', '').replace(' (mediasoup)', ''),
      stepsDone: doneSteps,
      stepsTotal: totalSteps - doneSteps,
      testsDone: doneTests,
      testsTotal: totalTests - doneTests,
    };
  });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
          <XAxis
            dataKey="name"
            stroke="#a3a3a3"
            fontSize={11}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis stroke="#a3a3a3" fontSize={11} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#171717',
              border: '1px solid #262626',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            itemStyle={{ color: '#fafafa' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="stepsDone" name="Steps Done" stackId="steps" fill="#7c3aed" radius={[4, 4, 0, 0]} />
          <Bar dataKey="stepsTotal" name="Steps Remaining" stackId="steps" fill="#3a3a3a" />
          <Bar dataKey="testsDone" name="Tests Passed" stackId="tests" fill="#22c55e" />
          <Bar dataKey="testsTotal" name="Tests Remaining" stackId="tests" fill="#525252" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
