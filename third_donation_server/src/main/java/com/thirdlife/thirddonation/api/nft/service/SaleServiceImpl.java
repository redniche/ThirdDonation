package com.thirdlife.thirddonation.api.nft.service;

import com.thirdlife.thirddonation.api.nft.dto.MessageInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.SaleInfoDto;
import com.thirdlife.thirddonation.api.nft.dto.request.BuyRequest;
import com.thirdlife.thirddonation.api.nft.dto.request.SellRequest;
import com.thirdlife.thirddonation.api.user.service.UserService;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.charity.entity.Charity;
import com.thirdlife.thirddonation.db.charity.repository.CharityRepository;
import com.thirdlife.thirddonation.db.log.document.IncomeLog;
import com.thirdlife.thirddonation.db.log.repository.IncomeLogRepository;
import com.thirdlife.thirddonation.db.nft.entity.Nft;
import com.thirdlife.thirddonation.db.nft.entity.Sales;
import com.thirdlife.thirddonation.db.nft.repository.NftRepository;
import com.thirdlife.thirddonation.db.nft.repository.SalesRepository;
import com.thirdlife.thirddonation.db.notification.entity.Notification;
import com.thirdlife.thirddonation.db.notification.entity.NotificationType;
import com.thirdlife.thirddonation.db.notification.repository.NotificationRepository;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

/**
 * NFT 판매 서비스.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {

    private final NftRepository nftRepository;
    private final SalesRepository salesRepository;
    private final UserRepository userRepository;
    private final CharityRepository charityRepository;
    private final IncomeLogRepository incomeLogRepository;
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    /**
     * NFT 판매 정보를 등록하는 메서드입니다.
     *
     * @param sellRequest NftSalesRegisterRequest
     */
    @Override
    public void sell(SellRequest sellRequest) {
        User seller;
        try {
            seller = userService.getAuthUser();
        } catch (Exception ex) {
            throw new CustomException(ErrorCode.SELLER_NOT_FOUND);
        }

        final Long tokenId = sellRequest.getTokenId();
        final Nft nft = nftRepository.findById(tokenId)
                .orElseThrow(() -> new CustomException(ErrorCode.NFT_NOT_FOUND));

        if (!seller.getId().equals(nft.getOwner().getId())) {
            throw new CustomException(ErrorCode.CANNOT_SELL_OTHERS);
        }

        Sales sales = sellRequest.toEntity();
        sales.setSeller(seller);
        sales.setNft(nft);

        salesRepository.save(sales);
    }

    /**
     * NFT 구입 정보 등록 메서드.
     */
    @Override
    public void buy(BuyRequest buyRequest) {

        User buyer;
        try {
            buyer = userService.getAuthUser();
        } catch (Exception ex) {
            throw new CustomException(ErrorCode.BUYER_NOT_FOUND);
        }

        final Long saleId = buyRequest.getSaleId();
        Sales sales = salesRepository.findById(saleId)
                .orElseThrow(() -> new CustomException(ErrorCode.SALE_NOT_FOUND));
        final User seller = sales.getSeller();

        if (!sales.getEnabled()) {
            throw new CustomException(ErrorCode.CANNOT_BUY_DISABLED);
        } else if (sales.getSoldOut()) {
            throw new CustomException(ErrorCode.CANNOT_BUY_SOLD_OUT);
        } else if (!seller.getId().equals(buyer.getId())) {
            throw new CustomException(ErrorCode.CANNOT_BUY_MINE);
        }

        final String message = buyRequest.getMessage();
        final String charityWalletAddress = buyRequest.getCharityWalletAddress();

        sales.setBuyer(buyer);
        sales.setSoldOut(true);
        sales.getNft().setOwner(buyer);

        if (message != null) {
            sales.setMessage(message);
        }

        if (charityWalletAddress != null) {
            final Charity charity = charityRepository.findById(charityWalletAddress)
                    .orElseThrow(() -> new CustomException(ErrorCode.CHARITY_NOT_FOUND));
            sales.setCharity(charity);
        }

        // 알림 저장
        notificationRepository.save(Notification.builder()
                .user(seller)
                .type(NotificationType.SELL_COMPLETE)
                .description("NFT 판매 완료되었습니다.")
                .build()
        );

        final Nft nft = sales.getNft();
        final User nftArtist = nft.getArtist();
        final boolean sellerIsArtist = seller.equals(nftArtist);

        // 판매자 수익 기록 (90%)
        IncomeLog log = IncomeLog.builder()
                .userId(seller.getId())
                .tokenId(nft.getId())
                .income((long) ((double) sales.getBasePrice() * 0.9))
                .tradingDate(LocalDateTime.now())
                .build();

        incomeLogRepository.save(log);

        // 거래소 수익 기록 (2%)
        log = IncomeLog.builder()
                .userId(11L)
                .tokenId(nft.getId())
                .income((long) ((double) sales.getBasePrice() * 0.02))
                .tradingDate(LocalDateTime.now())
                .build();

        incomeLogRepository.save(log);

        // 판매자가 일반 사용자인 경우, 예술가 수익 기록 (6%)
        if (!sellerIsArtist) {
            log = IncomeLog.builder()
                    .userId(nftArtist.getId())
                    .tokenId(nft.getId())
                    .income((long) ((double) sales.getBasePrice() * 0.06))
                    .tradingDate(LocalDateTime.now())
                    .build();

            incomeLogRepository.save(log);
        }

        // 구매자 수익 기록
        log = IncomeLog.builder()
                .userId(buyer.getId())
                .tokenId(nft.getId())
                .income(-sales.getBasePrice())
                .tradingDate(LocalDateTime.now())
                .build();

        incomeLogRepository.save(log);
    }

    /**
     * NFT 판매 중지 메서드입니다.
     *
     * @param id Long
     */
    @Override
    public void disableSales(Long id) {
        User seller;
        try {
            seller = userService.getAuthUser();
        } catch (Exception ex) {
            throw new CustomException(ErrorCode.SELLER_NOT_FOUND);
        }
        final Sales sales = salesRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.SALE_NOT_FOUND));
        if (!Objects.equals(seller.getId(), sales.getSeller().getId())) {
            throw new CustomException(ErrorCode.USER_INVALID);
        }

        sales.setEnabled(false);
        salesRepository.save(sales);
    }

    /**
     * 판매 리스트 조회 메서드.
     *
     * @param pageable Pageable
     * @return List of Sales
     */
    @Override
    public Page<SaleInfoDto> getSalesList(Pageable pageable) {
        Page<Sales> page = salesRepository.findAllBySoldOutAndEnabled(false, true, pageable);

        return page.map(SaleInfoDto::of);
    }

    /**
     * 판매 토큰 메시지 조회 메서드.
     *
     * @param pageable Pageable
     * @return List of Messages
     */
    @Override
    public Page<MessageInfoDto> getMessageList(Pageable pageable) {
        Page<Sales> page =
                salesRepository.findAllBySoldOutAndEnabled(true, true, pageable);
        return page.map(MessageInfoDto::of);
    }

    /**
     * 판매 리스트 필터링 조회 메서드.
     *
     * @param pageable Pageable
     * @param searchKeywords Specification
     * @return Page of SaleInfoDto
     */
    @Override
    public Page<SaleInfoDto> getSalesListFilter(Pageable pageable,
                                                Specification<Sales> searchKeywords) {
        Page<Sales> page = salesRepository.findAll(searchKeywords, pageable);

        return page.map(SaleInfoDto::of);
    }
}
