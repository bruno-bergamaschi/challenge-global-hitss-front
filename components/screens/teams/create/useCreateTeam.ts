import { TeamSchema, teamSchema } from '@/schemas/team.schema';
import { createTeam, CreateTeamBody } from '@/src/services/api/teams';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

export function useCreateTeam() {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamSchema>({
    resolver: zodResolver(teamSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const [isVisibileColorPickerModal, setIsVisibleColorPickerModal] =
    useState(false);

  const mutation = useMutation({
    mutationFn: (body: CreateTeamBody) => createTeam(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });

  const onSubmit = (data: TeamSchema) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Time criado com sucesso',
      });
      router.back();
    }

    if (mutation.error?.message) {
      Toast.show({
        type: 'error',
        text1: mutation.error.message,
      });
    }
  }, [mutation.isSuccess, mutation.error?.message]);

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    mutation,
    isVisibileColorPickerModal,
    setIsVisibleColorPickerModal,
  };
}
