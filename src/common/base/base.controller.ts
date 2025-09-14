import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { ApiStandardResponses } from '../swagger/swagger-responses.util';

export interface BaseEntity {
  id: number;
}

export interface BaseService<T extends BaseEntity, CreateDto, UpdateDto> {
  findAll(): T[];
  findOne(id: number): T | undefined;
  create(dto: CreateDto): T;
  update(id: number, dto: UpdateDto): T | undefined;
  remove(id: number): T | string | undefined;
}

export interface ApiResponseMessages {
  noEntitiesFound: string;
  entitiesList: string;
  entityNotFound: string;
  entityFound: string;
  entityUpdated: string;
  entityDeleted: string;
}

@Controller()
export abstract class BaseController<
  T extends BaseEntity,
  CreateDto,
  UpdateDto,
> {
  constructor(
    protected readonly service: BaseService<T, CreateDto, UpdateDto>,
    protected readonly messages: ApiResponseMessages,
    protected readonly entityName: string,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all entities' })
  findAll() {
    const entities = this.service.findAll();
    if (entities.length === 0) {
      return {
        message: this.messages.noEntitiesFound,
        [this.entityName]: [],
      };
    }
    return {
      message: this.messages.entitiesList,
      [this.entityName]: [...entities],
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get entity by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    const entity = this.service.findOne(id);
    if (!entity) {
      return {
        message: this.messages.entityNotFound,
        [this.entityName.slice(0, -1)]: null,
      };
    }
    return {
      message: this.messages.entityFound,
      [this.entityName.slice(0, -1)]: entity,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create entity' })
  create(@Body(new ValidationPipe()) dto: CreateDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update entity' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UpdateDto,
  ) {
    const updated = this.service.update(id, dto);
    if (!updated) {
      return {
        message: this.messages.entityNotFound,
        [this.entityName.slice(0, -1)]: null,
      };
    }
    return {
      message: this.messages.entityUpdated,
      [this.entityName.slice(0, -1)]: updated,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete entity' })
  @ApiStandardResponses()
  remove(@Param('id', ParseIntPipe) id: number) {
    const removed = this.service.remove(id);
    if (!removed) {
      return {
        message: this.messages.entityNotFound,
        [this.entityName.slice(0, -1)]: null,
      };
    }
    if (typeof removed === 'string') {
      return {
        message: removed,
        [this.entityName.slice(0, -1)]: null,
      };
    }
    return {
      message: this.messages.entityDeleted,
      [this.entityName.slice(0, -1)]: removed,
    };
  }
}
