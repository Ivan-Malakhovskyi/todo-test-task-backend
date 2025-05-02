import { Injectable } from '@nestjs/common';
import { seedData } from 'db/seeds/data-seed';
import { DataSource } from 'typeorm';

@Injectable({})
export class SeedService {
  constructor(private readonly connection: DataSource) {}
  //! SAME
  // private readonly connection: DataSource;
  //   constructor(connection: DataSource) {
  //     this.connection = connection;
  //   }

  async seed(): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      await seedData(manager);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error', error);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
