-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 15, 2023 at 10:37 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notes-tim-sundell`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `documentName` varchar(128) NOT NULL,
  `documentContent` text NOT NULL,
  `userId` char(36) NOT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `updatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `documentName`, `documentContent`, `userId`, `createDate`, `deleted`, `updatedDate`) VALUES
(1, 'lorem', '\'<h1 style=\"text-align: center;\"><span style=\"background-color: rgb(191, 237, 210); color: rgb(241, 196, 15);\"><span style=\"background-color: rgb(236, 240, 241); color: rgb(0, 0, 0);\">A title</span></span></h1>\n<p><span style=\"background-color: rgb(191, 237, 210); color: rgb(241, 196, 15);\"><span style=\"background-color: rgb(236, 240, 241); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></span></p>\n<p style=\"text-align: right;\"><em><span style=\"background-color: rgb(191, 237, 210); color: rgb(241, 196, 15);\"><span style=\"background-color: rgb(236, 240, 241); color: rgb(0, 0, 0);\">The end</span></span></em></p>\n<p>&nbsp;</p>\'', 'f02cbb64-821c-41f0-aa76-ae2a44cd6ff1', '2023-04-15 22:17:54', 0, '2023-04-16 00:19:42'),
(2, 'lorem(1)', '\'<h1 style=\"text-align: center;\"><span style=\"color: rgb(224, 62, 45); background-color: rgb(191, 237, 210);\">IF you name you document the same as an already existing one you get an incrementation number at the end of the document name.</span></h1>\n<p><span style=\"color: rgb(224, 62, 45); background-color: rgb(191, 237, 210);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>\n<hr>\n<p><span style=\"color: rgb(236, 202, 250); background-color: rgb(53, 152, 219);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>\'', 'f02cbb64-821c-41f0-aa76-ae2a44cd6ff1', '2023-04-15 22:20:37', 0, '2023-04-16 00:21:44'),
(3, 'Hello World', '\'<p>Hello World, this is a minimalistic document that</p>\n<p>hasn\'t been updated since it\'s creation.</p>\'', 'f02cbb64-821c-41f0-aa76-ae2a44cd6ff1', '2023-04-15 22:22:42', 0, NULL),
(4, 'unnamed document', '\'<p><span style=\"color: rgb(224, 62, 45);\"><strong>For your information!</strong></span></p>\n<p>If you don\'t name your document anything it will automatically be named \"unamed document\".</p>\'', 'fb967ff4-d061-469c-bc1d-a62266b764ee', '2023-04-15 22:25:15', 0, NULL),
(5, 'Wide Document', '\'<p>This document is long in width, therefor a horizontal scroll will be generated in view mode. You can stil view the true size of the document by pressing to [True size toggle] button.</p>\n<p>Here come a very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong word!</p>\'', 'fb967ff4-d061-469c-bc1d-a62266b764ee', '2023-04-15 22:27:58', 0, NULL),
(6, 'Long Document', '\'<div id=\"5\" class=\"contentContainer\">\n<p>This document is long in height, therefor a vertical scroll will be generated in view mode. You can stil view the true size of the document by pressing to [True size toggle] button.</p>\n<p>Here come a very long list without any content:</p>\n<p>1.</p>\n<p>2.</p>\n<p>3.</p>\n<p>4.</p>\n<p>5.</p>\n<p>6.</p>\n<p>7.</p>\n<p>8.</p>\n<p>9.</p>\n<p>10.</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n</div>\'', 'fb967ff4-d061-469c-bc1d-a62266b764ee', '2023-04-15 22:30:18', 0, NULL),
(7, 'My lame note', '\'<p>You logged in to user123. Thats pretty lame. The other users have different types of documents that demonstrates this project better.</p>\n<p style=\"padding-left: 40px;\">But here is some lorem ipsum for you :</p>\n<h2 style=\"padding-left: 80px;\"><span style=\"background-color: rgb(248, 202, 198);\">Lorem ipsum dolor sit amet</span></h2>\n<h4 style=\"padding-left: 120px;\"><span style=\"background-color: rgb(241, 196, 15);\">consectetur adipiscing elit</span></h4>\n<h5 style=\"padding-left: 160px;\"><span style=\"background-color: rgb(22, 145, 121);\">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></h5>\'', 'ccc608ef-08ef-4d70-86a6-dc6f1de71546', '2023-04-15 22:36:27', 0, '2023-04-16 00:36:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `userName` varchar(128) DEFAULT NULL,
  `userPassword` varchar(128) NOT NULL,
  `userEmail` varchar(128) DEFAULT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userName`, `userPassword`, `userEmail`, `createDate`) VALUES
('ccc608ef-08ef-4d70-86a6-dc6f1de71546', 'test123', 'U2FsdGVkX1+G8Q/KRzCtjuN7TolD1gyCRlx2raphJSY=', 'test@gmail.com', '2023-04-15 19:10:47'),
('f02cbb64-821c-41f0-aa76-ae2a44cd6ff1', 'demo123', 'U2FsdGVkX1+Crv8FdC1LII4U2KSNwnBhda0W5xQJg3A=', 'demo@gmail.com', '2023-04-15 19:03:57'),
('fb967ff4-d061-469c-bc1d-a62266b764ee', 'johnDoe', 'U2FsdGVkX189vv5ndlF5WqJRy6dup2dgtNENBAHvgl0=', 'johnDoe@gmail.com', '2023-04-15 18:27:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
