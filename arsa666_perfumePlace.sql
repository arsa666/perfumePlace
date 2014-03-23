-- MySQL dump 10.13  Distrib 5.5.35, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: arsa666_perfumePlace
-- ------------------------------------------------------
-- Server version	5.5.35-0ubuntu0.13.10.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ClienteCredito`
--

DROP TABLE IF EXISTS `ClienteCredito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClienteCredito` (
  `cedula` varchar(50) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `celular` varchar(50) NOT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClienteCredito`
--

LOCK TABLES `ClienteCredito` WRITE;
/*!40000 ALTER TABLE `ClienteCredito` DISABLE KEYS */;
INSERT INTO `ClienteCredito` VALUES ('324324','234234','234234');
/*!40000 ALTER TABLE `ClienteCredito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Credito`
--

DROP TABLE IF EXISTS `Credito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Credito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCliente` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `numeroCliento` int(11) NOT NULL,
  `dirreccion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Credito`
--

LOCK TABLES `Credito` WRITE;
/*!40000 ALTER TABLE `Credito` DISABLE KEYS */;
/*!40000 ALTER TABLE `Credito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MercanciaAfuera`
--

DROP TABLE IF EXISTS `MercanciaAfuera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MercanciaAfuera` (
  `id` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `MercanciaAfuera_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MercanciaAfuera`
--

LOCK TABLES `MercanciaAfuera` WRITE;
/*!40000 ALTER TABLE `MercanciaAfuera` DISABLE KEYS */;
INSERT INTO `MercanciaAfuera` VALUES ('10','Perry Ellis',57),('54444','54444',4);
/*!40000 ALTER TABLE `MercanciaAfuera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MercanciaBodega`
--

DROP TABLE IF EXISTS `MercanciaBodega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MercanciaBodega` (
  `id` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `MercanciaBodega_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MercanciaBodega`
--

LOCK TABLES `MercanciaBodega` WRITE;
/*!40000 ALTER TABLE `MercanciaBodega` DISABLE KEYS */;
INSERT INTO `MercanciaBodega` VALUES ('10','10',354),('3','3',13),('333','2',10),('54444','test',0),('555','2',4);
/*!40000 ALTER TABLE `MercanciaBodega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Productos`
--

DROP TABLE IF EXISTS `Productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Productos` (
  `id` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Productos`
--

LOCK TABLES `Productos` WRITE;
/*!40000 ALTER TABLE `Productos` DISABLE KEYS */;
INSERT INTO `Productos` VALUES ('10','Perry Ellis'),('3','3'),('3232','dsfgddf'),('333','333'),('54444','54444'),('555','5555');
/*!40000 ALTER TABLE `Productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VentasDiarias`
--

DROP TABLE IF EXISTS `VentasDiarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VentasDiarias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coid` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `precioVenta` float NOT NULL,
  `cantidad` smallint(6) NOT NULL DEFAULT '1',
  `tipoVenta` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
  `total` float NOT NULL,
  `nombreCliente` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `numeroCliente` int(11) NOT NULL DEFAULT '0',
  `formaPago` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Efectivo',
  `otroAlmacen` varchar(50) COLLATE utf8_unicode_ci DEFAULT '   ',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VentasDiarias`
--

LOCK TABLES `VentasDiarias` WRITE;
/*!40000 ALTER TABLE `VentasDiarias` DISABLE KEYS */;
INSERT INTO `VentasDiarias` VALUES (13,'54444','54444','2014-03-04 02:53:29',10,3,'A',0,'',0,'Efectivo',''),(12,'10','10','2014-03-04 02:52:04',10,1,'A',208,'',0,'Efectivo',''),(14,'10','10','2014-03-04 06:47:21',10,1,'A',207,'',0,'Efectivo',''),(15,'54444','54444','2014-03-04 06:54:12',10,1,'B',4,'',0,'Efectivo',''),(16,'10','10','2014-03-04 07:21:14',10,1,'B',206,'',0,'OtroAlmacen',''),(17,'10','10','2014-03-04 07:29:31',10,1,'B',205,'',0,'OtroAlmacen',''),(18,'10','10','2014-03-04 07:34:49',10,1,'B',204,'',0,'OtroAlmacen',NULL),(19,'10','10','2014-03-04 07:36:15',10,1,'B',203,'',0,'OtroAlmacen','saleem'),(20,'10','10','2014-03-04 07:38:02',10,1,'A',202,'',0,'Efectivo',''),(21,'10','10','2014-03-04 07:38:20',10,1,'B',201,'',0,'OtroAlmacen','saleem'),(22,'10','Perry Ellis','2014-03-05 18:21:47',10,1,'A',200,'',0,'Efectivo',''),(23,'10','Perry Ellis','2014-03-05 18:27:52',10,1,'A',199,'',0,'Efectivo',''),(24,'10','Perry Ellis33333','2014-03-13 07:38:33',3,1,'A',198,'',0,'Efectivo',''),(25,'10','Perry Ellis','2014-03-13 09:54:08',10,1,'B',197,'cliente 3',423243242,'Credito',''),(26,'10','Perry Ellis','2014-03-17 05:55:26',30,1,'B',196,'',0,'Tarjeta',''),(27,'10','Perry Ellis','2014-03-18 01:50:33',40,1,'B',195,'',0,'Efectivo',''),(28,'10','Perry Ellis','2014-03-18 02:14:48',10,1,'A',194,'',0,'Efectivo',''),(29,'10','Perry Ellis','2014-03-18 02:17:43',10,1,'A',193,'',0,'Efectivo',''),(30,'10','Perry Ellis','2014-03-18 03:07:54',10,1,'A',192,'',0,'Efectivo',''),(31,'10','Perry Ellis','2014-03-18 03:09:09',10,1,'A',191,'',0,'Efectivo',''),(32,'10','Perry Ellis','2014-03-18 03:13:18',10,111,'A',80,'',0,'Efectivo',''),(33,'10','Perry Ellis','2014-03-18 03:16:05',10,1,'A',79,'',0,'Efectivo',''),(34,'10','Perry Ellis','2014-03-18 03:21:03',10,1,'A',78,'',0,'Efectivo',''),(35,'10','Perry Ellis','2014-03-18 03:23:56',10,1,'A',77,'',0,'Efectivo',''),(36,'10','Perry Ellis','2014-03-18 03:45:10',10,1,'A',76,'',0,'Efectivo',''),(37,'10','Perry Ellis','2014-03-18 03:45:42',10,1,'A',75,'',0,'Efectivo',''),(38,'10','Perry Ellis','2014-03-18 03:46:39',10,1,'A',74,'',0,'Efectivo',''),(39,'10','Perry Ellis','2014-03-18 03:47:13',10,1,'A',73,'',0,'Efectivo',''),(40,'10','Este codigo no existe','2014-03-18 03:49:27',10,1,'A',72,'',0,'Efectivo',''),(41,'10','Perry Ellis','2014-03-18 03:49:54',10,1,'A',71,'',0,'Efectivo',''),(42,'10','Perry Ellis','2014-03-18 03:51:48',10,1,'A',70,'',0,'Efectivo',''),(43,'10','Perry Ellis','2014-03-20 23:45:42',10,1,'A',69,'',0,'Efectivo',''),(44,'10','Perry Ellis','2014-03-20 23:47:01',10,1,'A',68,'',0,'Efectivo',''),(45,'10','Perry Ellis','2014-03-20 23:48:54',10,10,'B',58,'',0,'Efectivo',''),(46,'10','Perry Ellis','2014-03-20 23:49:17',10,1,'A',57,'',0,'Efectivo','');
/*!40000 ALTER TABLE `VentasDiarias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-03-23 17:53:38
