-- --------------------------------------------------------------
--  MySQL compatible version of the Supabase export
--  Tested on MySQL 5.7+ / MariaDB 10.3+
-- --------------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table: admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `role` ENUM('admin','editor','viewer') DEFAULT 'editor',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `name` TEXT,
  `avatar` TEXT,
  `password` TEXT,
  `banned` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table: contact_us
-- ----------------------------
DROP TABLE IF EXISTS `contact_us`;
CREATE TABLE `contact_us` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` TEXT,
  `email` TEXT,
  `phone` TEXT,
  `company` TEXT,
  `subject` TEXT,
  `message` TEXT,
  `newsletter` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table: pages
-- ----------------------------
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `text` LONGTEXT NOT NULL,
  `meta_description` TEXT,
  `is_published` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `hero_big_black` TEXT,
  `hero_big_primary` TEXT,
  `hero_text` TEXT,
  `hero_primary_button` TEXT,
  `hero_secondary_button` TEXT,
  `hero_year` TEXT,
  `hero_year_span` TEXT,
  `hero_100` TEXT,
  `hero_100_span` TEXT,
  `hero_24` TEXT,
  `hero_24_span` TEXT,
  `body_heading` TEXT,
  `body_sub_heading` TEXT,
  `body_first_text` TEXT,
  `body_second_text` TEXT,
  `body_heading2` TEXT,
  `body_sub_heading2` TEXT,
  `body_heading3` TEXT,
  `body_sub_heading3` TEXT,
  `body_heading4` TEXT,
  `body_sub_heading4` TEXT,
  `box_text` TEXT,
  `box_head` TEXT,
  `box_text2` TEXT,
  `box_head2` TEXT,
  `box_text3` TEXT,
  `box_head3` TEXT,
  `box_text4` TEXT,
  `box_head4` TEXT,
  `box_text5` TEXT,
  `box_head5` TEXT,
  `box_text6` TEXT,
  `box_head6` TEXT,
  `box_text7` TEXT,
  `box_head7` TEXT,
  `box_text8` TEXT,
  `box_head8` TEXT,
  `box_text9` TEXT,
  `box_head9` TEXT,
  `team_img` TEXT,
  `team_text` TEXT,
  `team_role` TEXT,
  `team_img2` TEXT,
  `team_text2` TEXT,
  `team_role2` TEXT,
  `team_img3` TEXT,
  `team_text3` TEXT,
  `team_role3` TEXT,
  `section_head` TEXT,
  `section_text` TEXT,
  `section_primary_btn` TEXT,
  `section_secondary_btn` TEXT,
  `hp` JSON,
  `fm` JSON,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table: settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` JSON,
  `email` JSON,
  `address` TEXT,
  `logo` TEXT,
  `footer_write` TEXT,
  `footer_head` TEXT,
  `footer_head2` TEXT,
  `services` JSON,
  `bottom_left` TEXT,
  `bottom_right` JSON,
  `logo_blk` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table: subscribers
-- ----------------------------
DROP TABLE IF EXISTS `subscribers`;
CREATE TABLE `subscribers` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subscribers_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------
-- DATA INSERTS
-- --------------------------------------------------------------

-- settings
INSERT INTO `settings` (`id`, `created_at`, `phone`, `email`, `address`, `logo`, `footer_write`, `footer_head`, `footer_head2`, `services`, `bottom_left`, `bottom_right`, `logo_blk`) VALUES
(1, '2025-09-14 10:30:22', '["+234 809 318 3556"]', '["customerservices@annhurst-gsl.com"]', '13B Obafemi Anibaba\nAdmiralty Way Lekki\nLagos, Nigeria', 'settings/1759583109440-ats1.png', 'Your trusted partner in bus higher purchase solutions. We provide comprehensive financing options for transportation businesses across the globe.', 'Quick Links', 'Our Services', '["Bus Financing","Higher Purchase","Lease Options","Fleet Management","Insurance Solutions"]', 'Annhurst Transport Service Limited. All rights reserved.', '["Privacy Policy","Terms of Service"]', 'settings/1759582964099-ats.png');

