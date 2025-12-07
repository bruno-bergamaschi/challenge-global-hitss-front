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
  teams: Team[];
};

type GetAllTasksResponse = {
  results: Task[];
  totalCount: number;
};

export async function getAllTasks({
  pageParam = 1,
  perPage = 10,
  teamId,
}: IGetAllTasks): Promise<GetAllTasksResponse> {
  const { data } = await api.get<GetAllTasksResponse>('/tasks', {
    params: {
      page: pageParam,
      perPage,
      teamId,
    },
  });

  return data;
}

export type CreateTaskBody = Pick<Task, 'description' | 'status' | 'title'> & {
  teamIds: number[];
};

export async function getTaskById(id: number) {
  const { data } = await api.get<Task>(`/tasks/${id}`);

  return data;
}

export async function createTask(body: CreateTaskBody) {
  const response = await api.post('/tasks', body);

  return response?.data;
}

export type EditTaskBody = Pick<Task, 'status'>;

export async function editTask(body: EditTaskBody, id: number) {
  const response = await api.patch(`/tasks/${id}`, body);

  return response?.data;
}

export async function deleteTask(id: number) {
  const response = await api.delete(`/tasks/${id}`);

  return response?.data;
}
