import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post(':user/repos/import')
  importRepos(@Param('user') userName: string): Promise<any> {
    return this.usersService.importRepos(userName);
  }

  @Get(':user/repos')
  findAll(
    @Param('user') userName: string,
    @Query('search') searchText?: string,
  ): Promise<any> {
    return this.usersService.findReposByUserName(userName, searchText);
  }
}
