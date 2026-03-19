import { Task } from '@/types/task';
import { TaskStats } from '@/types/statistics';

export function calculateTaskStats(tasks: Task[]): TaskStats {
  const now = new Date();

  const completed = tasks.filter((task) => task.status === 'done').length;
  const overdue = tasks.filter(
    (task) =>
      task.status !== 'done' &&
      task.dueDate &&
      new Date(task.dueDate) < now
  ).length;

  const completionRate = tasks.length > 0
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return {
    total: tasks.length,
    completed,
    overdue,
    completionRate,
  };
}
