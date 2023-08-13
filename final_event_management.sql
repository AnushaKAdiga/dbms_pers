-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: event_management
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_email` varchar(45) NOT NULL,
  `event_head_id` int DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `Eventorg` varchar(15) NOT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `event_head_id` (`event_head_id`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`event_head_id`) REFERENCES `event_org` (`Event_head_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (123,'admin_sjc@gmail.com',20,'Nandan','$2b$08$oNND0IUTnx.P1XdbCV1GOu5i6MzXU1DWduOC1IPBpIEZsbbYCJ0fK',''),(145,'sjce2@gmail.com',NULL,'srimath','$2b$08$g8GMV.Luboo716N.xvkt9..BGhRvjiVerKAVkyySQrWI1quuZ911i','LCC');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competition`
--

DROP TABLE IF EXISTS `competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competition` (
  `co_ID` int NOT NULL AUTO_INCREMENT,
  `co_name` varchar(45) NOT NULL,
  `co_date` date NOT NULL,
  `co_venue` varchar(45) DEFAULT NULL,
  `Event_head_id` int DEFAULT NULL,
  PRIMARY KEY (`co_ID`),
  KEY `competition_ibfk_1` (`Event_head_id`),
  CONSTRAINT `competition_ibfk_1` FOREIGN KEY (`Event_head_id`) REFERENCES `events_jssstu` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition`
--