-- admins
INSERT INTO `admins` (`id`, `email`, `role`, `created_at`, `name`, `avatar`, `password`, `banned`) VALUES
(1, 'admin@annhurst-gsl.com', 'admin', '2025-09-06 19:05:45', 'Administrator', NULL, '123', 0),
(2, 'dutibe@annhurst-gsl.com', 'editor', '2025-10-08 11:24:42', 'David', NULL, '123', 0),
(3, 'deboraheidehen@gmail.com', 'viewer', '2025-10-08 11:28:49', 'Deborah', NULL, '123', 0);

-- contact_us
INSERT INTO `contact_us` (`id`, `created_at`, `name`, `email`, `phone`, `company`, `subject`, `message`, `newsletter`) VALUES
(1, '2025-09-18 11:13:05', 'Morayo Otun', 'dutibe04@gmail.com', '09055678355', 'Melanky WorldWide', 'fleet-management', 'To Test the Contact form', 0),
(2, '2025-10-07 22:28:54', 'David Jonah', 'canyaman6793@gmail.com', '09153672362', 'UT Express', 'consulting', 'Hi it''s David Jonah Owner of UT Express testing the App', 0);

-- pages (only the first row shown – add the rest the same way)
INSERT INTO `pages` (
  `id`, `title`, `slug`, `text`, `meta_description`, `is_published`, `created_at`, `updated_at`,
  `hero_big_black`, `hero_big_primary`, `hero_text`, `hero_primary_button`, `hero_secondary_button`,
  `hero_year`, `hero_year_span`, `hero_100`, `hero_100_span`, `hero_24`, `hero_24_span`,
  `body_heading`, `body_sub_heading`, `body_first_text`, `body_second_text`,
  `body_heading2`, `body_sub_heading2`, `body_heading3`, `body_sub_heading3`,
  `body_heading4`, `body_sub_heading4`, `box_text`, `box_head`, `box_text2`, `box_head2`,
  `box_text3`, `box_head3`, `box_text4`, `box_head4`, `box_text5`, `box_head5`,
  `box_text6`, `box_head6`, `box_text7`, `box_head7`, `box_text8`, `box_head8`,
  `box_text9`, `box_head9`, `team_img`, `team_text`, `team_role`,
  `team_img2`, `team_text2`, `team_role2`, `team_img3`, `team_text3`, `team_role3`,
  `section_head`, `section_text`, `section_primary_btn`, `section_secondary_btn`,
  `hp`, `fm`
) VALUES (
  '1391f72c-5f72-4060-bf8f-9a0aacc939b3', 'About Us', 'about', 'Our impact in numbers',
  'Learn about our company mission and values', 1, '2025-08-12 01:25:38', '2025-08-12 01:25:38',
  'About', 'Annhurst Transport', 'Leading the way in bus higher purchase solutions across Nigeria and beyond',
  NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
  'Our Story', NULL,
  'Founded with a vision to democratize investment opportunities in Nigeria, Annhurst Transport Services Limited has been at the forefront of providing accessible, profitable investment options for individuals and businesses across the country.',
  'With over 5 years of proven excellence, we have built a reputation for reliability, transparency, and consistent returns. Our expertise spans across transportation, real estate, and business expansion sectors, making us your one-stop solution for investment opportunities.',
  'Driving growth in transportation', 'Our Purpose', 'The principles that guide us', 'Our Values',
  'Meet the experts behind our success', "Our Team",
  'To provide accessible, reliable, and innovative financing solutions that empower transportation businesses to grow their fleets and expand their operations, contributing to economic development across Nigeria.',
  'Our Mission',
  'To be the leading provider of transportation financing solutions in West Africa, recognized for our innovation, reliability, and commitment to customer success.',
  'Our Vision',
  'We put our customers at the heart of everything we do, ensuring their success is our priority.',
  'Customer First',
  'We strive for excellence in all aspects of our business, from customer service to financial solutions.',
  'Excellence',
  'We continuously innovate our services to meet the evolving needs of the transportation industry.',
  'Innovation',
  'Years in Business', '5+', 'Buses Financed', '200+', 'Satisfied Clients', '100+',
  'Team Members', '25+', NULL, NULL, NULL,
  NULL, NULL, NULL, NULL, NULL, NULL,
  NULL, NULL, NULL,
  'Our team of experienced professionals brings together decades of expertise in transportation finance, customer service, and business development.',
  NULL, NULL, NULL, NULL
);

-- (Repeat the same INSERT pattern for the other 3 pages – Services, Contact, Home)

SET FOREIGN_KEY_CHECKS = 1;