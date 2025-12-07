import { createTeam, CreateTeamBody } from '@/src/services/api/teams';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

type Team = {
  name: string;
  color: string;
};

export function useCreateTeam() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Team>({
    defaultValues: {
      name: '',
      color: '',
    },
  });
  const [isVisibileColorPickerModal, setIsVisibleColorPickerModal] =
    useState(false);

  const mutation = useMutation({
    mutationFn: (body: CreateTeamBody) => createTeam(body),
  });

  const onSubmit = (data: any) => {
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
