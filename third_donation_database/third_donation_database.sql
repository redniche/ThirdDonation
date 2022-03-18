CREATE TABLE `spam_word` (
	`id`	int	NOT NULL,
	`word`	varchar(255)	NOT NULL
);

CREATE TABLE `user` (
	`private_hash`	varchar(256)	NOT NULL,
	`wallet_address`	varchar(256)	NULL,
	`login_expired`	bit(1)	NULL,
	`create_ip`	varchar(255)	NULL,
	`date_created`	datetime	NULL,
	`date_exchanged`	datetime	NULL,
	`enabled`	bit(1)	NULL,
	`is_artist`	bit(1)	NULL,
	`username`	varchar(15)	NULL,
	`user_role`	varchar(15)	NULL
);

CREATE TABLE `article` (
	`id`	int	NOT NULL,
	`private_hash`	varchar(256)	NOT NULL,
	`title`	varchar(255)	NULL,
	`view_count`	int	NULL,
	`create_ip`	varchar(255)	NULL,
	`enabled`	bit(1)	NULL,
	`tag_string`	varchar(255)	NULL,
	`date_created`	datetime	NULL,
	`last_updated`	datetime	NULL,
	`category_id`	int	NOT NULL
);

CREATE TABLE `category` (
	`id`	int	NOT NULL,
	`name`	varchar(20)	NOT NULL,
	`date_created`	datetime	NULL,
	`last_updated`	datetime	NULL,
	`url`	varchar(255)	NULL
);

CREATE TABLE `file` (
	`id`	int	NOT NULL,
	`name`	varchar(255)	NULL,
	`type`	varchar(255)	NULL,
	`width`	int	NULL,
	`height`	int	NULL,
	`byte_size`	int	NULL,
	`Field`	VARCHAR(255)	NULL
);

CREATE TABLE `content` (
	`id`	int	NOT NULL,
	`a_nick_name`	varchar(255)	NULL,
	`create_ip`	varchar(255)	NULL,
	`date_created`	datetime	NULL,
	`last_updated`	datetime	NULL,
	`selected`	bit(1)	NULL,
	`text`	longtext	NULL,
	`text_type`	int	NULL,
	`type`	int	NULL,
	`post_no`	varchar(255)	NULL
);

CREATE TABLE `market` (
	`id`	int	NOT NULL,
	`token_id`	int	NOT NULL,
	`base_price`	bigint	NULL,
	`type`	bit(1)	NULL,
	`bid_price`	bigint	NULL,
	`seller_address`	varchar(256)	NULL,
	`buyer_address`	varchar(256)	NULL,
	`is_saled`	bit(1)	NULL,
	`contract_address`	varchar(256)	NULL,
	`charity_wallet_address`	varchar(256)	NOT NULL,
	`enabled`	bit(1)	NULL
);

CREATE TABLE `nft_art` (
	`token_id`	int	NOT NULL,
	`item_hash`	varchar(256)	NULL,
	`item_title`	varchar(20)	NULL,
	`item_description`	varchar(300)	NULL,
	`file_extention`	varchar(20)	NULL,
	`artist_hash`	varchar(20)	NOT NULL,
	`owner_hash`	varchar(20)	NOT NULL,
	`date_created`	datetime	NULL,
	`tag_string`	varchar(255)	NULL,
	`is_mint_saled`	bit(1)	NULL
);

CREATE TABLE `notification` (
	`id`	int	NOT NULL,
	`date_created`	datetime	NULL,
	`last_updated`	datetime	NULL,
	`type`	varchar(255)	NULL,
	`private_hash`	varchar(256)	NOT NULL,
	`description`	varchar(100)	NULL
);

CREATE TABLE `notification_read` (
	`id`	int	NOT NULL,
	`last_read`	datetime	NULL,
	`private_hash`	varchar(256)	NOT NULL
);

CREATE TABLE `follow` (
	`id`	int	NOT NULL,
	`private_hash`	varchar(256)	NOT NULL,
	`following_address`	varchar(20)	NOT NULL,
	`date_created`	datetime	NULL
);

CREATE TABLE `artist` (
	`private_hash`	varchar(256)	NOT NULL,
	`image_path`	varchar(255)	NULL,
	`image_type`	varchar(10)	NULL,
	`description`	varchar(1000)	NULL
);

CREATE TABLE `charity` (
	`wallet_address`	varchar(256)	NOT NULL,
	`name`	varchar(100)	NULL,
	`url`	varchar(300)	NULL
);

CREATE TABLE `income_log` (
	`id`	bigint	NOT NULL,
	`private_hash`	varchar(256)	NOT NULL,
	`income_date`	datetime	NULL,
	`money`	int	NULL,
	`type`	varchar(40)	NULL,
	`token_id`	int	NULL,
	`message`	varchar(300)	NULL
);

CREATE TABLE `wish_list` (
	`id`	int	NOT NULL,
	`token_id`	int	NOT NULL,
	`wallet_address`	varchar(256)	NULL
);

CREATE TABLE `artist_list` (
	`id`	int	NOT NULL,
	`private_hash`	varchar(256)	NOT NULL,
	`name`	varchar(50)	NULL,
	`regist_number`	varchar(50)	NULL,
	`file_id`	varchar(256)	NULL
);

