-- CreateTable
CREATE TABLE `Venue` (
    `venue_id` INTEGER NOT NULL AUTO_INCREMENT,
    `venue_img` VARCHAR(191) NOT NULL,
    `venue_name` VARCHAR(191) NOT NULL,
    `venue_ratings` DOUBLE NULL,
    `venue_desc` VARCHAR(191) NOT NULL,
    `venue_capacity` INTEGER NOT NULL,
    `venue_loc` VARCHAR(191) NOT NULL,
    `venue_price` DOUBLE NOT NULL,

    PRIMARY KEY (`venue_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `tag_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VenueTag` (
    `venue_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`venue_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VenueTag` ADD CONSTRAINT `VenueTag_venue_id_fkey` FOREIGN KEY (`venue_id`) REFERENCES `Venue`(`venue_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VenueTag` ADD CONSTRAINT `VenueTag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
