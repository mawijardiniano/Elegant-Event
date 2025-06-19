-- CreateTable
CREATE TABLE `Booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `venue_id` INTEGER NOT NULL,
    `booking_date` DATETIME(3) NOT NULL,
    `event_type_id` INTEGER NOT NULL,
    `expected_guest` INTEGER NOT NULL,
    `event_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `request` VARCHAR(191) NULL,
    `package_id` INTEGER NOT NULL,
    `serv_id` INTEGER NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_venue_id_fkey` FOREIGN KEY (`venue_id`) REFERENCES `Venue`(`venue_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_event_type_id_fkey` FOREIGN KEY (`event_type_id`) REFERENCES `EventType`(`event_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `Package`(`package_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_serv_id_fkey` FOREIGN KEY (`serv_id`) REFERENCES `Service`(`serv_id`) ON DELETE SET NULL ON UPDATE CASCADE;
