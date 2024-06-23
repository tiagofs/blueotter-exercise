import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepositoryDTO } from './dto/userRepository.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post(':user/repos/import')
  importRepos(@Param('user') userName: string): Promise<UserRepositoryDTO[]> {
    return this.usersService.importRepos(userName);
  }

  @Get(':user/repos')
  findAll(
    @Param('user') userName: string,
    @Query('search') searchText?: string,
  ): Promise<UserRepositoryDTO[]> {
    return this.usersService.findReposByUserName(userName, searchText);
  }
}
