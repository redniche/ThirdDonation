package com.thirdlife.thirddonation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * This is start point of ThirdDonationApplication.
 */
@SpringBootApplication
@EnableMongoRepositories(basePackages = {"com.thirdlife.thirddonation.db.log.*"})
public class ThirdDonationApplication {
    /**
     * This is main of ThirdDonationApplication.
     *
     * @param args String[]
     */
    public static void main(String[] args) {
        SpringApplication.run(ThirdDonationApplication.class, args);
    }

}
