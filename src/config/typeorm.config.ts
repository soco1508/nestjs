import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Task } from 'src/task/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'taskmanagement',
  entities: [Task],
  migrationsTableName: 'Migrations_History',
  synchronize: true,
};
