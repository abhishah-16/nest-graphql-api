import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { DonationsModule } from './donations/donations.module';
import { GraphQLDateTime } from 'graphql-iso-date'

@Module({
  imports: [GraphQLModule.forRoot({
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
    driver: ApolloDriver,
    typePaths: ['./**/*.graphql'],
    resolvers: { DateTime: GraphQLDateTime }
  }), DonationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
