-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: php_blog_system
-- ------------------------------------------------------
-- Server version	8.0.27

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

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `status` enum('draft','published') DEFAULT 'published',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_blogs_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (3,'My First Blog','This is my first blog post.',1,'published','2025-09-18 13:13:27','2025-09-18 13:13:27'),(4,'博客1','博客内容\n博客内容\n博客内容',9,'published','2025-09-19 10:37:40','2025-09-19 10:37:40'),(5,'博客2','123123123123123213',9,'published','2025-09-19 10:38:12','2025-09-19 10:38:12'),(6,'博客3','判断this.isDark 是否为true，如果是，则添加dark类\n',9,'published','2025-09-19 11:09:42','2025-09-19 11:09:42'),(7,'博客4','这是博客4\nasd\n1231\ncdfkosdnisdn',9,'published','2025-09-19 12:24:25','2025-09-19 12:24:25'),(8,'博客5','这是博客5\nii23923nisuvcx\nqkj可是毕竟是的覅VS 哦而foi舒服的kjkk\n实际上东风科技哦 ',9,'published','2025-09-19 12:24:50','2025-09-19 12:24:50'),(9,'博客6','这是博客1吉安 拉大lasdcfasd\n奥斯卡静安寺 啦啦队\n 看见啊山东去哦i  \n安慰那是成分配方',9,'published','2025-09-19 12:25:19','2025-09-19 12:25:19'),(11,'科技早报 | 华为公布昇腾 AI 芯片三年发展路线图；英伟达斥资 50 亿美元入股英特尔','9 月 18 日，科技领域迎来多项重要动态，华为公布昇腾 AI 芯片发展路线图，英伟达与英特尔达成合作，中芯国际市值突破万亿等，以下是具体内容：\n华为公布昇腾 AI 芯片三年发展路线图\n9 月 18 日，在上海世博中心举办的 2025 华为全联接大会上，华为副董事长、轮值董事长徐直军登台发表演讲，首次对外公布了昇腾 AI 芯片未来三年的产品迭代路线图，同时明确表示 2026 年一季度发布的新产品将采用华为自研 HBM (高带宽内存)。\n根据规划，2026 年至 2028 年期间，华为将分阶段推出四款昇腾系列芯片，具体包括：2026 年第一季度推出昇腾 950PR，该芯片采用华为自研 HBM；2026 年第四季度推出昇腾 950DT；2027 年第四季度推出昇腾 960 芯片；2028 年第四季度推出昇腾 970。\n英伟达斥资 50 亿美元入股英特尔\n9 月 18 日，英伟达宣布将斥资 50 亿美元、以每股 23.28 美元的价格收购英特尔普通股。英伟达将成为英特尔最大的股东之一。在发行新股以完成交易后，英伟达可能拥有英特尔 4% 或更多的股份。\n英伟达与英特尔还将建立合作关系。在数据中心领域，英特尔将为英伟达定制 x86 CPU，由英伟达将其集成至人工智能基础设施平台并投放市场。在个人计算领域，英特尔将生产并向市场供应集成英伟达 RTX GPU 芯片的 x86 系统级芯片 (SOC)。\n受此消息影响，英特尔美股盘前涨幅扩大至 30%。美国半导体股票盘前纷纷上涨，阿斯麦涨 7.03%，美光科技涨 2.35%，安森美半导体涨 2.13%，应用材料涨 5.6%。\n中芯国际 A 股总市值突破 1 万亿元\n9 月 18 日，中芯国际 (688981.SH) 早盘大涨，最高股价 127.49 元 / 股，总市值突破 1 万亿元。截至 9 月 18 日午间收盘，中芯国际收涨 5.79%，报收 124.19 元 / 股，半天成交 140.4 亿元，居 A 股成交量第二名，总市值约 9934 亿元。\n当天，半导体板块大涨。汇成股份 (688403.SH) 20cm 涨停，瑞芯微 (603893.SH)、闻泰科技 (600745.SH) 等多股涨停。\n苹果承认 iPhone17 系列及 iPhone Air 存在相机漏洞\n9 月 18 日消息，苹果承认 iPhone 17 系列以及 iPhone Air 存在相机故障，在极亮 LED 灯光直射时，拍摄照片可能出现黑色方块和白色曲线。\n这个问题最早由国外一名记者在评测 iPhone Air 时发现的。其在演唱会拍摄时注意到，大约拍摄的照片中每十张就有一张出现小块黑屏和部分白色波浪线。这些异常是受到舞台 LED 屏的强烈光线干扰造成的，其导致相机传感器记录出现错误，影响最终成像效果。\n该名记者随后与苹果联系反映情况，并获得了官方确认。苹果公司表示，这个问题只在极少数情况下发生，例如 LED 显示屏非常亮，直接照射到相机上。公司已经修复了这个问题，并计划发布修复程序，不过目前尚未公布具体修复补丁的推送时间。',9,'published','2025-09-19 15:22:46','2025-09-19 15:22:46');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bio` text,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('active','inactive','deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@example.com','$2y$10$qzusVJchWEHMnFq2kya7qO8kviOTm4u5JyOWP4Bt8dn5PksLFJ0ya',NULL,NULL,'admin','2025-09-11 14:00:56','2025-09-19 23:08:01','active'),(7,'tom','tom@gmail.com','$2y$10$sL/MORH.wralIaD6QgPh1Oqtjc1wV6yCKWrJwRngouYGn2n42R6NG',NULL,'11111222\n123123','user','2025-09-17 09:37:36','2025-09-20 00:27:03','active'),(9,'jerry','jerry@gmail.com','$2y$10$FW4F/EeQrHjFXUZK4ypHKOAScQI.OMByR6OGL8KaiTiGpWMMFc5Ni',NULL,'nothings to record \n打电话\n234的方式地方','admin','2025-09-17 14:14:50','2025-09-20 00:21:29','active'),(10,'tomace','tomace@example.com','$2y$10$8OFpphr330Hdqyv5TD45ieGNFQukwZaCrvoCjTLAklqV7vVZ0ck.a',NULL,'这是一个个人简介','admin','2025-09-18 12:51:41','2025-09-19 23:08:01','active'),(13,'mack','mack@gmail.com','$2y$10$46cRGg590eP56MHI0RydDuBu4fYVUqB3KwonnPlp3eD/SsbAxhNh.',NULL,NULL,'user','2025-09-19 22:56:28','2025-09-19 23:08:01','active'),(14,'rucers','rucers@gmail.com','$2y$10$dL2luhWinyQ.jsMk4j0sWerwjIgsJfZah4QYus57B1ivaFGVoUWpC',NULL,NULL,'user','2025-09-19 22:56:56','2025-09-19 23:08:01','active'),(15,'刘天富','sky@gmail.com','$2y$10$PETLN5coKsNvG4fqfMPtkOcrli5kJBipgJd1QsJtB0.HGRWi/rSF2',NULL,NULL,'user','2025-09-19 22:57:39','2025-09-19 23:08:01','active'),(16,'小明2','ming@gmail.com','$2y$10$Sh3m.lEXzGAj5mDMCxHhO.HAp7uyG1cyM/J78q.QitWFWOQxN.jwq',NULL,NULL,'user','2025-09-19 22:58:04','2025-09-19 23:08:01','active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-23 23:17:24
