import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDonationInput } from './dto/create-donation.input';
import { UpdateDonationInput } from './dto/update-donation.input';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) { }

  create(createDonationInput: Prisma.donationCreateInput) {
    const donation = this.prisma.donation.create({
      data: createDonationInput
    })
    return donation
  }

  async findAll() {
    const donations = await this.prisma.donation.findMany()
    return donations
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

