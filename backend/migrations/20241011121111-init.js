"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(`
      /*
 Navicat Premium Data Transfer

 Source Server         : local_postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 170000 (170000)
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170000 (170000)
 File Encoding         : 65001

 Date: 11/10/2024 20:14:37
*/


-- ----------------------------
-- Type structure for enum_service_status
-- ----------------------------
DROP TYPE IF EXISTS "public"."enum_service_status";
CREATE TYPE "public"."enum_service_status" AS ENUM (
  '可用',
  '不可用'
);
ALTER TYPE "public"."enum_service_status" OWNER TO "postgres";

-- ----------------------------
-- Table structure for check_result
-- ----------------------------
DROP TABLE IF EXISTS "public"."check_result";
CREATE TABLE "public"."check_result" (
  "id" uuid NOT NULL,
  "service_id" uuid NOT NULL,
  "video_id" uuid NOT NULL,
  "result" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "details" varchar(255) COLLATE "pg_catalog"."default",
  "checked_at" timestamptz(6) NOT NULL,
  "updated_at" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of check_result
-- ----------------------------

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS "public"."feedback";
CREATE TABLE "public"."feedback" (
  "id" uuid NOT NULL,
  "content" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6) NOT NULL,
  "updated_at" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of feedback
-- ----------------------------

-- ----------------------------
-- Table structure for service
-- ----------------------------
DROP TABLE IF EXISTS "public"."service";
CREATE TABLE "public"."service" (
  "id" uuid NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" "public"."enum_service_status" NOT NULL DEFAULT '不可用'::enum_service_status,
  "created_at" timestamptz(6) NOT NULL,
  "updated_at" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of service
-- ----------------------------

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS "public"."video";
CREATE TABLE "public"."video" (
  "id" uuid NOT NULL,
  "video_path" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamptz(6) NOT NULL,
  "updated_at" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of video
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table check_result
-- ----------------------------
ALTER TABLE "public"."check_result" ADD CONSTRAINT "check_result_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table feedback
-- ----------------------------
ALTER TABLE "public"."feedback" ADD CONSTRAINT "feedback_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table service
-- ----------------------------
ALTER TABLE "public"."service" ADD CONSTRAINT "service_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table video
-- ----------------------------
ALTER TABLE "public"."video" ADD CONSTRAINT "video_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table check_result
-- ----------------------------
ALTER TABLE "public"."check_result" ADD CONSTRAINT "check_result_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."service" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."check_result" ADD CONSTRAINT "check_result_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."video" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

      
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
    await queryInterface.dropAllEnums();
  },
};
