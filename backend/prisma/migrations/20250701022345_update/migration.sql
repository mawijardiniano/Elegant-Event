-- AlterTable
ALTER TABLE `package` ADD COLUMN `features` VARCHAR(191) NOT NULL DEFAULT '[]',
    ADD COLUMN `package_desc` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `package_price` DOUBLE NOT NULL DEFAULT 0;
