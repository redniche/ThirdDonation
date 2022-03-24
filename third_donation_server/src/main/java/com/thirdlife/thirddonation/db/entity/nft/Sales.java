package com.thirdlife.thirddonation.db.entity.nft;

import com.thirdlife.thirddonation.db.entity.user.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
 *  거래소 판매 정보 엔티티.
 */
@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SaleType saleType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "token_id", referencedColumnName = "id", nullable = false)
    private Nft nft;

    @Column(nullable = false)
    private Long basePrice;

    private Long auctionPrice;

    private LocalDateTime bidClosingTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", referencedColumnName = "id")
    private User buyer;

    @Column(nullable = false)
    private String contractAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "charity_wallet_address", referencedColumnName = "id")
    private Charity charity;

    @Column(nullable = false)
    private boolean soldOut;

    @Column(nullable = false)
    private boolean enabled;

}
