import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { groupBy } from '@/lib/utils';
import { Project } from '@/types/project';
import { Transaksi } from '@/types/transaksi';
import { usePage } from '@inertiajs/react';

export const description = 'A pie chart with a label list';

const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
  'var(--chart-8)',
  'var(--chart-9)',
  'var(--chart-10)',
];

const TransaksiGroupChart = () => {
  const { transaksis = [] } = usePage<{ transaksis: Transaksi[]; project: Project }>().props;

  // Generate dynamic chartConfig based on unique tags
  const uniqueTags = Array.from(new Set(transaksis.map((t) => String(t.tags))));

  const chartConfig = uniqueTags.reduce<Record<string, { label: string; color: string }>>((config, tag, index) => {
    return {
      ...config,
      [String(tag)]: {
        label: String(tag),
        color: chartColors[index % chartColors.length],
      },
    };
  }, {});

  // const totalCount = transaksis.length;
  const totalPrice = transaksis.reduce((sum, t) => sum + (t.price || 0), 0);
  const chartData = Object.entries(groupBy(transaksis, 'tags')).map(([tag, items]) => {
    const groupTotal = items.reduce((sum, t) => sum + (t.price || 0), 0);
    const percentage = (groupTotal / totalPrice) * 100;

    return {
      tag: tag,
      count: groupTotal,
      percent: `${percentage.toFixed()}%`,
      fill: chartConfig[tag]?.color,
    };
  });

  return (
    <Card className="flex flex-1 flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] [&_.recharts-text]:fill-background">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="tag" />} />
            <Pie data={chartData} dataKey="count" nameKey={'tags'} format={'percent'}>
              <LabelList dataKey="percent" className="fill-background" stroke={'transparent'} fontSize={12} />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="tag" />} className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TransaksiGroupChart;
