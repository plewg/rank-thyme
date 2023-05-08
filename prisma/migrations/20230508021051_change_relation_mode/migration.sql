-- DropForeignKey
ALTER TABLE `Option` DROP FOREIGN KEY `Option_pollId_fkey`;

-- DropForeignKey
ALTER TABLE `OptionVoteRank` DROP FOREIGN KEY `OptionVoteRank_optionId_fkey`;

-- DropForeignKey
ALTER TABLE `OptionVoteRank` DROP FOREIGN KEY `OptionVoteRank_voteId_fkey`;

-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_pollId_fkey`;
