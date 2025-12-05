import { api } from './client';

export type Team = {
  id: number;
  name: string;
  color: string;
};

type TeamsResponse = {
  results: Team[];
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
