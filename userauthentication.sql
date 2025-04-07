-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2025 at 12:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `userauthentication`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(1, 'best', 'bestbisong9@gmail.com', '$2y$10$M7yTOBN48Qg/pwXAlEyoS./KeJmiJMhoVqWye5ch02emDJYoE/HGe', '2025-03-19 10:26:30'),
(4, 'hhh', 'bestbisong04@gmail.com', '$2y$10$942xxfpn4KwkCkq4T64zOugY0Uhd5kjKj.CJFN7RMHs8DB9Hg53BW', '2025-03-19 10:31:23'),
(6, 'divine', 'bekksandbee@yahoo.com', '$2y$10$xEXKKRekFphm7phnuLFEDepctWJFUgs8yTH5k95KlFKunUshoidga', '2025-03-19 13:54:27'),
(7, 'your papa', 'divine@231.com', '$2y$10$cv3TOoPUYzzjhsQ6uFR41ekOCNzKsNOx7dE8WZghkfpGSTKKMFHyi', '2025-03-19 15:37:35'),
(8, 'its__best', 'bisongbest04@gmail.com', '$2y$10$UqeW7.XgisWqIv0nKgctOufuF/K9n9IQqtLaF9gKnLZqStaRdnHyS', '2025-03-20 06:49:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
