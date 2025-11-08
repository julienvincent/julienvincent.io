import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '../ui/chart';
import { Area, AreaChart, ReferenceLine, XAxis, YAxis } from 'recharts';
import * as date from 'date-fns';

type Metric = { date: string; value: number; reference?: string };

type Props = {
  source: string;
  references?: string[];
};

export function MetricChart(props: Props) {
  const [data, setData] = React.useState<Metric[]>([]);
  const [domain, setDomain] = React.useState([0, 10000]);

  React.useEffect(() => {
    fetch(props.source, {
      cache: 'default',
    })
      .then((res) => res.json())
      .then((res: Metric[]) => {
        const values = res.map((datum) => datum.value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        setData(res);
        setDomain([min, max]);
      });
  }, []);

  const references = React.useMemo(() => {
    return data.filter((metric) => {
      return metric.reference && props.references?.includes(metric.reference);
    });
  }, [data]);

  const config = {
    value: {
      label: 'value',
      color: 'var(--chart-1)',
    },
    reference: {
      label: 'reference',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="min-h-[200px] w-full border-2 bg-code-background mb-5"
    >
      <AreaChart
        data={data as any}
        margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
      >
        <XAxis
          dataKey="date"
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            return date.format(value, 'MM/dd');
          }}
        />

        <YAxis
          axisLine={false}
          domain={[domain[0] - 100, 'dataMax']}
          allowDataOverflow={true}
        />

        <ChartTooltip
          isAnimationActive={false}
          content={
            <ChartTooltipContent
              className="border-2 border-accent-secondary -rounded-sm"
              labelFormatter={(v) => date.format(v as number, 'MM/dd HH:mm')}
              formatter={(value) => {
                const val =
                  typeof value === 'number' ? value.toFixed(0) : value;

                return <p className="font-bold text-accent">{val}mV</p>;
              }}
            />
          }
        />

        <Area
          isAnimationActive={false}
          dataKey="value"
          type="natural"
          fill="var(--chart-3)"
          fillOpacity={0.1}
          stroke="var(--chart-1)"
          strokeWidth={3}
          dot={false}
          activeDot={{
            r: 6,
            stroke: 'var(--color-card)',
            fill: 'var(--color-accent)',
            strokeWidth: 3,
          }}
        />

        {references.map((metric, i) => {
          return (
            <ReferenceLine
              key={i}
              x={metric.date}
              stroke="var(--chart-2)"
              strokeWidth={2}
              strokeOpacity={0.7}
            />
          );
        })}
      </AreaChart>
    </ChartContainer>
  );
}
