import { Injectable } from '@nestjs/common';
import { BaseEntity } from './base.controller';

@Injectable()
export abstract class BaseService<T extends BaseEntity, CreateDto, UpdateDto> {
  protected entities: T[] = [];
  protected nextId = 0;

  findAll(): T[] {
    return this.entities;
  }

  findOne(id: number): T | undefined {
    return this.entities.find((entity) => entity.id === id);
  }

  protected findIndex(id: number): number {
    return this.entities.findIndex((entity) => entity.id === id);
  }

  abstract create(dto: CreateDto): T;

  abstract update(id: number, dto: UpdateDto): T | undefined;

  remove(id: number): T | string | undefined {
    const index = this.findIndex(id);
    if (index > -1) {
      const removed = this.entities[index];
      this.entities.splice(index, 1);
      return removed;
    }
    return undefined;
  }

  protected getNextId(): number {
    return this.nextId++;
  }
}
