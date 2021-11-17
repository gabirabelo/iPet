import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddPix1637013576333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "pix",
              type: "varchar",
              isNullable: true,
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn(
            "users",
            new TableColumn({
              name: "pix",
              type: "varchar",
              isNullable: true,
            })
          );
    }

}
