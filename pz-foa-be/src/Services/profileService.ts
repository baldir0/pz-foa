import { ProfileEntity } from 'src/Entities/profile.entity';
import { DB } from 'src/utils/database/database';
import { Repository } from 'typeorm';

class ProfileService {
  constructor(
    private profileRepo: Repository<ProfileEntity> = DB.getRepository(
      ProfileEntity
    )
  ) {}
}
