import { TeamEntitySchema } from '@/schemas/team.schema';
import { api } from './client';

type TeamsResponse = {
  results: TeamEntitySchema[];
  totalCount: number;
};

export async function getAllTeams({
  pageParam = 1,
  perPage = 10,
  search,
}: {
  pageParam?: number;
  perPage?: number;
  search?: string;
}): Promise<TeamsResponse> {
  const { data } = await api.get<TeamsResponse>('/teams', {
    params: {
      page: pageParam,
      perPage,
      search,
    },
  });

  return data;
}

export type CreateTeamBody = Pick<TeamEntitySchema, 'name' | 'color'>;

export async function createTeam(body: CreateTeamBody) {
  const response = await api.post('/teams', body);

  return response?.data;
}
