import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [GraphQLModule.forRoot({
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
    typePaths: ['./**/*.graphql']
  }), DonationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
