import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
// import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':user/repos/import')
  importRepos(@Param('user') userName: string): Promise<any> {
    return this.usersService.importRepos(userName);
  }

  // @Get(':user/repos')
  // findAll(@Param('user') userName: string): Promise<any> {
    // return this.usersService.findReposByUserName(userName);
  // }
}
