import { TaskRepository } from '../models/TaskRepository.js'

export type TaskActions = Pick<TaskRepository, 'toggle' | 'delete'>
