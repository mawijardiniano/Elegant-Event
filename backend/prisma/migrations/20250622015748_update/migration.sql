/*
  Warnings:

  - You are about to drop the `venuetag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `venuetag` DROP FOREIGN KEY `VenueTag_tag_id_fkey`;

-- DropForeignKey
ALTER TABLE `venuetag` DROP FOREIGN KEY `VenueTag_venue_id_fkey`;

-- AlterTable
ALTER TABLE `venue` ADD COLUMN `tag_id` INTEGER NULL;

-- DropTable
DROP TABLE `venuetag`;

-- AddForeignKey
ALTER TABLE `Venue` ADD CONSTRAINT `Venue_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`tag_id`) ON DELETE SET NULL ON UPDATE CASCADE;
