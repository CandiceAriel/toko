-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 16, 2021 at 01:30 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Toko`
--

-- --------------------------------------------------------

--
-- Table structure for table `Barang`
--

CREATE TABLE `Barang` (
  `id` int(10) NOT NULL,
  `kodeBarang` int(10) NOT NULL,
  `namaBarang` text NOT NULL,
  `harga` int(6) NOT NULL,
  `stok` int(6) NOT NULL,
  `qty` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Barang`
--

INSERT INTO `Barang` (`id`, `kodeBarang`, `namaBarang`, `harga`, `stok`, `qty`) VALUES
(1, 1001, 'Gelatin', 150000, 0, 1),
(3, 1002, 'Vanilla Bean', 200000, 43, 2),
(4, 1003, 'Baking Soda', 20000, 50, 3),
(6, 1004, 'Baking Powder', 25000, 50, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `userID` varchar(100) NOT NULL,
  `id` int(10) NOT NULL,
  `kodeBarang` int(10) NOT NULL,
  `namaBarang` varchar(100) NOT NULL,
  `harga` int(10) NOT NULL,
  `qty` int(10) NOT NULL,
  `total` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`userID`, `id`, `kodeBarang`, `namaBarang`, `harga`, `qty`, `total`) VALUES
('williamwill', 7, 1001, 'Gelatin', 150000, 1, 300000),
('williamwill', 8, 1003, 'Baking Soda', 20000, 3, 40000),
('candicecan', 19, 1002, 'Vanilla Bean', 200000, 2, 400000);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userID` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `noHP` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userID`, `nama`, `noHP`, `email`, `password`) VALUES
('candicecan', 'Candice A.', '087678564', 'candicecan@yahoo.com', '$2b$10$91pvj.WikG8Wtt24IuK/1OXpYoasNEUh5syI4Rtvqo30uFAea4grK'),
('williamwill', 'william', '087960589', 'williamwill@yahoo.com', '$2b$10$TTM8A1FsbEu1XMFDKy3bVeyqFAyMVvHiBZWSjfbqS6OUis9kGA5py');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Barang`
--
ALTER TABLE `Barang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kodeBarang` (`kodeBarang`);

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kodeBarang` (`kodeBarang`),
  ADD KEY `fk_userID` (`userID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Barang`
--
ALTER TABLE `Barang`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Cart`
--
ALTER TABLE `Cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `fk_userID` FOREIGN KEY (`userID`) REFERENCES `User` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
