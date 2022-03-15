package com.thirdlife.thirddonation.db.entity.nft;

import com.thirdlife.thirddonation.db.entity.user.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * NFT 작품을 위한 엔티티.
 */
@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class NftArt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tokenId;

    @Column(length = 256)
    private String itemHash;

    @Column(length = 20)
    private String itemTitle;

    @Column(length = 300)
    private String itemDescription;

    @Column(length = 20)
    private String fileExtension;

    @ManyToOne
    @JoinColumn(name = "onwer_address", referencedColumnName = "wallet_address")
    private User ownerAddress;

    private LocalDateTime dateCreated;

    private String tagString;

    @Column(nullable = false)
    private boolean isMintSold;
}
