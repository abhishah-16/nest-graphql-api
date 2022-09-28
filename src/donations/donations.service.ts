import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) { }

  create(createDonationInput: Prisma.donationCreateInput) {
    const donation = this.prisma.donation.create({
      data: createDonationInput
    })
    return donation
  }

  async findAll(orderBy?: { field?: string; direction?: string }) {
    if (orderBy === undefined) {
      const donations = await this.prisma.donation.findMany({
        orderBy: { 'createdAt': 'desc' }
      })
      return donations
    } else {
      const donations = await this.prisma.donation.findMany({
        orderBy: { [orderBy.field]: orderBy.direction }
      })
      return donations
    }
  }

  async findOne(id: number) {
    const donation = await this.prisma.donation.findUnique({
      where: {
        id: id
      }
    })
    if (!donation) {
      throw new Error('Donation does not exists')
    }
    return donation
  }
}

