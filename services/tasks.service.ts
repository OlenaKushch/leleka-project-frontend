import { api } from "@/app/api/client";
import { Task } from "@/types/task";

export const getTasks = async (): Promise<Task[]> => {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
}

export const createTask = async (
    payload: { name: string; date: string }
): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', payload);
    return data;
};

export const updateTask = async (
    taskId: string,
    payload: { name: string; date: string }
): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${taskId}`, payload);
    return data;
};

export const updateTasksStatus = async (
    taskId: string,
    isDone: boolean
): Promise<Task> => {
    const { data } = await api.patch<Task>(`/tasks/${taskId}/status`, { isDone });
    return data;
};