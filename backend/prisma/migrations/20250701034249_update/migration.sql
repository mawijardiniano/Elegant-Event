/*
  Warnings:

  - You are about to drop the column `serv_id` on the `booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_serv_id_fkey`;

-- DropIndex
DROP INDEX `Booking_serv_id_fkey` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `serv_id`;

-- CreateTable
CREATE TABLE `BookingService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `serv_id` INTEGER NOT NULL,

    UNIQUE INDEX `BookingService_booking_id_serv_id_key`(`booking_id`, `serv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookingService` ADD CONSTRAINT `BookingService_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Booking`(`booking_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingService` ADD CONSTRAINT `BookingService_serv_id_fkey` FOREIGN KEY (`serv_id`) REFERENCES `Service`(`serv_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
