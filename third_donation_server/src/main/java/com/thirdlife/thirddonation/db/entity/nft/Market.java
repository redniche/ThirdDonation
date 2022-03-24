package com.thirdlife.thirddonation.db.entity.nft;

import com.thirdlife.thirddonation.db.entity.user.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
 *  거래소 엔티티.
 */
@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Market {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "token_id", referencedColumnName = "id", nullable = false)
    private Nft nft;

    @Column(nullable = false)
    private Long basePrice;

    private Long bidPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", referencedColumnName = "id", nullable = false)
    private User buyer;

    @Column(nullable = false)
    private String contractAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "charity_address", referencedColumnName = "id")
    private Charity charity;

    @Column(nullable = false)
    private boolean soldOut;

    @Column(nullable = false)
    private boolean enabled;

}
