import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { MembershipsController } from '../Controllers/memberships.controller';
import { MembershipDataClass, MembershipSchema } from '../Schemas/membership.schema';
import { MembershipsService } from '../Services/membership.service';


@Module({
    imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: MembershipDataClass.name, schema: MembershipSchema },
    ]),
  ],
  controllers: [MembershipsController],
  providers: [MembershipsService],
})
export class MembershipsModule {}
