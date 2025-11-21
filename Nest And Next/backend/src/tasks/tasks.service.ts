import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  create(title: string, user: User) {
    const task = this.taskRepo.create({ title, user });
    return this.taskRepo.save(task);
  }

  findAll(user: User) {
    return this.taskRepo.find({ where: { user } });
  }

  async update(id: string, data: Partial<Task>) {
    await this.taskRepo.update(id, data);
    return this.taskRepo.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.taskRepo.delete(id);
  }
}
