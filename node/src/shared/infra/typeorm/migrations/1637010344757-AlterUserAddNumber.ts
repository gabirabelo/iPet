

import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
  } from "typeorm";

export class AlterUserAddNumber1637010344757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "phone_number",
              type: "varchar",
              isNullable: true,
            })
          );
      
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "price",
              type: "decimal",
              isNullable: true,
            })
          );
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "phone_number",
              type: "varchar",
              isNullable: true,
            })
          );
      
          await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "price",
              type: "decimal",
              isNullable: true,
            })
          );
    }

}
