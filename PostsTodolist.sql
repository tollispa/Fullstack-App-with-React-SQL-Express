-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: todolist
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
INSERT INTO `avatars` VALUES (2,'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'),(7,'https://images.unsplash.com/photo-1572988276585-71035689a285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),(10,'https://th.bing.com/th/id/R.966122149b94dfc65949623816eb8095?rik=kZlpVSNpR6FZWA&pid=ImgRaw&r=0'),(11,'https://i.pinimg.com/originals/e0/f9/9d/e0f99d2aadbafd3f92559718210d6a00.jpg'),(12,'https://th.bing.com/th/id/OIP.JCkBl7l4bLfaeC4gwTxZiwHaHa?pid=ImgDet&rs=1'),(13,'https://avatarfiles.alphacoders.com/163/163503.jpg'),(14,'https://yt3.ggpht.com/a-/AAuE7mBsXFw834m1N6PbIi6uHsQrz5FDAqu_HtVEcw=s900-mo-c-c0xffffffff-rj-k-no'),(15,'https://pbs.twimg.com/profile_images/596348280600141824/qwHlUN7J_400x400.png'),(16,'https://st.depositphotos.com/1787196/1330/i/450/depositphotos_13302273-stock-photo-cute-furry-monster.jpg'),(17,'https://th.bing.com/th/id/OIP.9qokB9PKZTLgME1s0OkpHQHaHa?pid=ImgDet&rs=1');
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_friend_pairs` (`user_id`,`friend_id`),
  UNIQUE KEY `UNIQUE_friend_pair` (`user_id`,`friend_id`,`id`),
  KEY `FK_friend_user` (`friend_id`),
  CONSTRAINT `FK_friend_user` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_user_friend` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (101,72,78),(116,77,78),(122,77,80),(118,80,72),(119,81,77),(123,82,77);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_text` text NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `received_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_message_id` (`id`),
  KEY `FK_message_sender` (`sender_id`),
  KEY `FK_message_receiver` (`receiver_id`),
  KEY `FK_message_friend` (`friend_id`),
  CONSTRAINT `FK_message_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_message_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (53,'Shu va göru?',77,72,0,'2023-03-18 13:41:46'),(54,'kom vi ska kolla tv nu',81,77,0,'2023-03-18 18:22:48'),(55,'Tjo tollis',82,77,0,'2023-03-21 20:30:29');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (17,72,'Är hungrig','2023-03-18 15:55:10'),(18,72,'Sugen på pizza','2023-03-18 15:55:14'),(22,72,'Vad händer allihopa?','2023-03-18 17:32:17'),(33,80,'Va händer boys?','2023-03-18 18:19:32'),(35,81,'myser','2023-03-18 18:21:31'),(52,77,'Hejsan','2023-03-18 19:55:28'),(54,72,'Haha','2023-03-18 19:55:44'),(57,77,'Shu boys!','2023-03-20 17:49:04');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `completed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES (44,72,'sdf','sdfsdf',0,'2023-03-16 20:24:41','2023-03-16 20:24:41'),(46,72,'dsf','sdf',0,'2023-03-17 10:19:30','2023-03-17 10:19:30'),(51,77,'sdf','sdf',1,'2023-03-20 17:24:42','2023-03-20 17:24:42');
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int NOT NULL,
  `last_seen_online` varchar(10) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (72,'joelle','123','male',25,'20:55 2/18',''),(77,'Tollis','123','male',25,'13:24 2/23','https://pbs.twimg.com/profile_images/596348280600141824/qwHlUN7J_400x400.png'),(78,'Adam','123','male',26,NULL,''),(80,'Metin','123','male',25,'19:19 2/18','https://th.bing.com/th/id/OIP.JCkBl7l4bLfaeC4gwTxZiwHaHa?pid=ImgDet&rs=1'),(81,'joellepapa','joelle92','female',25,'19:22 2/18','https://th.bing.com/th/id/OIP.JCkBl7l4bLfaeC4gwTxZiwHaHa?pid=ImgDet&rs=1'),(82,'Danne','123','male',16,'21:30 2/21','https://avatarfiles.alphacoders.com/163/163503.jpg'),(83,'metinn','123','male',26,NULL,'');
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

-- Dump completed on 2023-03-23 13:27:52
