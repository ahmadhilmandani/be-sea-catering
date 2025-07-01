-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: sea-catering
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- `sea-catering`.order_meal definition

CREATE TABLE `order_meal` (
  `id_order_meal` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `phone_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_meal_type` int DEFAULT NULL,
  `id_food_menu` int DEFAULT NULL,
  `is_send` tinyint(1) DEFAULT NULL,
  `deliver_date_schedule` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_order_meal`),
  KEY `order_meal_users_FK` (`id_user`),
  KEY `order_meal_food_menu_FK` (`id_food_menu`),
  KEY `order_meal_meal_type_FK` (`id_meal_type`),
  CONSTRAINT `order_meal_food_menu_FK` FOREIGN KEY (`id_food_menu`) REFERENCES `food_menu` (`id_food_menu`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_meal_meal_type_FK` FOREIGN KEY (`id_meal_type`) REFERENCES `meal_type` (`id_meal_type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_meal_users_FK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `subscriptions` (
  `id_subscription` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_diet_type` int DEFAULT NULL,
  `status_subs` enum('pending','active','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `total_bill` decimal(10,2) DEFAULT NULL,
  `is_reactivation` enum('1') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_subscription`),
  KEY `subscriptions_diet_type_FK` (`id_diet_type`),
  KEY `subscriptions_users_FK` (`id_user`),
  CONSTRAINT `subscriptions_diet_type_FK` FOREIGN KEY (`id_diet_type`) REFERENCES `diet_type` (`id_diet_type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `subscriptions_users_FK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `delivery_days`
--

DROP TABLE IF EXISTS `delivery_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_days` (
  `id_delivery_day` int NOT NULL AUTO_INCREMENT,
  `day` enum('senin','selasa','rabu','kamis','jumat','sabtu','minggu') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_delivery_day`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_days`
--

/*!40000 ALTER TABLE `delivery_days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diet_type`
--

DROP TABLE IF EXISTS `diet_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diet_type` (
  `id_diet_type` int NOT NULL AUTO_INCREMENT,
  `name` enum('balance diet plan','low calorie diet plan','high protein diet plan','royal diet plan') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `subs_diet_type_price_meal` decimal(10,2) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_diet_type`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diet_type`
--

/*!40000 ALTER TABLE `diet_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_menu`
--

DROP TABLE IF EXISTS `food_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_menu` (
  `id_food_menu` int NOT NULL AUTO_INCREMENT,
  `id_diet_type` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recomended_for` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_food_menu`),
  KEY `food_menu_diet_type_FK` (`id_diet_type`),
  CONSTRAINT `food_menu_diet_type_FK` FOREIGN KEY (`id_diet_type`) REFERENCES `diet_type` (`id_diet_type`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_menu`
--

/*!40000 ALTER TABLE `food_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_type`
--

DROP TABLE IF EXISTS `meal_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal_type` (
  `id_meal_type` int NOT NULL AUTO_INCREMENT,
  `name` enum('sarapan','makan siang','makan malam') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estimate_time_int` enum('5.30 - 8.00 WIB','11.30 - 13.45 WIB','18.00 - 21.00 WIB') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_meal_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_type`
--

/*!40000 ALTER TABLE `meal_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutritions`
--

DROP TABLE IF EXISTS `nutritions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutritions` (
  `id_nutrition` int NOT NULL AUTO_INCREMENT,
  `id_food_menu` int DEFAULT NULL,
  `name` enum('protein','kalori','lemak','gula','karbohidrat','serat') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_nutrition`),
  KEY `food_menu_diet_type_FK` (`id_food_menu`) USING BTREE,
  CONSTRAINT `nutritions_food_menu_FK` FOREIGN KEY (`id_food_menu`) REFERENCES `food_menu` (`id_food_menu`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutritions`
--

LOCK TABLES `nutritions` WRITE;
/*!40000 ALTER TABLE `nutritions` DISABLE KEYS */;
INSERT INTO `nutritions` VALUES (3,1,'protein',17.00,'g','2025-06-27 08:18:59',NULL,0),(4,1,'kalori',201.00,'kkal','2025-06-27 08:18:59',NULL,0),(5,1,'lemak',38.00,'g','2025-06-27 08:18:59',NULL,0),(6,1,'karbohidrat',79.00,'g','2025-06-27 08:18:59',NULL,0),(7,1,'gula',12.00,'g','2025-06-27 08:18:59',NULL,0),(8,2,'protein',43.00,'g','2025-06-27 08:18:59',NULL,0),(9,2,'kalori',330.00,'kkal','2025-06-27 08:18:59',NULL,0),(10,2,'lemak',44.00,'g','2025-06-27 08:18:59',NULL,0),(11,2,'karbohidrat',98.00,'g','2025-06-27 08:18:59',NULL,0),(12,2,'gula',23.00,'g','2025-06-27 08:18:59',NULL,0),(13,3,'protein',17.00,'g','2025-06-27 08:18:59',NULL,0),(14,3,'kalori',330.00,'kkal','2025-06-27 08:18:59',NULL,0),(15,3,'lemak',38.00,'g','2025-06-27 08:18:59',NULL,0),(16,3,'karbohidrat',79.00,'g','2025-06-27 08:18:59',NULL,0),(17,3,'gula',12.00,'g','2025-06-27 08:18:59',NULL,0),(18,4,'protein',50.00,'g','2025-06-27 08:18:59',NULL,0),(19,4,'kalori',620.00,'kkal','2025-06-27 08:18:59',NULL,0),(20,4,'lemak',125.00,'g','2025-06-27 08:18:59',NULL,0),(21,4,'karbohidrat',65.00,'g','2025-06-27 08:18:59',NULL,0),(22,4,'gula',42.00,'g','2025-06-27 08:18:59',NULL,0),(23,5,'protein',40.00,'g','2025-06-27 08:18:59',NULL,0),(24,5,'kalori',580.00,'kkal','2025-06-27 08:18:59',NULL,0),(25,5,'lemak',142.00,'g','2025-06-27 08:18:59',NULL,0),(26,5,'karbohidrat',72.00,'g','2025-06-27 08:18:59',NULL,0),(27,5,'gula',33.00,'g','2025-06-27 08:18:59',NULL,0),(28,6,'protein',19.00,'g','2025-06-27 08:18:59',NULL,0),(29,6,'kalori',229.00,'kkal','2025-06-27 08:18:59',NULL,0),(30,6,'lemak',43.00,'g','2025-06-27 08:18:59',NULL,0),(31,6,'karbohidrat',46.00,'g','2025-06-27 08:18:59',NULL,0),(32,6,'gula',34.00,'g','2025-06-27 08:18:59',NULL,0),(33,7,'protein',19.00,'g','2025-06-27 08:18:59',NULL,0),(34,7,'kalori',132.00,'kkal','2025-06-27 08:18:59',NULL,0),(35,7,'lemak',33.00,'g','2025-06-27 08:18:59',NULL,0),(36,7,'karbohidrat',26.00,'g','2025-06-27 08:18:59',NULL,0),(37,7,'gula',12.00,'g','2025-06-27 08:18:59',NULL,0),(38,8,'protein',18.00,'g','2025-06-27 08:18:59',NULL,0),(39,8,'kalori',131.00,'kkal','2025-06-27 08:18:59',NULL,0),(40,8,'lemak',23.00,'g','2025-06-27 08:18:59',NULL,0),(41,8,'karbohidrat',24.00,'g','2025-06-27 08:18:59',NULL,0),(42,8,'gula',25.00,'g','2025-06-27 08:18:59',NULL,0);
LOCK TABLES `order_meal` WRITE;
/*!40000 ALTER TABLE `order_meal` DISABLE KEYS */;
INSERT INTO `order_meal` VALUES (1,1,NULL,NULL,NULL,NULL,1,0,'2025-07-28','2025-06-27 03:00:18',NULL,0),(6,1,'1','11','081231988716',NULL,1,0,'2025-07-29','2025-06-27 03:32:28',NULL,0),(7,NULL,'hil','man','081231988111',NULL,1,0,'2025-07-28',NULL,NULL,0),(8,NULL,'hil','man','081231988111',NULL,1,0,'2025-05-25',NULL,NULL,0),(9,NULL,'hil','man','081231988111',NULL,1,0,'2025-05-25','2025-06-27 05:22:38',NULL,0),(10,1,NULL,NULL,NULL,NULL,1,0,'2025-07-28','2025-06-28 06:40:02',NULL,0),(11,5,NULL,NULL,NULL,NULL,6,0,'2025-06-01','2025-06-28 11:10:33',NULL,0),(12,5,NULL,NULL,NULL,NULL,6,0,'2026-02-22','2025-06-28 11:18:10',NULL,0),(13,5,NULL,NULL,NULL,NULL,6,0,'2025-06-30','2025-06-28 11:22:58',NULL,0),(14,5,NULL,NULL,NULL,NULL,6,0,'2333-06-28','2025-06-28 11:24:14',NULL,0),(15,5,NULL,NULL,NULL,NULL,1,0,'2025-07-26','2025-06-28 11:25:04',NULL,0),(16,5,NULL,NULL,NULL,NULL,6,0,'2025-06-28','2025-06-28 12:37:14',NULL,0),(17,NULL,'hari penuh rindu','aku suka kamu, tika','namun..',NULL,6,0,'2022-11-11','2025-06-28 12:39:16',NULL,0),(18,1,NULL,NULL,NULL,1,1,0,'2025-07-28','2025-06-29 08:09:55',NULL,0),(19,NULL,'hil','man','081231988111',2,1,0,'2025-05-25','2025-06-29 08:20:34',NULL,0),(20,NULL,'hil','man','081231988111',2,1,0,'2025-05-25','2025-06-29 08:23:18',NULL,0),(21,NULL,'hil','man','081231988111',2,1,0,'2025-05-25','2025-06-29 08:34:55',NULL,0),(22,NULL,'hil','man','081231988111',2,1,0,'2025-05-30','2025-06-29 08:35:01',NULL,0),(23,NULL,'super','elang ','jawa',2,6,0,'2025-06-30','2025-06-29 10:00:54',NULL,0),(24,6,NULL,NULL,NULL,1,2,0,'2025-06-28','2025-06-29 10:03:11',NULL,0),(25,6,NULL,NULL,NULL,1,3,0,'2025-06-28','2025-06-29 10:03:30',NULL,0);
/*!40000 ALTER TABLE `order_meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subs_delivery_days`
--

DROP TABLE IF EXISTS `subs_delivery_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subs_delivery_days` (
  `id_subs_delivery_days` int NOT NULL AUTO_INCREMENT,
  `id_subscription` int DEFAULT NULL,
  `id_delivery_day` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_subs_delivery_days`),
  KEY `subscriptions_diet_type_FK` (`id_delivery_day`) USING BTREE,
  KEY `subscriptions_users_FK` (`id_subscription`) USING BTREE,
  CONSTRAINT `subs_delivery_days_delivery_days_FK` FOREIGN KEY (`id_delivery_day`) REFERENCES `delivery_days` (`id_delivery_day`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `subs_delivery_days_subscriptions_FK` FOREIGN KEY (`id_subscription`) REFERENCES `subscriptions` (`id_subscription`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subs_delivery_days`
--

LOCK TABLES `subs_delivery_days` WRITE;
/*!40000 ALTER TABLE `subs_delivery_days` DISABLE KEYS */;
INSERT INTO `subs_delivery_days` VALUES (1,NULL,1,NULL,NULL,0),(2,NULL,3,NULL,NULL,0),(3,NULL,5,NULL,NULL,0),(4,NULL,1,NULL,NULL,0),(5,NULL,3,NULL,NULL,0),(6,NULL,5,NULL,NULL,0),(7,NULL,1,NULL,NULL,0),(8,NULL,3,NULL,NULL,0),(9,NULL,5,NULL,NULL,0),(10,NULL,1,NULL,NULL,0),(11,NULL,3,NULL,NULL,0),(12,NULL,5,NULL,NULL,0),(13,NULL,1,NULL,NULL,0),(14,NULL,3,NULL,NULL,0),(15,NULL,5,NULL,NULL,0),(16,NULL,1,NULL,NULL,0),(17,NULL,3,NULL,NULL,0),(18,NULL,5,NULL,NULL,0),(19,NULL,1,NULL,NULL,0),(20,NULL,3,NULL,NULL,0),(21,NULL,5,NULL,NULL,0),(22,24,1,NULL,NULL,0),(23,24,4,NULL,NULL,0),(24,NULL,4,NULL,NULL,0),(25,NULL,2,NULL,NULL,0),(26,NULL,7,NULL,NULL,0),(27,NULL,1,NULL,NULL,0),(28,28,4,NULL,NULL,0),(29,28,1,NULL,NULL,0),(30,29,4,NULL,NULL,0),(31,29,3,NULL,NULL,0),(32,29,5,NULL,NULL,0),(33,30,4,NULL,NULL,0),(34,30,3,NULL,NULL,0),(35,30,2,NULL,NULL,0),(36,30,7,NULL,NULL,0),(37,30,6,NULL,NULL,0),(38,30,5,NULL,NULL,0),(39,30,1,NULL,NULL,0),(40,31,1,NULL,NULL,0),(41,31,2,NULL,NULL,0),(42,31,3,NULL,NULL,0),(43,31,4,NULL,NULL,0),(44,31,5,NULL,NULL,0),(45,31,6,NULL,NULL,0),(46,31,7,NULL,NULL,0),(47,32,7,NULL,NULL,0),(48,32,6,NULL,NULL,0),(49,33,2,NULL,NULL,0),(50,34,6,NULL,NULL,0),(51,NULL,1,NULL,NULL,0),(52,NULL,4,NULL,NULL,0),(53,NULL,6,NULL,NULL,0),(54,NULL,3,NULL,NULL,0),(55,36,1,NULL,NULL,0),(56,37,7,NULL,NULL,0),(57,38,2,NULL,NULL,0),(58,38,7,NULL,NULL,0);
LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (24,6,2,'active',100.00,NULL,'2025-06-29 21:22:44',NULL,0),(28,5,5,'active',360000.00,NULL,'2025-06-30 08:05:53','2025-07-01',1),(29,5,4,'active',360000.00,NULL,'2025-07-01 10:21:55',NULL,1),(30,5,2,'active',735000.00,NULL,'2025-07-01 10:24:01',NULL,1),(31,5,4,'active',840000.00,NULL,'2025-07-01 10:25:39','2025-07-01',1),(32,5,5,'active',360000.00,NULL,'2025-07-01 10:27:52','2025-07-01',1),(33,5,2,'canceled',105000.00,NULL,'2025-07-01 10:29:11','2025-07-01',1),(34,5,2,'active',105000.00,NULL,'2025-07-01 11:05:06',NULL,1),(36,11,2,'active',105000.00,'1','2025-07-01 19:32:26','2025-07-01',1),(37,11,5,'active',180000.00,NULL,'2025-07-01 19:32:51',NULL,0),(38,5,5,'active',360000.00,NULL,'2025-07-01 20:32:15',NULL,0);
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

-- `sea-catering`.subscriptions definition


--
-- Table structure for table `subscriptions_detail`
--

DROP TABLE IF EXISTS `subscriptions_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions_detail` (
  `id_subscription_detail` int NOT NULL AUTO_INCREMENT,
  `id_subscription` int DEFAULT NULL,
  `id_food_menu` int DEFAULT NULL,
  `id_meal_type` int DEFAULT NULL,
  `is_send` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_subscription_detail`),
  KEY `subscriptions_detail_subscriptions_FK` (`id_subscription`),
  KEY `subscriptions_detail_food_menu_FK` (`id_food_menu`),
  KEY `subscriptions_detail_meal_type_FK` (`id_meal_type`),
  CONSTRAINT `subscriptions_detail_food_menu_FK` FOREIGN KEY (`id_food_menu`) REFERENCES `food_menu` (`id_food_menu`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `subscriptions_detail_meal_type_FK` FOREIGN KEY (`id_meal_type`) REFERENCES `meal_type` (`id_meal_type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `subscriptions_detail_subscriptions_FK` FOREIGN KEY (`id_subscription`) REFERENCES `subscriptions` (`id_subscription`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions_detail`
--

/*!40000 ALTER TABLE `subscriptions_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonies`
--

DROP TABLE IF EXISTS `testimonies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonies` (
  `id_testimoni` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `testimoni` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `star` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_testimoni`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonies`
--

/*!40000 ALTER TABLE `testimonies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `alergies` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `is_admin` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `users_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sea-catering'
--