LOCK TABLES `competition` WRITE;
/*!40000 ALTER TABLE `competition` DISABLE KEYS */;
/*!40000 ALTER TABLE `competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Department_ID` int NOT NULL,
  `Department_name` varchar(45) NOT NULL,
  `D_location` varchar(45) NOT NULL,
  `Dept_head` varchar(45) NOT NULL,
  `Internet_servers` int DEFAULT NULL,
  PRIMARY KEY (`Department_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'CSE','Golden Jublee','Srinath',3),(2,'EEE','Admin Block','Sidram M H',4),(3,'ECE','Admin Block','Mahadeva Swami',4),(4,'ME','Golden Jublee','Dr.Ravishankar',3),(5,'EV','EV Block','Dr.Sadashivamurthy B.M ',2),(6,'Culturals','JSSSTU','Student Welfare Comittee',0);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_org`
--

DROP TABLE IF EXISTS `event_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_org` (
  `Event_head_ID` int NOT NULL,
  `club` varchar(45) NOT NULL,
  `Department_id` int NOT NULL,
  `domain` varchar(45) NOT NULL,
  `Years_of_experience` int NOT NULL,
  PRIMARY KEY (`Event_head_ID`),
  KEY `Department_id` (`Department_id`),
  CONSTRAINT `event_org_ibfk_1` FOREIGN KEY (`Department_id`) REFERENCES `department` (`Department_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_org`
--

LOCK TABLES `event_org` WRITE;
/*!40000 ALTER TABLE `event_org` DISABLE KEYS */;
INSERT INTO `event_org` VALUES (10,'GDSC',1,'Technical',5),(20,'IEEE',3,'Technical',8),(30,'Aerospace',4,'Technical',2),(40,'Project ReachOut',5,'Non Technical',3),(50,'LCC',1,'Technical',8),(60,'Naada',6,'Non Technical',3),(70,'Velocity',6,'Non Technical',4);
/*!40000 ALTER TABLE `event_org` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_jssstu`
--

DROP TABLE IF EXISTS `events_jssstu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events_jssstu` (
  `Event_ID` int NOT NULL AUTO_INCREMENT,
  `Event_Name` varchar(60) NOT NULL,
  `Event_head_id` int NOT NULL,
  `Venue` varchar(45) NOT NULL,
  `Date` date DEFAULT NULL,
  `Count_user` int DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `Event_head_id` (`Event_head_id`),
  CONSTRAINT `events_jssstu_ibfk_1` FOREIGN KEY (`Event_head_id`) REFERENCES `event_org` (`Event_head_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_jssstu`
--

LOCK TABLES `events_jssstu` WRITE;
/*!40000 ALTER TABLE `events_jssstu` DISABLE KEYS */;
INSERT INTO `events_jssstu` VALUES (16,'TECH made easy!',20,'IS SEMINAR HALL','2023-01-13',NULL,'Domains are the unique spaces on the internet where businesses or individuals can create a website. A domain name is like an address for your website. It helps people find your site on the internet. The importance of information technology is that it helps businesses or individuals communicate and share information. It can also help people find information or products they need.','https://i0.wp.com/pakscoop.com/wp-content/uploads/2018/04/Tech-1.jpg?fit=2100%2C1500&ssl=1'),(21,'Move and Groove 2.0',70,'Mech Audi','2022-12-10',NULL,'V’ in Velocity stands for VERSATILITY , and we’re known for our classy choreographies and dynamic performances. We love being on stage, competing at big competitions. \r\n             \r\n             We’re super excited to present to you Move and Groove 2.0 , the dance workshop. \r\n             Dancer or not, all are welcome! Come, join us to learn a banger choreography. Get your dancing shoes on and show up, you are going to have a lot of fun. We can’t wait to see you all in large numbers!!\r\n             ','https://media.istockphoto.com/vectors/dancing-couple-vector-id484791248?k=6&m=484791248&s=170667a&w=0&h=tPXP_jp6MF_8TNa7CcaX5mKQeH8-0vy_AETqvBbyXuA='),(23,'Suttur Jatra Mahotsav',40,'Suttur','2023-01-23',NULL,'The Adijagadguru Sri Shivarathreeshwara Shivayogi Jatra Mahotsav 2023 will be held at Suttur, from January 18 to 23.\r\n  \r\n  The jatra mahotsav was limited to just pooja programs from the last two years due to COVID-19 Pandemic. However, this year all the programs and activities, including utsavs, melas, competitions and cultural programs will be organized as usual.\r\n  \r\n  Heads of various maths, dignitaries and leaders will participate in the programs. All the arrangements including prasada, accommodation, etc., will be made.\r\n  \r\n  All the devotees and public are requested to take part in the jatra mahtosav and receive the blessings of the almighty.','https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2015/01/18/454071.gif?itok=4oB4fCi-'),(24,'Docker Demystified',50,'CS-103','2023-01-03',NULL,'Docker makes development efficient and predictable\r\nDocker takes away repetitive, mundane configuration tasks and is used throughout the development lifecycle for fast, easy and portable application development – desktop and cloud. Docker’s comprehensive end to end platform includes UIs, CLIs, APIs and security that are engineered to work together across the entire application delivery lifecycle.','https://th.bing.com/th/id/OIP.GSP20yKyWpKvqNekNiyiawHaEK?pid=ImgDet&rs=1'),(26,'Google Cloud Career Practisioners\' Campaign',10,'Online mode','2023-01-09',NULL,'Cloud Storage is a managed service for storing unstructured data. Store any amount of data and retrieve it as often as you like.','https://th.bing.com/th/id/OIP.0KKSemffDx4x5j-ktGD1XwHaEK?pid=ImgDet&rs=1');
/*!40000 ALTER TABLE `events_jssstu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finance_comittee`
--

DROP TABLE IF EXISTS `finance_comittee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finance_comittee` (
  `Finance_com_id` int NOT NULL,
  `com_name` varchar(45) NOT NULL,
  `Sponsers` varchar(45) DEFAULT NULL,
  `budget_limit` int DEFAULT NULL,
  `size_of_committee` int DEFAULT NULL,
  KEY `Finance_com_id` (`Finance_com_id`),
  CONSTRAINT `finance_comittee_ibfk_1` FOREIGN KEY (`Finance_com_id`) REFERENCES `event_org` (`Event_head_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finance_comittee`
--

LOCK TABLES `finance_comittee` WRITE;
/*!40000 ALTER TABLE `finance_comittee` DISABLE KEYS */;
INSERT INTO `finance_comittee` VALUES (10,'Sponsors and Public Relations','Dreamers Cafe',5000,3),(50,'Treasurer','FirangiSutra',3000,2),(20,'Executive Team','Kapoors cafe',4000,5),(30,'Sponsorship','SolidWorks',6500,4),(70,'Treasuring Comittee','Devdan Foundation',2000,8);
/*!40000 ALTER TABLE `finance_comittee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registers_to`
--

DROP TABLE IF EXISTS `registers_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registers_to` (
  `stud_id` varchar(25) NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`stud_id`,`event_id`),
  KEY `stud_id_idx` (`stud_id`),
  KEY `event_id_idx` (`event_id`),
  CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `events_jssstu` (`Event_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stud_id` FOREIGN KEY (`stud_id`) REFERENCES `user` (`Student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registers_to`
--

LOCK TABLES `registers_to` WRITE;
/*!40000 ALTER TABLE `registers_to` DISABLE KEYS */;
INSERT INTO `registers_to` VALUES ('021',16),('232',16),('234',16),('435',16),('436',16),('435',21),('826',21),('435',23),('826',23),('436',24),('436',26),('826',26);
/*!40000 ALTER TABLE `registers_to` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Student_id` varchar(25) NOT NULL,
  `user_email` varchar(25) NOT NULL,
  `user_phone_no` varchar(15) NOT NULL,
  `student_name` varchar(45) NOT NULL,
  `Dept_id` int NOT NULL DEFAULT '0',
  `password` varchar(60) DEFAULT NULL,
  `deptname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Student_id`),
  KEY `dept_for_idx` (`Dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('021','geetha@gmail.com','1234567898','geetha',5,'$2b$08$T1eY2btZAHMAMMCQEqQv.uybEnn4yawAECvNWtd0Ucf1qVgyvQ.Nu',NULL),('222','abc@a.com','12121212','trial',1,'$#$Acadcadcadc','CSE'),('232','manu@abc.com','999999999','manu',6,'$2b$08$M0TK715mXd0.3wvkQ2uDtuaehE7BvhpeOQS2Qmb4ryHwrt9W3bo1m',NULL),('234','harshitha@gmail.com','+918197251720','Harshitha',6,'$2b$08$FH68Yn4FXl8Ov5VpByUYPeGfjH7doIZPK7IDPHLbKraCgLtkMRim.',NULL),('435','svgr@gmail.com','1234567898','Raashi',3,'$2b$08$UfzZ6jXZVz4ePbYPvt9FE.0PPKqgx75moZfZMIPcvPDeuk2fXY8zS',NULL),('436','anushakadiga@gmail.com','+918197251720','Anusha',1,'$2b$08$/DFg1dV8IY4Bs.i6beqiFecp4gx53nUztoxXY0KvcGmw0krYq7ORG',NULL),('564','ananya123@gmail.com','9375728145','Ananya',6,'$2b$08$mdHgGEoxjsn/D6MAd4rPYOmDF.c59KwmOcVrYHVtP5RFl1S3qJhV6',NULL),('696','abc@a.com','12121212','trial',3,'$#$Acadcadcadc','ECE'),('768','yashas123@gmail.com','748362956','Yashas',4,'$2b$08$8xv87WW6ryX/m4PrU.nRsOSZzatJhlzGN9r2D5tUu0clitte2MfN2','ME'),('826','chaya123@gmail.com','8039264829','Chaya',6,'$2b$08$EXprp4ikTpp77xPBPjwJV.tJTczkqr.K3bkrcqTQb/7uiZb5iTYRW','Culturals');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-25  8:58:00
