import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepositoryDTO } from './dto/userRepository.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async importRepos(userName: string): Promise<UserRepositoryDTO[]> {
    const api_endpoint = this.configService.get('GITHUB_API_ENDPOINT');
    const url = `${api_endpoint}/users/${userName}/repos`;
    const result = this.httpService
      .get(url)
      .pipe(map((response: AxiosResponse) => response.data));
    const repos = await lastValueFrom(result);

    if (repos.length > 0) {
      const userRecord = await this.prisma.user.upsert({
        where: { userLogin: userName },
        update: {
          userAvatar: repos[0].owner.avatar_url,
        },
        create: {
          userLogin: userName,
          userId: repos[0].owner.id,
          userAvatar: repos[0].owner.avatar_url,
        },
      });

      const reposPromise = repos.map((repo) => {
        return this.prisma.repository.upsert({
          where: { repositoryId: repo.id },
          update: {
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            mainLanguage: repo.language,
          },
          create: {
            repositoryId: repo.id,
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            mainLanguage: repo.language,
            repositoryCreatedAt: repo.created_at,
            user: { connect: { id: userRecord.id } },
          },
        });
      });

      const savedRepos = await Promise.all(reposPromise);
      return plainToInstance(UserRepositoryDTO, savedRepos);
    }

    return [];
  }

  async findReposByUserName(
    userName: string,
    searchText?: string,
  ): Promise<UserRepositoryDTO[]> {
    const userRepos = await this.prisma.user.findUnique({
      where: { userLogin: userName },
      include: {
        repositories: {
          where: searchText
            ? {
                OR: [
                  { name: { contains: searchText, mode: 'insensitive' } },
                  {
                    description: { contains: searchText, mode: 'insensitive' },
                  },
                  { url: { contains: searchText, mode: 'insensitive' } },
                  {
                    mainLanguage: { contains: searchText, mode: 'insensitive' },
                  },
                ],
              }
            : {},
        },
      },
    });

    if (!userRepos) {
      throw new NotFoundException(`User with username ${userName} not found`);
    }

    return plainToInstance(UserRepositoryDTO, userRepos.repositories);
  }
}
