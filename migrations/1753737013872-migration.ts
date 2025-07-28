import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1753737013872 implements MigrationInterface {
    name = 'Migration1753737013872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("id" character varying(8) NOT NULL, "code" character varying NOT NULL, "status" "public"."rooms_status_enum" NOT NULL DEFAULT 'waiting', "currentRoundNumber" integer NOT NULL DEFAULT '0', "maxPlayers" integer NOT NULL DEFAULT '8', "maxRounds" integer NOT NULL DEFAULT '10', "roundTime" "public"."rooms_roundtime_enum" NOT NULL DEFAULT '20', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "host_user_id" character varying(8), CONSTRAINT "UQ_368d83b661b9670e7be1bbb9cdd" UNIQUE ("code"), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying(8) NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roomId" character varying(8), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_08815b6b09a529e7ef5bcf3c492" FOREIGN KEY ("host_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_08815b6b09a529e7ef5bcf3c492"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}
