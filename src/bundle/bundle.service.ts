import { Injectable } from '@nestjs/common';
import { CreateBundleInput } from './dto/create-bundle.input';
import { UpdateBundleInput } from './dto/update-bundle.input';

@Injectable()
export class BundleService {
  create(createBundleInput: CreateBundleInput) {
    return 'This action adds a new bundle';
  }

  findAll() {
    return `This action returns all bundle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bundle`;
  }

  update(id: number, updateBundleInput: UpdateBundleInput) {
    return `This action updates a #${id} bundle`;
  }

  remove(id: number) {
    return `This action removes a #${id} bundle`;
  }
}
