export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  CONCLUDED: 'concluded',
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];
