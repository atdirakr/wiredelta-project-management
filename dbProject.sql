-- phpMyAdmin SQL Dump
-- version 4.6.4deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 20, 2017 at 03:48 PM
-- Server version: 5.7.17-0ubuntu0.16.10.1
-- PHP Version: 7.0.15-0ubuntu0.16.10.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbProject`
--
DROP DATABASE `dbProject`;
CREATE DATABASE IF NOT EXISTS `dbProject` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dbProject`;

-- --------------------------------------------------------

--
-- Table structure for table `tblproject`
--

CREATE TABLE `tblproject` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `userid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproject`
--

INSERT INTO `tblproject` (`id`, `name`, `description`, `start_date`, `end_date`, `userid`) VALUES
(1, 'Test74', 'Test74', '2017-04-19 00:00:00', '2017-05-05 00:00:00', 3),
(4, 'Test6', 'Test6', '2017-04-17 00:00:00', '2017-04-30 00:00:00', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `userId` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `active` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`userId`, `username`, `email`, `password`, `isAdmin`, `active`) VALUES
(1, 'admin', 'admin@gmail.com', '$2a$10$x60IpWcwJEbMUPXvWEK28epHsII8m88LZyHj4lGCAMn6Y1QJNBgxK', 1, 1),
(3, 'nijesh', 'nijesh.w.wiredelta@gmail.com', '$2a$10$vXo8Xlq1h4x44UQi0I86gux5Fi7ArwPDfd9amk9m56d1.0pgQ/VJO', 0, 0),
(4, 'test', 'test@test.com', '$2a$10$yAcAKzjgKHab1p.F86IAYunc171HdUZBrFFJThWpWpYyc311cdHri', 0, 0),
(5, 'test5', 'test5@test.com', '$2a$10$0tAAxH6U/y7/YJr9JSpFKepz29oLFFscEeNwAdZhrvFlyIEM4JIlG', 0, 0),
(6, 'test6', 'test6@test.com', '$2a$10$ATlphIq8rrg9Am44st4PhOEVGuvfsjg4aBeAUqzhqnADm1tOnfFqC', 0, 0),
(7, 'Test7', 'test7@gmail.com', '$2a$10$d/FyN/Cwl3mzUZzXQNzQr.OUl2EhA6f6s91ACXpzr.uqnW/j0cUzS', 0, 0),
(8, 'test8', 'nijesh.w.17+1@gmail.com', '$2a$10$lROZ16DIX0tLcI9WQ1lUUejPH7rGWgEPwPaKRO2OBrx9dScPkXvFi', 0, 0),
(9, 'test9', 'nijesh.w.17+2@gmail.com', '$2a$10$QvmX9nw6OYIlmV1HXrAAiOgM9jKgOjwREmQqpmowQujufDdxF7a0i', 0, 0),
(10, 'test10', 'nijesh.w.17+3@gmail.com', '$2a$10$qaSYeg4TTN6FK1c/pZgfzuQvtui4mUe.nCdtF7jPHKtjeHJ.AnmHW', 0, 0),
(11, 'test11', 'nijesh.w.17+4@gmail.com', '$2a$10$C8peni6t8F8TpLVw.IVFN./VZYVlCl3oxESNtbSpiml76Okgfg.oW', 0, 0),
(12, 'user12', 'nijesh.w.17+5@gmail.com', '$2a$10$XAjhon8HHxKT9GLqNMDRGO2GtUNW7vsJNkYqH33XTdmDVVeF6wF.K', 0, 0),
(13, 'test13', 'nijesh.w.17+6@gmail.com', '$2a$10$E3ZFX1oXDf6w1SDxSejQfeOzGGwSx3u6bCNQ0PBhBiW6ew9uGL9cy', 0, 0),
(14, 'test14', 'nijesh.w.17+7@gmail.com', '$2a$10$4WnCpjmVwqaVbYSl0cd9HeiIpA0U9Me0RlRX.nrgvsOapvsbEpiyC', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblproject`
--
ALTER TABLE `tblproject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblproject`
--
ALTER TABLE `tblproject`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
