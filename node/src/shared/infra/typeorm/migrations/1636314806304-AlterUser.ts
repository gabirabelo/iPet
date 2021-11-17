
import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
  } from "typeorm";

export class AlterUser1636314806304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "address_line",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "postal_code",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "number",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "city",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "state",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "complement",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "district",
              type: "varchar",
              isNullable: true,
            })
          );

          await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "user_type",
              type: "varchar",
              isNullable: true,
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "address_line",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "postal_code",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "number",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "city",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "state",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "complement",
              type: "varchar",
              isNullable: true,
            })
          );
          await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "district",
              type: "varchar",
              isNullable: true,
            })
          );

          await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "user_type",
              type: "varchar",
              isNullable: true,
            })
          );
    }

}
