-- CreateTable
CREATE TABLE `person` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `friendship` (
    `person_id` VARCHAR(255) NOT NULL,
    `friend_id` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`person_id`, `friend_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `friendship` ADD CONSTRAINT `friendship_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friendship` ADD CONSTRAINT `friendship_friend_id_fkey` FOREIGN KEY (`friend_id`) REFERENCES `person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
