import type { Task } from '@/types';
import type { TaskBreakdownItemProps } from './TaskBreakdownItem';
import { TaskBreakdownItem } from './TaskBreakdownItem';

export interface TaskBreakdownProps {
  tasks: Task[];
}

export function TaskBreakdown({ tasks }: TaskBreakdownProps) {
  const getTaskCountByStatus = (status: string) =>
    tasks.filter((task) => task.status === status).length;

  const breakdownItems: TaskBreakdownItemProps[] = [
    {
      label: 'To Do',
      count: getTaskCountByStatus('TODO'),
      borderColor: 'border-gray-300',
      bgColor: 'bg-gray-50',
    },
    {
      label: 'In Progress',
      count: getTaskCountByStatus('IN_PROGRESS'),
      borderColor: 'border-yellow-300',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Completed',
      count: getTaskCountByStatus('DONE'),
      borderColor: 'border-green-300',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="space-y-6">
      {breakdownItems.map((item) => (
        <TaskBreakdownItem key={item.label} {...item} />
      ))}
    </div>
  );
}
