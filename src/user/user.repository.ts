import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.entity';
import { EntityRepository } from 'src/database/entity.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
