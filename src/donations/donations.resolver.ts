import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DonationsService } from './donations.service';
import { CreateDonationInput } from './dto/create-donation.input';

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) { }

  @Mutation('createDonation')
  create(@Args('createDonationInput') createDonationInput: Prisma.donationCreateInput) {
    return this.donationsService.create(createDonationInput);
  }

  @Query('donations')
  findAll(@Args('orderBy', { nullable: true }) orderBy?: {
    field?: string,
    direction?: string
  }) {
    return this.donationsService.findAll(orderBy);
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne(id);
  }
}
