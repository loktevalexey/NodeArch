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
INSERT INTO `contents_blocks` VALUES (1,22,1,6,NULL),(2,11,1,5,'{\"banner\":12}'),(3,11,2,5,'{\"banner\":14}'),(4,33,1,9,NULL),(5,44,1,7,NULL),(6,44,2,8,NULL),(7,555,1,1,'{\"text\":\"Всем привет!\"}'),(9,555,2,2,'{\"text\":\"С <b>давних</b> времён...\"}'),(10,555,3,2,'{\"text\":\"Но с <i>недавних</i> пор...\"}'),(11,555,4,3,'{\"image\":1}'),(12,555,5,4,'{\"location\":\"Минск\",\"period\":\"неделя\"}'),(13,555,6,2,'{\"text\":\"Всего вам доброго!\"}'),(14,566,1,1,'{\"text\":\"Снова всем привет!\"}'),(15,566,2,2,'{\"text\":\"С <b>давних</b> времён...\"}'),(16,566,3,10,'{\"content\":777}'),(17,777,1,3,'{\"image\":1}'),(18,777,2,4,'{\"location\":\"Минск\",\"period\":\"неделя\"}'),(19,566,4,11,'{\"content1\":888,\"content2\":999}'),(20,888,2,3,'{\"image\":1}'),(21,888,1,2,'{\"text\":\"А вот картинка дня:\"}'),(22,999,1,4,'{\"location\":\"Минск\",\"period\":\"неделя\"}'),(23,999,2,2,'{\"text\":\"важней всего погода в доме!\"}'),(24,333,0,1,'{\"text\":\"Добро пожаловать на наш сайт!\"}'),(25,444,0,2,'{\"text\":\"текст для новостей\"}'),(26,55,1,12,NULL),(27,333,1,2,'{\"text\":\"Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт / Добро пожаловать на наш сайт!\"}'),(28,444,1,13,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='проиндексированные УРЛы сайта (sitemap.xml + внутренний поиск)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `index_urls`
--

LOCK TABLES `index_urls` WRITE;
/*!40000 ALTER TABLE `index_urls` DISABLE KEYS */;
INSERT INTO `index_urls` VALUES (36,'/main','indpage','{\"indPageURLCode\":\"main\"}','2e02fedb192e690f67cfa3a29a102c8b5c98e73f16e4fead7830ce231c9f077e',NULL,'2019-10-23 05:10:17',1,'2019-10-23 05:10:17','2019-10-23 05:10:17'),(37,'/news','indpage','{\"indPageURLCode\":\"news\"}','e7d28f925598e1cf4becffff730318cb65a7f04132d5a45a5e70e077639257a7',NULL,'2019-10-23 05:10:17',1,'2019-10-23 05:10:17','2019-10-23 05:10:17'),(38,'/new/goodevening','new','{\"newURLCode\":\"goodevening\"}','ee64ac7a90a3c0de234874e37715bcdbba1503b11bf1116b95a4fbb2db43ca23',NULL,'2019-10-23 05:10:17',1,'2019-10-23 05:10:17','2019-10-23 05:10:17'),(39,'/new/goodmorning','new','{\"newURLCode\":\"goodmorning\"}','9672da24c5118800408bc0550ec2e4d6b1b080ef82f90c75e97d05544dc67516',NULL,'2019-10-23 05:10:17',1,'2019-10-23 05:10:17','2019-10-23 05:10:17');
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
) ENGINE=InnoDB AUTO_INCREMENT=673 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='проиндексированные слова УРЛов сайта (внутренний поиск)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `index_urls_words`
--