CREATE TABLE `content_file` (
	`file_id`	int	NOT NULL,
	`article_id`	int	NOT NULL
);

ALTER TABLE `spam_word` ADD CONSTRAINT `PK_SPAM_WORD` PRIMARY KEY (
	`id`
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`private_hash`
);

ALTER TABLE `article` ADD CONSTRAINT `PK_ARTICLE` PRIMARY KEY (
	`id`
);

ALTER TABLE `category` ADD CONSTRAINT `PK_CATEGORY` PRIMARY KEY (
	`id`
);

ALTER TABLE `file` ADD CONSTRAINT `PK_FILE` PRIMARY KEY (
	`id`
);

ALTER TABLE `content` ADD CONSTRAINT `PK_CONTENT` PRIMARY KEY (
	`id`
);

ALTER TABLE `market` ADD CONSTRAINT `PK_MARKET` PRIMARY KEY (
	`id`
);

ALTER TABLE `nft_art` ADD CONSTRAINT `PK_NFT_ART` PRIMARY KEY (
	`token_id`
);

ALTER TABLE `notification` ADD CONSTRAINT `PK_NOTIFICATION` PRIMARY KEY (
	`id`
);

ALTER TABLE `notification_read` ADD CONSTRAINT `PK_NOTIFICATION_READ` PRIMARY KEY (
	`id`
);

ALTER TABLE `follow` ADD CONSTRAINT `PK_FOLLOW` PRIMARY KEY (
	`id`
);

ALTER TABLE `artist` ADD CONSTRAINT `PK_ARTIST` PRIMARY KEY (
	`private_hash`
);

ALTER TABLE `charity` ADD CONSTRAINT `PK_CHARITY` PRIMARY KEY (
	`wallet_address`
);

ALTER TABLE `income_log` ADD CONSTRAINT `PK_INCOME_LOG` PRIMARY KEY (
	`id`
);

ALTER TABLE `wish_list` ADD CONSTRAINT `PK_WISH_LIST` PRIMARY KEY (
	`id`
);

ALTER TABLE `artist_list` ADD CONSTRAINT `PK_ARTIST_LIST` PRIMARY KEY (
	`id`
);

ALTER TABLE `content_file` ADD CONSTRAINT `PK_CONTENT_FILE` PRIMARY KEY (
	`file_id`
);

ALTER TABLE `article` ADD CONSTRAINT `FK_user_TO_article_1` FOREIGN KEY (
	`private_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `article` ADD CONSTRAINT `FK_category_TO_article_1` FOREIGN KEY (
	`category_id`
)
REFERENCES `category` (
	`id`
);

ALTER TABLE `content` ADD CONSTRAINT `FK_article_TO_content_1` FOREIGN KEY (
	`id`
)
REFERENCES `article` (
	`id`
);

ALTER TABLE `market` ADD CONSTRAINT `FK_nft_art_TO_market_1` FOREIGN KEY (
	`token_id`
)
REFERENCES `nft_art` (
	`token_id`
);

ALTER TABLE `market` ADD CONSTRAINT `FK_charity_TO_market_1` FOREIGN KEY (
	`charity_wallet_address`
)
REFERENCES `charity` (
	`wallet_address`
);

ALTER TABLE `nft_art` ADD CONSTRAINT `FK_user_TO_nft_art_1` FOREIGN KEY (
	`artist_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `nft_art` ADD CONSTRAINT `FK_user_TO_nft_art_2` FOREIGN KEY (
	`owner_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `notification` ADD CONSTRAINT `FK_user_TO_notification_1` FOREIGN KEY (
	`private_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `notification_read` ADD CONSTRAINT `FK_user_TO_notification_read_1` FOREIGN KEY (
	`private_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `follow` ADD CONSTRAINT `FK_user_TO_follow_1` FOREIGN KEY (
	`private_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `follow` ADD CONSTRAINT `FK_user_TO_follow_2` FOREIGN KEY (
	`following_address`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `artist` ADD CONSTRAINT `FK_user_TO_artist_1` FOREIGN KEY (
	`private_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `income_log` ADD CONSTRAINT `FK_user_TO_income_log_1` FOREIGN KEY (
	`private_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `income_log` ADD CONSTRAINT `FK_nft_art_TO_income_log_1` FOREIGN KEY (
	`token_id`
)
REFERENCES `nft_art` (
	`token_id`
);

ALTER TABLE `wish_list` ADD CONSTRAINT `FK_nft_art_TO_wish_list_1` FOREIGN KEY (
	`token_id`
)
REFERENCES `nft_art` (
	`token_id`
);

ALTER TABLE `artist_list` ADD CONSTRAINT `FK_user_TO_artist_list_1` FOREIGN KEY (
	`private_hash`
)
REFERENCES `user` (
	`private_hash`
);

ALTER TABLE `content_file` ADD CONSTRAINT `FK_file_TO_content_file_1` FOREIGN KEY (
	`file_id`
)
REFERENCES `file` (
	`id`
);

ALTER TABLE `content_file` ADD CONSTRAINT `FK_content_TO_content_file_1` FOREIGN KEY (
	`article_id`
)
REFERENCES `content` (
	`id`
);

