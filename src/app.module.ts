import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { DonationsModule } from './donations/donations.module';
import { DateTimeResolver } from "graphql-scalars"

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: DateTimeResolver },
      subscriptions: {
        'graphql-ws': true,
        'graphql-transport-ws': true
      }
    }),
    DonationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
