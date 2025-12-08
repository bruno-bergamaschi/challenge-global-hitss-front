import { TaskEntitySchema } from '@/schemas/task.schema';
import { TeamEntitySchema } from '@/schemas/team.schema';
import { api } from './client';

interface IGetAllTasks {
  pageParam?: number;
  perPage?: number;
  teamId?: number | null;
}

type GetAllTasksResponse = {
  results: TeamEntitySchema[];
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

export async function getTaskById(id: number) {
  const { data } = await api.get<TaskEntitySchema>(`/tasks/${id}`);

  return data;
}

export type CreateTaskBody = Pick<
  TaskEntitySchema,
  'description' | 'status' | 'title'
> & {
  teamIds: number[];
};

export async function createTask(body: CreateTaskBody) {
  const response = await api.post('/tasks', body);

  return response?.data;
}

export type EditTaskBody = Pick<TaskEntitySchema, 'status'>;

export async function editTask(body: EditTaskBody, id: number) {
  const response = await api.patch(`/tasks/${id}`, body);

  return response?.data;
}

export async function deleteTask(id: number) {
  const response = await api.delete(`/tasks/${id}`);

  return response?.data;
}
