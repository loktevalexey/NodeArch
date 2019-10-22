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
  `add_dt` datetime NOT NULL COMMENT 'дата-время добавления УРЛа в этот список',
  `actual_flag` smallint(6) NOT NULL DEFAULT '0' COMMENT 'признак для быстрого обнаружения неактуальных УРЛов',
  `last_render_dt` datetime NOT NULL COMMENT 'дата-время последнего формирования сырого содержимого УРЛа',
  `last_modification_dt` datetime NOT NULL COMMENT 'дата-время последнего изменения сырого содержимого УРЛа',
  PRIMARY KEY (`id`),
  KEY `index_urls_url_i` (`url`),
  KEY `index_urls_af_i` (`actual_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='проиндексированные УРЛы сайта (СЕО + внутренний поиск)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `index_urls`
--

LOCK TABLES `index_urls` WRITE;
/*!40000 ALTER TABLE `index_urls` DISABLE KEYS */;
INSERT INTO `index_urls` VALUES (28,'/main','indpage','{\"indPageURLCode\":\"main\"}','','2019-10-22 20:05:24',1,'2019-10-22 20:07:41','2019-10-22 20:07:41'),(29,'/news','indpage','{\"indPageURLCode\":\"news\"}','','2019-10-22 20:05:25',1,'2019-10-22 20:07:42','2019-10-22 20:07:42'),(30,'/new/goodevening','new','{\"newURLCode\":\"goodevening\"}','','2019-10-22 20:05:25',1,'2019-10-22 20:07:42','2019-10-22 20:07:42'),(31,'/new/goodmorning','new','{\"newURLCode\":\"goodmorning\"}','','2019-10-22 20:05:25',1,'2019-10-22 20:07:42','2019-10-22 20:07:42');
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
  `word_ord` int(11) unsigned NOT NULL DEFAULT '0' COMMENT 'номер слова на странице',
  `word` varchar(10) NOT NULL DEFAULT '' COMMENT 'слово',
  PRIMARY KEY (`id`),
  KEY `index_urls_words_iu_wo_i` (`index_url`,`word_ord`)
) ENGINE=InnoDB AUTO_INCREMENT=447 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='проиндексированные слова УРЛов сайта (внутренний поиск)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `index_urls_words`
--

LOCK TABLES `index_urls_words` WRITE;
/*!40000 ALTER TABLE `index_urls_words` DISABLE KEYS */;
INSERT INTO `index_urls_words` VALUES (225,28,0,'ГЛАВНАЯ'),(226,28,1,'ШАПКА'),(227,28,2,'СОДЕРЖИМОЕ'),(228,28,3,'СТРАНИЦЫ'),(229,28,4,'УРЛА'),(230,28,5,'ДОБРО'),(231,28,6,'ПОЖАЛОВАТЬ'),(232,28,7,'САЙТ'),(233,28,8,'ДОБРО'),(234,28,9,'ПОЖАЛОВАТЬ'),(235,28,10,'САЙТ'),(236,28,11,'ДОБРО'),(237,28,12,'ПОЖАЛОВАТЬ'),(238,28,13,'САЙТ'),(239,28,14,'ДОБРО'),(240,28,15,'ПОЖАЛОВАТЬ'),(241,28,16,'САЙТ'),(242,28,17,'ДОБРО'),(243,28,18,'ПОЖАЛОВАТЬ'),(244,28,19,'САЙТ'),(245,28,20,'ДОБРО'),(246,28,21,'ПОЖАЛОВАТЬ'),(247,28,22,'САЙТ'),(248,28,23,'ДОБРО'),(249,28,24,'ПОЖАЛОВАТЬ'),(250,28,25,'САЙТ'),(251,28,26,'ДОБРО'),(252,28,27,'ПОЖАЛОВАТЬ'),(253,28,28,'САЙТ'),(254,28,29,'ДОБРО'),(255,28,30,'ПОЖАЛОВАТЬ'),(256,28,31,'САЙТ'),(257,28,32,'ДОБРО'),(258,28,33,'ПОЖАЛОВАТЬ'),(259,28,34,'САЙТ'),(260,28,35,'ДОБРО'),(261,28,36,'ПОЖАЛОВАТЬ'),(262,28,37,'САЙТ'),(263,28,38,'ДОБРО'),(264,28,39,'ПОЖАЛОВАТЬ'),(265,28,40,'САЙТ'),(266,28,41,'ДОБРО'),(267,28,42,'ПОЖАЛОВАТЬ'),(268,28,43,'САЙТ'),(269,28,44,'ДОБРО'),(270,28,45,'ПОЖАЛОВАТЬ'),(271,28,46,'САЙТ'),(272,28,47,'ДОБРО'),(273,28,48,'ПОЖАЛОВАТЬ'),(274,28,49,'САЙТ'),(275,28,50,'ДОБРО'),(276,28,51,'ПОЖАЛОВАТЬ'),(277,28,52,'САЙТ'),(278,28,53,'ДОБРО'),(279,28,54,'ПОЖАЛОВАТЬ'),(280,28,55,'САЙТ'),(281,28,56,'ДОБРО'),(282,28,57,'ПОЖАЛОВАТЬ'),(283,28,58,'САЙТ'),(284,28,59,'ДОБРО'),(285,28,60,'ПОЖАЛОВАТЬ'),(286,28,61,'САЙТ'),(287,28,62,'ДОБРО'),(288,28,63,'ПОЖАЛОВАТЬ'),(289,28,64,'САЙТ'),(290,28,65,'ДОБРО'),(291,28,66,'ПОЖАЛОВАТЬ'),(292,28,67,'САЙТ'),(293,28,68,'ДОБРО'),(294,28,69,'ПОЖАЛОВАТЬ'),(295,28,70,'САЙТ'),(296,28,71,'ДОБРО'),(297,28,72,'ПОЖАЛОВАТЬ'),(298,28,73,'САЙТ'),(299,28,74,'ДОБРО'),(300,28,75,'ПОЖАЛОВАТЬ'),(301,28,76,'САЙТ'),(302,28,77,'ДОБРО'),(303,28,78,'ПОЖАЛОВАТЬ'),(304,28,79,'САЙТ'),(305,28,80,'ДОБРО'),(306,28,81,'ПОЖАЛОВАТЬ'),(307,28,82,'САЙТ'),(308,28,83,'ДОБРО'),(309,28,84,'ПОЖАЛОВАТЬ'),(310,28,85,'САЙТ'),(311,28,86,'ДОБРО'),(312,28,87,'ПОЖАЛОВАТЬ'),(313,28,88,'САЙТ'),(314,28,89,'ДОБРО'),(315,28,90,'ПОЖАЛОВАТЬ'),(316,28,91,'САЙТ'),(317,28,92,'ДОБРО'),(318,28,93,'ПОЖАЛОВАТЬ'),(319,28,94,'САЙТ'),(320,28,95,'ДОБРО'),(321,28,96,'ПОЖАЛОВАТЬ'),(322,28,97,'САЙТ'),(323,28,98,'ДОБРО'),(324,28,99,'ПОЖАЛОВАТЬ'),(325,28,100,'САЙТ'),(326,28,101,'ДОБРО'),(327,28,102,'ПОЖАЛОВАТЬ'),(328,28,103,'САЙТ'),(329,28,104,'ДОБРО'),(330,28,105,'ПОЖАЛОВАТЬ'),(331,28,106,'САЙТ'),(332,28,107,'ДОБРО'),(333,28,108,'ПОЖАЛОВАТЬ'),(334,28,109,'САЙТ'),(335,28,110,'ДОБРО'),(336,28,111,'ПОЖАЛОВАТЬ'),(337,28,112,'САЙТ'),(338,28,113,'ДОБРО'),(339,28,114,'ПОЖАЛОВАТЬ'),(340,28,115,'САЙТ'),(341,28,116,'ДОБРО'),(342,28,117,'ПОЖАЛОВАТЬ'),(343,28,118,'САЙТ'),(344,28,119,'ПОДВАЛ'),(345,28,120,'НАШИ'),(346,28,121,'КОНТАКТЫ'),(347,28,122,'ЛУЧШИЕ'),(348,28,123,'СТРАНИЦЫ'),(349,28,124,'ГЛАВНАЯ'),(350,28,125,'СТРАНИЦА'),(351,28,126,'НОВОСТИ'),(352,29,0,'НОВОСТИ'),(353,29,1,'ШАПКА'),(354,29,2,'СОДЕРЖИМОЕ'),(355,29,3,'СТРАНИЦЫ'),(356,29,4,'УРЛА'),(357,29,5,'ТЕКСТ'),(358,29,6,'НОВОСТЕЙ'),(359,29,7,'НОВОСТИ'),(360,29,8,'ДОБРЫМ'),(361,29,9,'УТРОМ'),(362,29,10,'ВСЕХ'),(363,29,11,'ДОБРОГО'),(364,29,12,'ВЕЧЕРА'),(365,29,13,'ВСЕМ'),(366,29,14,'ПОДВАЛ'),(367,29,15,'НАШИ'),(368,29,16,'КОНТАКТЫ'),(369,29,17,'ЛУЧШИЕ'),(370,29,18,'СТРАНИЦЫ'),(371,29,19,'ГЛАВНАЯ'),(372,29,20,'СТРАНИЦА'),(373,29,21,'НОВОСТИ'),(374,30,0,'НОВОСТЬ'),(375,30,1,'ДОБРОГО'),(376,30,2,'ВЕЧЕРА'),(377,30,3,'ВСЕМ'),(378,30,4,'ШАПКА'),(379,30,5,'РЕКЛАМА'),(380,30,6,'БАННЕР'),(381,30,7,'БАННЕР'),(382,30,8,'АКАВИТЫ'),(383,30,9,'НОВОСТЬ'),(384,30,10,'УРЛА'),(385,30,11,'ДОБРОГО'),(386,30,12,'ВЕЧЕРА'),(387,30,13,'ВСЕМ'),(388,30,14,'СНОВА'),(389,30,15,'ВСЕМ'),(390,30,16,'ПРИВЕТ'),(391,30,17,'ДАВНИХ'),(392,30,18,'ВРЕМЁН'),(393,30,19,'ГОРОД'),(394,30,20,'МИНСК'),(395,30,21,'ПЕРИОД'),(396,30,22,'НЕДЕЛЯ'),(397,30,23,'КАРТИНКА'),(398,30,24,'ГОРОД'),(399,30,25,'МИНСК'),(400,30,26,'ПЕРИОД'),(401,30,27,'НЕДЕЛЯ'),(402,30,28,'ВАЖНЕЙ'),(403,30,29,'ВСЕГО'),(404,30,30,'ПОГОДА'),(405,30,31,'ДОМЕ'),(406,30,32,'ПОДВАЛ'),(407,30,33,'НАШИ'),(408,30,34,'КОНТАКТЫ'),(409,30,35,'ЛУЧШИЕ'),(410,30,36,'СТРАНИЦЫ'),(411,30,37,'ГЛАВНАЯ'),(412,30,38,'СТРАНИЦА'),(413,30,39,'НОВОСТИ'),(414,31,0,'НОВОСТЬ'),(415,31,1,'ДОБРЫМ'),(416,31,2,'УТРОМ'),(417,31,3,'ВСЕХ'),(418,31,4,'ШАПКА'),(419,31,5,'РЕКЛАМА'),(420,31,6,'БАННЕР'),(421,31,7,'БАННЕР'),(422,31,8,'АКАВИТЫ'),(423,31,9,'НОВОСТЬ'),(424,31,10,'УРЛА'),(425,31,11,'ДОБРЫМ'),(426,31,12,'УТРОМ'),(427,31,13,'ВСЕХ'),(428,31,14,'ВСЕМ'),(429,31,15,'ПРИВЕТ'),(430,31,16,'ДАВНИХ'),(431,31,17,'ВРЕМЁН'),(432,31,18,'НЕДАВНИХ'),(433,31,19,'ГОРОД'),(434,31,20,'МИНСК'),(435,31,21,'ПЕРИОД'),(436,31,22,'НЕДЕЛЯ'),(437,31,23,'ВСЕГО'),(438,31,24,'ДОБРОГО'),(439,31,25,'ПОДВАЛ'),(440,31,26,'НАШИ'),(441,31,27,'КОНТАКТЫ'),(442,31,28,'ЛУЧШИЕ'),(443,31,29,'СТРАНИЦЫ'),(444,31,30,'ГЛАВНАЯ'),(445,31,31,'СТРАНИЦА'),(446,31,32,'НОВОСТИ');
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

-- Dump completed on 2019-10-22 23:20:16
