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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UniversitiesDto } from './universities.dto';
import { UniversitiesService } from './universities.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { HTTP_STATUS_CODES } from 'src/common/status-codes/http-status-codes';

@ApiTags('universities')
@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all universities' })
  @ApiResponse({ type: [UniversitiesDto] })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  findAll() {
    return this.universitiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get university by id' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.universitiesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create university' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  @ApiResponse({ status: 201, description: 'Universitate adăugată cu succes' })
  create(@Body(new ValidationPipe()) dto: UniversitiesDto) {
    return this.universitiesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update university' })
  @ApiResponse({ type: UniversitiesDto })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UniversitiesDto) {
    return this.universitiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete university' })
  @ApiResponse({ status: 100, description: HTTP_STATUS_CODES[100] })
  @ApiResponse({ status: 101, description: HTTP_STATUS_CODES[101] })
  @ApiResponse({ status: 200, description: HTTP_STATUS_CODES[200] })
  @ApiResponse({ status: 204, description: HTTP_STATUS_CODES[204] })
  @ApiResponse({ status: 301, description: HTTP_STATUS_CODES[301] })
  @ApiResponse({ status: 302, description: HTTP_STATUS_CODES[302] })
  @ApiResponse({ status: 400, description: HTTP_STATUS_CODES[400] })
  @ApiResponse({ status: 401, description: HTTP_STATUS_CODES[401] })
  @ApiResponse({ status: 403, description: HTTP_STATUS_CODES[403] })
  @ApiResponse({ status: 404, description: HTTP_STATUS_CODES[404] })
  @ApiResponse({ status: 500, description: HTTP_STATUS_CODES[500] })
  @ApiResponse({ status: 502, description: HTTP_STATUS_CODES[502] })
  @ApiResponse({ status: 503, description: HTTP_STATUS_CODES[503] })
  @ApiResponse({ status: 504, description: HTTP_STATUS_CODES[504] })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.universitiesService.remove(id);
  }
}
