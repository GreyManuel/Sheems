-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 08, 2022 at 07:46 AM
-- Server version: 10.9.3-MariaDB
-- PHP Version: 8.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `user_id`, `session_id`, `start`, `end`, `created_at`, `updated_at`) VALUES
('0b57cb4f-a80f-4d2b-b4cb-f807688ecda2', '222', 'a252e198-2d92-4920-89f2-e8bd513ffa9a', NULL, NULL, '2022-09-22 13:14:04', '2022-09-22 13:14:04'),
('0fe170f3-9f66-4dcd-b69a-ec179bf4db2a', 'b4ac1f62-4c17-421f-a894-bec23a8e9022', 'a252e198-2d92-4920-89f2-e8bd513ffa9a', '2022-09-22 16:14:23', NULL, '2022-09-22 13:14:04', '2022-09-22 13:14:23'),
('52eb1b48-3e4e-4cbd-9795-e8cbdadd143b', 'ea149400-ce6c-4f3e-bf29-066f13935cd3', '85108519-5452-4d65-aa66-df64f6cadbbc', '2022-09-22 11:16:34', '2022-09-22 11:17:02', '2022-09-22 08:16:05', '2022-09-22 08:17:02'),
('573c6491-3ab7-4029-a8dc-71ba6082a43a', '222', '4f273975-ffc7-4518-9f3c-7297d85dab87', '2022-09-22 18:18:18', NULL, '2022-09-22 15:15:44', '2022-09-22 15:18:18'),
('733901de-fee9-4ec5-89f7-334674cd9912', 'b4ac1f62-4c17-421f-a894-bec23a8e9022', '4f273975-ffc7-4518-9f3c-7297d85dab87', NULL, NULL, '2022-09-22 15:15:44', '2022-09-22 15:15:44'),
('96544d13-fce3-408f-9c6c-94ce2d6234b4', 'ea149400-ce6c-4f3e-bf29-066f13935cd3', '5cde4e65-9bef-4bb6-a61e-fdbb90c8bcc3', '2022-09-22 15:26:40', '2022-09-22 15:26:59', '2022-09-22 12:25:19', '2022-09-22 12:26:59'),
('97cc667f-4dad-49e1-9c4d-1e4ac67e9515', 'ea149400-ce6c-4f3e-bf29-066f13935cd3', '29584a93-5225-42f7-b3be-4d26ed989a36', '2022-09-22 11:14:23', NULL, '2022-09-22 08:13:59', '2022-09-22 08:14:23'),
('eaa8ab83-cab3-49bd-ab6f-b92abfbd104b', 'ea149400-ce6c-4f3e-bf29-066f13935cd3', '468b4bd5-1df5-4832-8e7c-7ef31a8fe2ce', NULL, NULL, '2022-09-22 12:33:12', '2022-09-22 12:33:12');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_11_083205_create_shifts_table', 1),
(2, '2014_10_12_000000_create_users_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2022_07_30_183044_create_sessions_table', 1),
(7, '2022_07_31_083235_create_attendances_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shift_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `shift_id`, `name`, `start`, `end`, `created_at`, `updated_at`) VALUES
('29584a93-5225-42f7-b3be-4d26ed989a36', '2', 'Shift B - znI', '2022-09-22 11:13:58', '2022-09-22 11:14:29', '2022-09-22 08:13:58', '2022-09-22 08:14:29'),
('468b4bd5-1df5-4832-8e7c-7ef31a8fe2ce', '2', 'Shift B - ze5', '2022-09-22 15:33:12', '2022-09-22 15:36:33', '2022-09-22 12:33:12', '2022-09-22 12:36:33'),
('4f273975-ffc7-4518-9f3c-7297d85dab87', '1', 'Shift A - NJr', '2022-09-22 18:15:44', '2022-09-22 18:18:53', '2022-09-22 15:15:44', '2022-09-22 15:18:53'),
('5cde4e65-9bef-4bb6-a61e-fdbb90c8bcc3', '2', 'Shift B - 0Qv', '2022-09-22 15:25:19', '2022-09-22 15:27:02', '2022-09-22 12:25:19', '2022-09-22 12:27:02'),
('85108519-5452-4d65-aa66-df64f6cadbbc', '2', 'Shift B - f6E', '2022-09-22 11:16:05', '2022-09-22 11:17:06', '2022-09-22 08:16:05', '2022-09-22 08:17:06'),
('a252e198-2d92-4920-89f2-e8bd513ffa9a', '1', 'Shift A - 52W', '2022-09-22 16:14:03', '2022-09-22 16:15:12', '2022-09-22 13:14:03', '2022-09-22 13:15:12');

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ongoing` tinyint(1) NOT NULL DEFAULT 0,
  `ongoing_session` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shifts`
--

INSERT INTO `shifts` (`id`, `name`, `ongoing`, `ongoing_session`, `created_at`, `updated_at`) VALUES
('1', 'Shift A', 0, NULL, '2022-09-22 11:09:52', '2022-09-22 15:18:53'),
('2', 'Shift B', 0, NULL, '2022-09-22 11:10:03', '2022-09-22 12:36:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` smallint(6) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT 3,
  `user_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shift_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `title`, `type`, `user_number`, `phone_number`, `from`, `profile`, `shift_id`, `email_verified_at`, `password`, `remember_token`, `deleted_at`, `created_at`, `updated_at`) VALUES
('222', 'Manuel Grey', 'mikekkamara@gmail.com', 1, 1, 'ES', '0706290861', 'Yaya Kilimani', '202209221121.JPG', '1', NULL, '$2y$10$3wweByiLCiyCONubZTcOUeQ8KHxmtvL6U2d3uA53yebrZCaAQ4sAy', NULL, NULL, NULL, '2022-09-22 08:21:32'),
('b4ac1f62-4c17-421f-a894-bec23a8e9022', 'GreyReigns', 'greytech3000@gmail.com', 1, 2, 'aA', '0769321996', 'Muthurwa', '202209221122.jpg', '1', NULL, '$2y$10$ku51Vx9aQu/GU/Pf4nr1lu3qtCfzk2XBeZCFQ5Se3fdmK63Ovol9.', NULL, NULL, '2022-09-22 08:22:38', '2022-09-22 08:22:38'),
('ea149400-ce6c-4f3e-bf29-066f13935cd3', 'Kencian Kimathi', 'greytechsystems@gmail.com', 1, 3, '00', '0736272495', 'Yaya KIlimani', '202209221113.JPG', '2', NULL, '$2y$10$T3/.adRXXIkgOEUMGfM3YeVY9dFV7WkleDqm.GM49ePJZR/5u9SN2', NULL, NULL, '2022-09-22 08:13:33', '2022-09-22 08:13:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendances_user_id_foreign` (`user_id`),
  ADD KEY `attendances_session_id_foreign` (`session_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_shift_id_foreign` (`shift_id`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_number_unique` (`user_number`),
  ADD KEY `users_shift_id_foreign` (`shift_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_session_id_foreign` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_shift_id_foreign` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_shift_id_foreign` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
