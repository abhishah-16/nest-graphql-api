import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DonationsService } from './donations.service';
import { PubSub } from 'graphql-subscriptions'


const pubsub = new PubSub()
@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) { }

  @Mutation('createDonation')
  async create(@Args('createDonationInput') createDonationInput: Prisma.donationCreateInput) {
    const created = await this.donationsService.create(createDonationInput);
    const total = await this.donationsService.getTotal()
    pubsub.publish('totalUpdate', { totalUpdate: { total } })
    return created
  }

  @Subscription()
  totalUpdate() {
    return pubsub.asyncIterator('totalUpdate')
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

  @Query('totalDonation')
  totalDonation() {
    return this.donationsService.getTotal()
  }
}
