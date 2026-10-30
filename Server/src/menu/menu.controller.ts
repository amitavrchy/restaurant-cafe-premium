import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import {
  CreateItemDto,
  CreateSectionDto,
  UpdateItemDto,
  UpdateSectionDto,
} from './dto/menu.dto.js';
import { MenuService } from './menu.service.js';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getMenu() {
    return this.menuService.getMenu();
  }

  @Post('sections')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createSection(@Body() dto: CreateSectionDto) {
    return this.menuService.createSection(dto);
  }

  @Patch('sections/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateSection(@Param('id') id: string, @Body() dto: UpdateSectionDto) {
    return this.menuService.updateSection(id, dto);
  }

  @Delete('sections/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deleteSection(@Param('id') id: string) {
    return this.menuService.deleteSection(id);
  }

  @Post('items')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createItem(@Body() dto: CreateItemDto) {
    return this.menuService.createItem(dto);
  }

  @Patch('items/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateItem(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.menuService.updateItem(id, dto);
  }

  @Delete('items/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deleteItem(@Param('id') id: string) {
    return this.menuService.deleteItem(id);
  }
}