LOCK TABLES `index_urls_words` WRITE;
/*!40000 ALTER TABLE `index_urls_words` DISABLE KEYS */;
INSERT INTO `index_urls_words` VALUES (447,36,9,'ГЛАВНАЯ'),(448,36,25,'ШАПКА'),(449,36,40,'СОДЕРЖИМОЕ'),(450,36,51,'СТРАНИЦЫ'),(451,36,63,'УРЛА'),(452,36,70,'ДОБРО'),(453,36,76,'ПОЖАЛОВАТЬ'),(454,36,94,'САЙТ'),(455,36,102,'ДОБРО'),(456,36,108,'ПОЖАЛОВАТЬ'),(457,36,126,'САЙТ'),(458,36,133,'ДОБРО'),(459,36,139,'ПОЖАЛОВАТЬ'),(460,36,157,'САЙТ'),(461,36,164,'ДОБРО'),(462,36,170,'ПОЖАЛОВАТЬ'),(463,36,188,'САЙТ'),(464,36,195,'ДОБРО'),(465,36,201,'ПОЖАЛОВАТЬ'),(466,36,219,'САЙТ'),(467,36,226,'ДОБРО'),(468,36,232,'ПОЖАЛОВАТЬ'),(469,36,250,'САЙТ'),(470,36,257,'ДОБРО'),(471,36,263,'ПОЖАЛОВАТЬ'),(472,36,281,'САЙТ'),(473,36,288,'ДОБРО'),(474,36,294,'ПОЖАЛОВАТЬ'),(475,36,312,'САЙТ'),(476,36,319,'ДОБРО'),(477,36,325,'ПОЖАЛОВАТЬ'),(478,36,343,'САЙТ'),(479,36,350,'ДОБРО'),(480,36,356,'ПОЖАЛОВАТЬ'),(481,36,374,'САЙТ'),(482,36,381,'ДОБРО'),(483,36,387,'ПОЖАЛОВАТЬ'),(484,36,405,'САЙТ'),(485,36,412,'ДОБРО'),(486,36,418,'ПОЖАЛОВАТЬ'),(487,36,436,'САЙТ'),(488,36,443,'ДОБРО'),(489,36,449,'ПОЖАЛОВАТЬ'),(490,36,467,'САЙТ'),(491,36,474,'ДОБРО'),(492,36,480,'ПОЖАЛОВАТЬ'),(493,36,498,'САЙТ'),(494,36,505,'ДОБРО'),(495,36,511,'ПОЖАЛОВАТЬ'),(496,36,529,'САЙТ'),(497,36,536,'ДОБРО'),(498,36,542,'ПОЖАЛОВАТЬ'),(499,36,560,'САЙТ'),(500,36,567,'ДОБРО'),(501,36,573,'ПОЖАЛОВАТЬ'),(502,36,591,'САЙТ'),(503,36,598,'ДОБРО'),(504,36,604,'ПОЖАЛОВАТЬ'),(505,36,622,'САЙТ'),(506,36,629,'ДОБРО'),(507,36,635,'ПОЖАЛОВАТЬ'),(508,36,653,'САЙТ'),(509,36,660,'ДОБРО'),(510,36,666,'ПОЖАЛОВАТЬ'),(511,36,684,'САЙТ'),(512,36,691,'ДОБРО'),(513,36,697,'ПОЖАЛОВАТЬ'),(514,36,715,'САЙТ'),(515,36,722,'ДОБРО'),(516,36,728,'ПОЖАЛОВАТЬ'),(517,36,746,'САЙТ'),(518,36,753,'ДОБРО'),(519,36,759,'ПОЖАЛОВАТЬ'),(520,36,777,'САЙТ'),(521,36,784,'ДОБРО'),(522,36,790,'ПОЖАЛОВАТЬ'),(523,36,808,'САЙТ'),(524,36,815,'ДОБРО'),(525,36,821,'ПОЖАЛОВАТЬ'),(526,36,839,'САЙТ'),(527,36,846,'ДОБРО'),(528,36,852,'ПОЖАЛОВАТЬ'),(529,36,870,'САЙТ'),(530,36,877,'ДОБРО'),(531,36,883,'ПОЖАЛОВАТЬ'),(532,36,901,'САЙТ'),(533,36,908,'ДОБРО'),(534,36,914,'ПОЖАЛОВАТЬ'),(535,36,932,'САЙТ'),(536,36,939,'ДОБРО'),(537,36,945,'ПОЖАЛОВАТЬ'),(538,36,963,'САЙТ'),(539,36,970,'ДОБРО'),(540,36,976,'ПОЖАЛОВАТЬ'),(541,36,994,'САЙТ'),(542,36,1001,'ДОБРО'),(543,36,1007,'ПОЖАЛОВАТЬ'),(544,36,1025,'САЙТ'),(545,36,1032,'ДОБРО'),(546,36,1038,'ПОЖАЛОВАТЬ'),(547,36,1056,'САЙТ'),(548,36,1063,'ДОБРО'),(549,36,1069,'ПОЖАЛОВАТЬ'),(550,36,1087,'САЙТ'),(551,36,1094,'ДОБРО'),(552,36,1100,'ПОЖАЛОВАТЬ'),(553,36,1118,'САЙТ'),(554,36,1125,'ДОБРО'),(555,36,1131,'ПОЖАЛОВАТЬ'),(556,36,1149,'САЙТ'),(557,36,1156,'ДОБРО'),(558,36,1162,'ПОЖАЛОВАТЬ'),(559,36,1180,'САЙТ'),(560,36,1187,'ДОБРО'),(561,36,1193,'ПОЖАЛОВАТЬ'),(562,36,1211,'САЙТ'),(563,36,1218,'ДОБРО'),(564,36,1224,'ПОЖАЛОВАТЬ'),(565,36,1242,'САЙТ'),(566,36,1255,'ПОДВАЛ'),(567,36,1264,'НАШИ'),(568,36,1269,'КОНТАКТЫ'),(569,36,1301,'ЛУЧШИЕ'),(570,36,1308,'СТРАНИЦЫ'),(571,36,1319,'ГЛАВНАЯ'),(572,36,1327,'СТРАНИЦА'),(573,36,1338,'НОВОСТИ'),(574,37,9,'НОВОСТИ'),(575,37,25,'ШАПКА'),(576,37,40,'СОДЕРЖИМОЕ'),(577,37,51,'СТРАНИЦЫ'),(578,37,63,'УРЛА'),(579,37,70,'ТЕКСТ'),(580,37,80,'НОВОСТЕЙ'),(581,37,92,'НОВОСТИ'),(582,37,105,'ДОБРЫМ'),(583,37,112,'УТРОМ'),(584,37,118,'ВСЕХ'),(585,37,126,'ДОБРОГО'),(586,37,134,'ВЕЧЕРА'),(587,37,141,'ВСЕМ'),(588,37,159,'ПОДВАЛ'),(589,37,168,'НАШИ'),(590,37,173,'КОНТАКТЫ'),(591,37,205,'ЛУЧШИЕ'),(592,37,212,'СТРАНИЦЫ'),(593,37,223,'ГЛАВНАЯ'),(594,37,231,'СТРАНИЦА'),(595,37,242,'НОВОСТИ'),(596,38,9,'НОВОСТЬ'),(597,38,19,'ДОБРОГО'),(598,38,27,'ВЕЧЕРА'),(599,38,34,'ВСЕМ'),(600,38,48,'ШАПКА'),(601,38,63,'РЕКЛАМА'),(602,38,73,'БАННЕР'),(603,38,80,'GOOGLE'),(604,38,87,'ADSENSE'),(605,38,97,'БАННЕР'),(606,38,104,'АКАВИТЫ'),(607,38,116,'НОВОСТЬ'),(608,38,127,'УРЛА'),(609,38,134,'ДОБРОГО'),(610,38,142,'ВЕЧЕРА'),(611,38,149,'ВСЕМ'),(612,38,157,'СНОВА'),(613,38,163,'ВСЕМ'),(614,38,168,'ПРИВЕТ'),(615,38,181,'ДАВНИХ'),(616,38,189,'ВРЕМЁН'),(617,38,210,'ГОРОД'),(618,38,217,'МИНСК'),(619,38,224,'ПЕРИОД'),(620,38,232,'НЕДЕЛЯ'),(621,38,273,'КАРТИНКА'),(622,38,295,'ГОРОД'),(623,38,302,'МИНСК'),(624,38,309,'ПЕРИОД'),(625,38,317,'НЕДЕЛЯ'),(626,38,333,'ВАЖНЕЙ'),(627,38,340,'ВСЕГО'),(628,38,346,'ПОГОДА'),(629,38,355,'ДОМЕ'),(630,38,382,'ПОДВАЛ'),(631,38,391,'НАШИ'),(632,38,396,'КОНТАКТЫ'),(633,38,428,'ЛУЧШИЕ'),(634,38,435,'СТРАНИЦЫ'),(635,38,446,'ГЛАВНАЯ'),(636,38,454,'СТРАНИЦА'),(637,38,465,'НОВОСТИ'),(638,39,9,'НОВОСТЬ'),(639,39,21,'ДОБРЫМ'),(640,39,28,'УТРОМ'),(641,39,34,'ВСЕХ'),(642,39,48,'ШАПКА'),(643,39,63,'РЕКЛАМА'),(644,39,73,'БАННЕР'),(645,39,80,'GOOGLE'),(646,39,87,'ADSENSE'),(647,39,97,'БАННЕР'),(648,39,104,'АКАВИТЫ'),(649,39,116,'НОВОСТЬ'),(650,39,127,'УРЛА'),(651,39,136,'ДОБРЫМ'),(652,39,143,'УТРОМ'),(653,39,149,'ВСЕХ'),(654,39,157,'ВСЕМ'),(655,39,162,'ПРИВЕТ'),(656,39,175,'ДАВНИХ'),(657,39,183,'ВРЕМЁН'),(658,39,201,'НЕДАВНИХ'),(659,39,222,'ГОРОД'),(660,39,229,'МИНСК'),(661,39,236,'ПЕРИОД'),(662,39,244,'НЕДЕЛЯ'),(663,39,260,'ВСЕГО'),(664,39,270,'ДОБРОГО'),(665,39,286,'ПОДВАЛ'),(666,39,295,'НАШИ'),(667,39,300,'КОНТАКТЫ'),(668,39,332,'ЛУЧШИЕ'),(669,39,339,'СТРАНИЦЫ'),(670,39,350,'ГЛАВНАЯ'),(671,39,358,'СТРАНИЦА'),(672,39,369,'НОВОСТИ');
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
INSERT INTO `news` VALUES (1,'goodmorning','С добрым утром всех!',555,'доброе утро, приветствие','поздравление с добрым утром'),(2,'goodevening','Доброго вечера всем!',566,'добрый вечер, приветствие','пожелание доброго вечера');
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

-- Dump completed on 2019-10-23  8:15:18
