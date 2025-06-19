-- CreateTable
CREATE TABLE `Service` (
    `serv_id` INTEGER NOT NULL AUTO_INCREMENT,
    `serv_name` VARCHAR(191) NOT NULL,
    `serv_price` DOUBLE NOT NULL,

    PRIMARY KEY (`serv_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
