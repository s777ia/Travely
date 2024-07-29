-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2024 at 08:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travely`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `country` varchar(200) NOT NULL,
  `price` float NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `name`, `type`, `country`, `price`, `image`) VALUES
(2, 'Gangchon Rail Bike', 'Experiences', 'South Korea', 30.6, 'gangchon-rail-bike.jpg'),
(4, 'Scuba Diving in Bali', 'Experiences', 'Bali', 64.9, 'scuba-diving-bali.jpeg'),
(5, 'Disneyland', 'Admission Ticket', 'Hong Kong', 60.75, 'disneyland-hk.jpg'),
(7, 'Ba Na Hills: Cable Car', 'Admission Ticket', 'Vietnam', 29.19, 'bana-hills-cable-car.png'),
(9, 'Universal Studios Japan', 'Admission Ticket', 'Japan', 48.56, 'usj.jpg'),
(10, 'Marina Bay Sands', 'Admission Ticket', 'Singapore', 10, 'gardens-by-the-bay.jpg'),
(11, 'Skyline Luge', 'Admission Ticket', 'Singapore', 32.76, 'skyline-luge.jpg'),
(13, 'Lotte World', 'Admission Ticket', 'South Korea', 62.87, 'lotte-world.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
