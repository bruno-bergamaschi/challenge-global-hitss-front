import { api } from './client';
import { Team } from './teams';

interface IGetAllTasks {
  pageParam?: number;
  perPage?: number;
  teamId?: number | null;
}

type TaskStatus = 'pending' | 'in_progress' | 'concluded';

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  team: Team;
};

type TasksResponse = {
  results: Task[];
  totalCount: number;
};

export async function getAllTasks({
  pageParam = 1,
  perPage = 10,
  teamId,
}: IGetAllTasks): Promise<TasksResponse> {
  const { data } = await api.get<TasksResponse>('/tasks', {
    params: {
      page: pageParam,
      perPage,
      teamId,
    },
  });

  return data;
}
