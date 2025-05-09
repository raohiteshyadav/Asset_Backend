import { Logger, NotFoundException } from '@nestjs/common';
import { LoadStrategy, defineConfig } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

import 'dotenv/config';

const logger = new Logger('MikroORM');

const config = defineConfig({
  entities: ['dist/src/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: PostgreSqlDriver,
  loadStrategy: LoadStrategy.JOINED,
  clientUrl: process.env.DB_URI,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: false,
    safe: true,
    emit: 'ts',
  },
  extensions: [Migrator],
  findOneOrFailHandler: (entityName) => {
    throw new NotFoundException(`${entityName} not found`);
  },
});

export default config;