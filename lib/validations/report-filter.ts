import { z } from 'zod';
export const reportFilterSchema = z.object({
  dateRange: z.object({ from: z.date(), to: z.date() }),
  reportType: z.enum(['attendance', 'performance', 'activity', 'engagement']),
  groupBy: z.enum(['day', 'week', 'month', 'quarter']).default('month'),
  memberFilter: z.array(z.string()).optional(),
  exportFormat: z.enum(['csv', 'pdf', 'xlsx']).optional(),
}).refine(d => d.dateRange.to >= d.dateRange.from, { message: 'Invalid date range', path: ['dateRange'] });
export type ReportFilterData = z.infer<typeof reportFilterSchema>;
