package com.thirdlife.thirddonation.db.entity.charity;

import com.thirdlife.thirddonation.db.entity.user.Authority;
import com.thirdlife.thirddonation.db.entity.user.UserProfile;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;

/**
 *  Charity 엔티티.
 *  id는 DB 에서 생성되는 값입니다.
 */
@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Charity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wallet_address", unique = true, nullable = false, length = 256)
    private String walletAddress;

    @Column(name = "id")
    private String name;

    @Column(nullable = false)
    private String url;
}
