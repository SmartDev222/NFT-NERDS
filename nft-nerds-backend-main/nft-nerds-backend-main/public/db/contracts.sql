/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100138
 Source Host           : localhost:3306
 Source Schema         : nft_nerds

 Target Server Type    : MySQL
 Target Server Version : 100138
 File Encoding         : 65001

 Date: 13/05/2022 17:43:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contracts
-- ----------------------------
DROP TABLE IF EXISTS `contracts`;
CREATE TABLE `contracts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `block_number` int(11) NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'true',
  `created_date` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_date` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
