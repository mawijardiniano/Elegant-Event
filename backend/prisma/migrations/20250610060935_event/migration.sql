-- CreateTable
CREATE TABLE `EventType` (
    `event_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`event_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
