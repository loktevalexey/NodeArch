-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: site_db
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

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
-- Current Database: `site_db`
--

/*!40000 DROP DATABASE IF EXISTS `site_db`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `site_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `site_db`;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код баннера',
  `html` text COMMENT 'HTML-код баннера',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='баннеры';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (12,'GOOGLE_ADSENSE','<div style=\"border: solid red 1px; background-color: lightyellow; padding: 20px\">баннер google adsense</div>'),(14,'AKAVITA_COUNTER','<div style=\"border: solid red 1px; background-color: lightyellow; padding: 20px\">баннер акавиты</div>');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block_types`
--

DROP TABLE IF EXISTS `block_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `block_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT 'название',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='типы блоков';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block_types`
--

LOCK TABLES `block_types` WRITE;
/*!40000 ALTER TABLE `block_types` DISABLE KEYS */;
INSERT INTO `block_types` VALUES (1,'HEADER','заголовок'),(2,'FORMATTED_TEXT','форматированный текст'),(3,'IMAGE','изображение'),(4,'WEATHER_FORECAST','прогноз погоды'),(5,'BANNER','баннер'),(6,'SEARCH','строка поиска'),(7,'URL_NEW_HEADER','новость из УРЛа: заголовок'),(8,'URL_NEW_TEXT','новость из УРЛа: контент'),(9,'CONTACTS','контакты'),(10,'CONTAINER_LTR','контейнер: укладка слева направо'),(11,'CONTAINER_2COL','контейнер: укладка в две колонки'),(12,'URL_INDPAGE_TEXT','содержимое страницы из УРЛа: контент'),(13,'NEWS_LIST','список новостей');
/*!40000 ALTER TABLE `block_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `comment` varchar(200) NOT NULL DEFAULT '' COMMENT 'комментарий (для слушателей курса)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='контенты';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES (11,'макет \"страница одной новости\", контент места \"реклама\"'),(22,'макет \"страница одной новости\", контент места \"шапка\"'),(33,'макет \"страница одной новости\", контент места \"подвал\"'),(44,'макет \"страница одной новости\", контент места \"новость из УРЛа\"'),(55,'макет \"индивидуальная страница\", контент места \"содержимое страницы из УРЛа\"'),(333,'контент индивидуальной страницы \"главная\"'),(444,'контент индивидуальной страницы \"список новостей\"'),(555,'контент новости \"goodmorning\"'),(566,'контент новости \"goodevening\"'),(777,'контент блока с укладкой слева направо на странице новости \"goodevening\"'),(888,'контент левой колонки в двухколоночном блоке в контенте новости \"goodevening\"'),(999,'контент правой колонки в двухколоночном блоке в контенте новости \"goodevening\"');
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contents_blocks`
--

DROP TABLE IF EXISTS `contents_blocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents_blocks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `content` int(11) unsigned DEFAULT '0' COMMENT 'контент, которому принадлежит блок',
  `content_ord` int(11) NOT NULL DEFAULT '0' COMMENT 'порядок расположения блока внутри контента',
  `block_type` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT 'тип блока',
  `block_attributes` mediumtext COMMENT 'атрибуты блока (для каждого типа блока свои!)',
  PRIMARY KEY (`id`),
  KEY `contents_blocks_c_co_i` (`content`,`content_ord`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='блоки в контентах';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents_blocks`
--

LOCK TABLES `contents_blocks` WRITE;
/*!40000 ALTER TABLE `contents_blocks` DISABLE KEYS */;
INSERT INTO `contents_blocks` VALUES (1,22,1,6,NULL),(2,11,1,5,'{\"banner\":12}'),(3,11,2,5,'{\"banner\":14}'),(4,33,1,9,NULL),(5,44,1,7,NULL),(6,44,2,8,NULL),(7,555,1,1,'{\"text\":\"Всем привет!\"}'),(9,555,2,2,'{\"text\":\"С <b>давних</b> времён...\"}'),(10,555,3,2,'{\"text\":\"Но с <i>недавних</i> пор...\"}'),(11,555,4,3,'{\"image\":1}'),(12,555,5,4,'{\"location\":\"Минск\",\"period\":\"неделя\"}'),(13,555,6,2,'{\"text\":\"Всего вам доброго!\"}'),(14,566,1,1,'{\"text\":\"Снова всем привет!\"}'),(15,566,2,2,'{\"text\":\"С <b>давних</b> времён...\"}'),(16,566,3,10,'{\"content\":777}'),(17,777,1,3,'{\"image\":1}'),(18,777,2,4,'{\"location\":\"Минск\",\"period\":\"неделя\"}'),(19,566,4,11,'{\"content1\":888,\"content2\":999}'),(20,888,2,3,'{\"image\":1}'),(21,888,1,2,'{\"text\":\"А вот картинка дня:\"}'),(22,999,1,4,'{\"location\":\"Минск\",\"period\":\"неделя\"}'),(23,999,2,2,'{\"text\":\"важней всего погода в доме!\"}'),(24,333,0,1,'{\"text\":\"Добро пожаловать на наш сайт!\"}'),(25,444,0,2,'{\"text\":\"текст для новостей\"}'),(26,55,1,12,NULL),(27,333,1,2,'{\"text\":\"Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Если вас интересует прогноз погоды по региону Минск, период - неделя, вам к нам! / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт!\"}'),(28,444,1,13,NULL);
/*!40000 ALTER TABLE `contents_blocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код изображения',
  `url` varchar(200) NOT NULL DEFAULT '' COMMENT 'локальный путь к изображению',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='изображения';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'SUNRISING','/images/sunrising.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `index_urls`
--

DROP TABLE IF EXISTS `index_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `index_urls` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url` varchar(200) NOT NULL DEFAULT '' COMMENT 'URL страницы',
  `title` varchar(250) NOT NULL DEFAULT '' COMMENT 'title страницы',
  `group_code` varchar(10) NOT NULL DEFAULT '' COMMENT 'группа УРЛов - indpage, new...',
  `group_params` varchar(250) NOT NULL DEFAULT '' COMMENT 'параметры группы УРЛа в формате JSON - код для УРЛа индивидуальной страницы, код для УРЛа новости...',
  `html_crc` varchar(64) NOT NULL DEFAULT '' COMMENT 'CRC сырого содержимого УРЛа',
  `clean_txt` mediumtext COMMENT 'содержимое УРЛа с вычищенными тегами',
  `add_dt` datetime NOT NULL COMMENT 'дата-время добавления УРЛа в этот список',
  `actual_flag` smallint(6) NOT NULL DEFAULT '0' COMMENT 'признак для быстрого обнаружения неактуальных УРЛов',
  `last_render_dt` datetime NOT NULL COMMENT 'дата-время последнего формирования сырого содержимого УРЛа',
  `last_modification_dt` datetime NOT NULL COMMENT 'дата-время последнего изменения сырого содержимого УРЛа',
  PRIMARY KEY (`id`),
  KEY `index_urls_url_i` (`url`),
  KEY `index_urls_af_i` (`actual_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='проиндексированные УРЛы сайта (sitemap.xml + внутренний поиск)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `index_urls`
--

LOCK TABLES `index_urls` WRITE;
/*!40000 ALTER TABLE `index_urls` DISABLE KEYS */;
INSERT INTO `index_urls` VALUES (40,'/main','главная','indpage','{\"indPageURLCode\":\"main\"}','d658e6dd0777d90f91da978806154b8e993ababe35754152c26a3f6c65f606e5',NULL,'2019-10-23 16:07:02',1,'2019-10-23 16:07:19','2019-10-23 16:07:02'),(41,'/news','новости','indpage','{\"indPageURLCode\":\"news\"}','13944bdcbadc2de7ef58eaf4073da04e28f3e27dc8da24466be8e37ee30fe158',NULL,'2019-10-23 16:07:02',1,'2019-10-23 16:07:19','2019-10-23 16:07:02'),(42,'/new/goodevening','Новость - Доброго вечера всем!','new','{\"newURLCode\":\"goodevening\"}','ee64ac7a90a3c0de234874e37715bcdbba1503b11bf1116b95a4fbb2db43ca23',NULL,'2019-10-23 16:07:02',1,'2019-10-23 16:07:19','2019-10-23 16:07:19'),(43,'/new/goodmorning','Новость - С добрым утром, Минск!','new','{\"newURLCode\":\"goodmorning\"}','87b60483a3e3b7bffe9868ad0cd42058bf03b7ff2b1fb6f85a1caf85998983b2',NULL,'2019-10-23 16:07:02',1,'2019-10-23 16:07:19','2019-10-23 16:07:02');
/*!40000 ALTER TABLE `index_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `index_urls_words`
--

DROP TABLE IF EXISTS `index_urls_words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `index_urls_words` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `index_url` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'УРЛ сайта (id в index_urls)',
  `clean_txt_index` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'индекс начала слова в clean_txt содержимого УРЛа',
  `word` varchar(10) NOT NULL DEFAULT '' COMMENT 'слово',
  PRIMARY KEY (`id`),
  KEY `index_urls_words_iu_cti_i` (`index_url`,`clean_txt_index`)
) ENGINE=InnoDB AUTO_INCREMENT=1909 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='проиндексированные слова УРЛов сайта (внутренний поиск)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `index_urls_words`
--

LOCK TABLES `index_urls_words` WRITE;
/*!40000 ALTER TABLE `index_urls_words` DISABLE KEYS */;
INSERT INTO `index_urls_words` VALUES (1633,40,9,'ГЛАВНАЯ'),(1634,40,25,'ШАПКА'),(1635,40,40,'СОДЕРЖИМОЕ'),(1636,40,51,'СТРАНИЦЫ'),(1637,40,63,'УРЛА'),(1638,40,70,'ДОБРО'),(1639,40,76,'ПОЖАЛОВАТЬ'),(1640,40,94,'САЙТ'),(1641,40,102,'ДОБРО'),(1642,40,108,'ПОЖАЛОВАТЬ'),(1643,40,126,'САЙТ'),(1644,40,133,'ДОБРО'),(1645,40,139,'ПОЖАЛОВАТЬ'),(1646,40,157,'САЙТ'),(1647,40,164,'ДОБРО'),(1648,40,170,'ПОЖАЛОВАТЬ'),(1649,40,188,'САЙТ'),(1650,40,195,'ДОБРО'),(1651,40,201,'ПОЖАЛОВАТЬ'),(1652,40,219,'САЙТ'),(1653,40,226,'ДОБРО'),(1654,40,232,'ПОЖАЛОВАТЬ'),(1655,40,250,'САЙТ'),(1656,40,257,'ДОБРО'),(1657,40,263,'ПОЖАЛОВАТЬ'),(1658,40,281,'САЙТ'),(1659,40,288,'ДОБРО'),(1660,40,294,'ПОЖАЛОВАТЬ'),(1661,40,312,'САЙТ'),(1662,40,319,'ДОБРО'),(1663,40,325,'ПОЖАЛОВАТЬ'),(1664,40,343,'САЙТ'),(1665,40,350,'ДОБРО'),(1666,40,356,'ПОЖАЛОВАТЬ'),(1667,40,374,'САЙТ'),(1668,40,381,'ДОБРО'),(1669,40,387,'ПОЖАЛОВАТЬ'),(1670,40,405,'САЙТ'),(1671,40,412,'ДОБРО'),(1672,40,418,'ПОЖАЛОВАТЬ'),(1673,40,436,'САЙТ'),(1674,40,443,'ДОБРО'),(1675,40,449,'ПОЖАЛОВАТЬ'),(1676,40,467,'САЙТ'),(1677,40,474,'ДОБРО'),(1678,40,480,'ПОЖАЛОВАТЬ'),(1679,40,498,'САЙТ'),(1680,40,505,'ДОБРО'),(1681,40,511,'ПОЖАЛОВАТЬ'),(1682,40,529,'САЙТ'),(1683,40,536,'ДОБРО'),(1684,40,542,'ПОЖАЛОВАТЬ'),(1685,40,560,'САЙТ'),(1686,40,567,'ДОБРО'),(1687,40,573,'ПОЖАЛОВАТЬ'),(1688,40,591,'САЙТ'),(1689,40,598,'ДОБРО'),(1690,40,604,'ПОЖАЛОВАТЬ'),(1691,40,622,'САЙТ'),(1692,40,629,'ДОБРО'),(1693,40,635,'ПОЖАЛОВАТЬ'),(1694,40,653,'САЙТ'),(1695,40,660,'ДОБРО'),(1696,40,666,'ПОЖАЛОВАТЬ'),(1697,40,684,'САЙТ'),(1698,40,691,'ДОБРО'),(1699,40,697,'ПОЖАЛОВАТЬ'),(1700,40,715,'САЙТ'),(1701,40,722,'ДОБРО'),(1702,40,728,'ПОЖАЛОВАТЬ'),(1703,40,746,'САЙТ'),(1704,40,753,'ДОБРО'),(1705,40,759,'ПОЖАЛОВАТЬ'),(1706,40,777,'САЙТ'),(1707,40,784,'ДОБРО'),(1708,40,790,'ПОЖАЛОВАТЬ'),(1709,40,808,'САЙТ'),(1710,40,815,'ДОБРО'),(1711,40,821,'ПОЖАЛОВАТЬ'),(1712,40,839,'САЙТ'),(1713,40,846,'ДОБРО'),(1714,40,852,'ПОЖАЛОВАТЬ'),(1715,40,870,'САЙТ'),(1716,40,877,'ДОБРО'),(1717,40,883,'ПОЖАЛОВАТЬ'),(1718,40,901,'САЙТ'),(1719,40,908,'ДОБРО'),(1720,40,914,'ПОЖАЛОВАТЬ'),(1721,40,932,'САЙТ'),(1722,40,939,'ДОБРО'),(1723,40,945,'ПОЖАЛОВАТЬ'),(1724,40,963,'САЙТ'),(1725,40,970,'ДОБРО'),(1726,40,976,'ПОЖАЛОВАТЬ'),(1727,40,994,'САЙТ'),(1728,40,1001,'ДОБРО'),(1729,40,1007,'ПОЖАЛОВАТЬ'),(1730,40,1025,'САЙТ'),(1731,40,1032,'ДОБРО'),(1732,40,1038,'ПОЖАЛОВАТЬ'),(1733,40,1056,'САЙТ'),(1734,40,1063,'ДОБРО'),(1735,40,1069,'ПОЖАЛОВАТЬ'),(1736,40,1087,'САЙТ'),(1737,40,1094,'ДОБРО'),(1738,40,1100,'ПОЖАЛОВАТЬ'),(1739,40,1118,'САЙТ'),(1740,40,1125,'ДОБРО'),(1741,40,1131,'ПОЖАЛОВАТЬ'),(1742,40,1149,'САЙТ'),(1743,40,1156,'ДОБРО'),(1744,40,1162,'ПОЖАЛОВАТЬ'),(1745,40,1180,'САЙТ'),(1746,40,1187,'ЕСЛИ'),(1747,40,1196,'ИНТЕРЕСУЕТ'),(1748,40,1207,'ПРОГНОЗ'),(1749,40,1215,'ПОГОДЫ'),(1750,40,1225,'РЕГИОНУ'),(1751,40,1233,'МИНСК'),(1752,40,1240,'ПЕРИОД'),(1753,40,1249,'НЕДЕЛЯ'),(1754,40,1270,'ДОБРО'),(1755,40,1276,'ПОЖАЛОВАТЬ'),(1756,40,1294,'САЙТ'),(1757,40,1301,'ДОБРО'),(1758,40,1307,'ПОЖАЛОВАТЬ'),(1759,40,1325,'САЙТ'),(1760,40,1338,'ПОДВАЛ'),(1761,40,1347,'НАШИ'),(1762,40,1352,'КОНТАКТЫ'),(1763,40,1384,'ЛУЧШИЕ'),(1764,40,1391,'СТРАНИЦЫ'),(1765,40,1402,'ГЛАВНАЯ'),(1766,40,1410,'СТРАНИЦА'),(1767,40,1421,'НОВОСТИ'),(1768,41,9,'НОВОСТИ'),(1769,41,25,'ШАПКА'),(1770,41,40,'СОДЕРЖИМОЕ'),(1771,41,51,'СТРАНИЦЫ'),(1772,41,63,'УРЛА'),(1773,41,70,'ТЕКСТ'),(1774,41,80,'НОВОСТЕЙ'),(1775,41,92,'НОВОСТИ'),(1776,41,105,'ДОБРЫМ'),(1777,41,112,'УТРОМ'),(1778,41,119,'МИНСК'),(1779,41,128,'ДОБРОГО'),(1780,41,136,'ВЕЧЕРА'),(1781,41,143,'ВСЕМ'),(1782,41,161,'ПОДВАЛ'),(1783,41,170,'НАШИ'),(1784,41,175,'КОНТАКТЫ'),(1785,41,207,'ЛУЧШИЕ'),(1786,41,214,'СТРАНИЦЫ'),(1787,41,225,'ГЛАВНАЯ'),(1788,41,233,'СТРАНИЦА'),(1789,41,244,'НОВОСТИ'),(1832,43,9,'НОВОСТЬ'),(1833,43,21,'ДОБРЫМ'),(1834,43,28,'УТРОМ'),(1835,43,35,'МИНСК'),(1836,43,50,'ШАПКА'),(1837,43,65,'РЕКЛАМА'),(1838,43,75,'БАННЕР'),(1839,43,82,'GOOGLE'),(1840,43,89,'ADSENSE'),(1841,43,99,'БАННЕР'),(1842,43,106,'АКАВИТЫ'),(1843,43,118,'НОВОСТЬ'),(1844,43,129,'УРЛА'),(1845,43,138,'ДОБРЫМ'),(1846,43,145,'УТРОМ'),(1847,43,152,'МИНСК'),(1848,43,161,'ВСЕМ'),(1849,43,166,'ПРИВЕТ'),(1850,43,179,'ДАВНИХ'),(1851,43,187,'ВРЕМЁН'),(1852,43,205,'НЕДАВНИХ'),(1853,43,226,'ГОРОД'),(1854,43,233,'МИНСК'),(1855,43,240,'ПЕРИОД'),(1856,43,248,'НЕДЕЛЯ'),(1857,43,264,'ВСЕГО'),(1858,43,274,'ДОБРОГО'),(1859,43,290,'ПОДВАЛ'),(1860,43,299,'НАШИ'),(1861,43,304,'КОНТАКТЫ'),(1862,43,336,'ЛУЧШИЕ'),(1863,43,343,'СТРАНИЦЫ'),(1864,43,354,'ГЛАВНАЯ'),(1865,43,362,'СТРАНИЦА'),(1866,43,373,'НОВОСТИ'),(1867,42,9,'НОВОСТЬ'),(1868,42,19,'ДОБРОГО'),(1869,42,27,'ВЕЧЕРА'),(1870,42,34,'ВСЕМ'),(1871,42,48,'ШАПКА'),(1872,42,63,'РЕКЛАМА'),(1873,42,73,'БАННЕР'),(1874,42,80,'GOOGLE'),(1875,42,87,'ADSENSE'),(1876,42,97,'БАННЕР'),(1877,42,104,'АКАВИТЫ'),(1878,42,116,'НОВОСТЬ'),(1879,42,127,'УРЛА'),(1880,42,134,'ДОБРОГО'),(1881,42,142,'ВЕЧЕРА'),(1882,42,149,'ВСЕМ'),(1883,42,157,'СНОВА'),(1884,42,163,'ВСЕМ'),(1885,42,168,'ПРИВЕТ'),(1886,42,181,'ДАВНИХ'),(1887,42,189,'ВРЕМЁН'),(1888,42,210,'ГОРОД'),(1889,42,217,'МИНСК'),(1890,42,224,'ПЕРИОД'),(1891,42,232,'НЕДЕЛЯ'),(1892,42,273,'КАРТИНКА'),(1893,42,295,'ГОРОД'),(1894,42,302,'МИНСК'),(1895,42,309,'ПЕРИОД'),(1896,42,317,'НЕДЕЛЯ'),(1897,42,333,'ВАЖНЕЙ'),(1898,42,340,'ВСЕГО'),(1899,42,346,'ПОГОДА'),(1900,42,355,'ДОМЕ'),(1901,42,382,'ПОДВАЛ'),(1902,42,391,'НАШИ'),(1903,42,396,'КОНТАКТЫ'),(1904,42,428,'ЛУЧШИЕ'),(1905,42,435,'СТРАНИЦЫ'),(1906,42,446,'ГЛАВНАЯ'),(1907,42,454,'СТРАНИЦА'),(1908,42,465,'НОВОСТИ');
/*!40000 ALTER TABLE `index_urls_words` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indpages`
--

DROP TABLE IF EXISTS `indpages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indpages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url_code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код для УРЛа',
  `content` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'контент страницы',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT 'текст для title',
  `metakeywords` text NOT NULL COMMENT 'ключевые слова для meta keywords',
  `metadescription` text NOT NULL COMMENT 'текст для meta description',
  PRIMARY KEY (`id`),
  KEY `news_uc_i` (`url_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='индивидуальные страницы';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indpages`
--

LOCK TABLES `indpages` WRITE;
/*!40000 ALTER TABLE `indpages` DISABLE KEYS */;
INSERT INTO `indpages` VALUES (1,'main',333,'главная','погода, новости, настроение','наш самый лучший сайт с новостями и прогнозом погоды'),(2,'news',444,'новости','новости','новости о погоде');
/*!40000 ALTER TABLE `indpages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'идентификатор',
  `url_code` varchar(50) NOT NULL DEFAULT '' COMMENT 'код для УРЛа',
  `header` varchar(200) NOT NULL DEFAULT '' COMMENT 'заголовок новости (и он же в title)',
  `content` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'текст новости (контент)',
  `metakeywords` text NOT NULL COMMENT 'ключевые слова для meta keywords',
  `metadescription` text NOT NULL COMMENT 'текст для meta description',
  PRIMARY KEY (`id`),
  KEY `news_uc_i` (`url_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='новости';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'goodmorning','С добрым утром, Минск!',555,'доброе утро, приветствие','поздравление с добрым утром'),(2,'goodevening','Доброго вечера всем!',566,'добрый вечер, приветствие','пожелание доброго вечера');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-26 14:31:42
