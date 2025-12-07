import { TaskStatus, TaskStatusType } from '@/constants/task-status';
import {
  createTask,
  CreateTaskBody,
  deleteTask,
  editTask,
  EditTaskBody,
  getTaskById,
} from '@/src/services/api/tasks';
import { Team } from '@/src/services/api/teams';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

type Task = {
  title: string;
  description: string;
  teams: Team[];
  status: TaskStatusType;
};

export function useFormTask({ isEdit = false }: { isEdit?: boolean }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      teams: [],
    },
  });

  const { id } = useLocalSearchParams<{ id: string }>();

  const [selectedStatusIndex, setSelectedStatusIndex] = useState(0);
  const [isVisibleTeamMultiSelectModal, setIsVisibleTeamMultiSelectModal] =
    useState(false);
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);

  const selectStatusItems = useMemo(
    () => [
      {
        label: 'Pendente',
        value: TaskStatus.PENDING,
      },
      {
        label: 'Em progresso',
        value: TaskStatus.IN_PROGRESS,
      },
      {
        label: 'Concluída',
        value: TaskStatus.CONCLUDED,
      },
    ],
    [],
  );

  const { data: task, status } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(Number(id)),
    enabled: isEdit,
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        teams: task.teams,
        status: task.status,
      });
    }
  }, [task, reset]);

  const mutation = useMutation({
    mutationFn: (body: CreateTaskBody | EditTaskBody) => {
      if (isEdit && task?.id) {
        return editTask(body as EditTaskBody, task.id);
      }

      return createTask(body as CreateTaskBody);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: () => {
      return deleteTask(task!.id);
    },
  });

  const onSubmit = (data: Task) => {
    const { description, status, teams, title } = data;
    const body: CreateTaskBody | EditTaskBody = {
      status,
      ...(!isEdit && {
        title,
        description,
        teamIds: teams.map((team) => team.id),
      }),
    };

    mutation.mutate(body);
  };

  const onDelete = () => {
    mutationDelete.mutate();
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Tarefa criada com sucesso',
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

  useEffect(() => {
    if (mutationDelete.isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Tarefa excluída com sucesso',
      });

      setIsVisibleDeleteModal(false);
      router.back();
    }

    if (mutationDelete.error?.message) {
      Toast.show({
        type: 'error',
        text1: mutationDelete.error.message,
      });
    }
  }, [mutationDelete.isSuccess, mutationDelete.error?.message]);

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    mutation,
    mutationDelete,
    isVisibleTeamMultiSelectModal,
    setIsVisibleTeamMultiSelectModal,
    selectedStatusIndex,
    setSelectedStatusIndex,
    selectStatusItems,
    task,
    status,
    isVisibleDeleteModal,
    setIsVisibleDeleteModal,
    onDelete,
  };
}
