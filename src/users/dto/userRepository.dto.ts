import { Exclude } from 'class-transformer';

export class UserRepositoryDTO {
  @Exclude()
  id: number;
  repositoryId: number;
  @Exclude()
  userId: number;
  name: string;
  description: string | null;
  url: string;
  mainLanguage: string | null;
  repositoryCreatedAt: Date;
}
