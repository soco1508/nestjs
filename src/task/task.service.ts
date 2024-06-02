import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  //private Task: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.Task;
  // }

  // getTasksWithFilter(getTasksFilterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = getTasksFilterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with "${id}" was not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    const record = await this.taskRepository.delete(task);

    if (record.affected === 0) {
      throw new NotFoundException(`Task with "${id}" was not found`);
    }
  }

  // getTaskById(id: string): Task {
  //   const found = this.Task.find((task) => task.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Task with "${id}" was not found`);
  //   }

  //   return found;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuidv1(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.Task.push(task);
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.Task = this.Task.filter((task) => task.id !== found.id);
  // }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    let task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
