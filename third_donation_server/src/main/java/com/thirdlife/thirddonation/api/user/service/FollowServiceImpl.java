package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.nft.dto.NftInfoDto;
import com.thirdlife.thirddonation.api.user.dto.UserInfoDto;
import com.thirdlife.thirddonation.api.user.dto.request.FollowRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.db.nft.entity.Nft;
import com.thirdlife.thirddonation.db.user.entity.Follow;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.user.repository.FollowRepository;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 예술가 팔로우 서비스.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    /**
     * 예술가 팔로우 요첟.
     *
     * @param followRequest FollowRequest
     */
    public void createFollow(FollowRequest followRequest) {
        final User user = userService.getAuthUser();

        User artist = getFollowArtist(followRequest, user);

        followRepository.findByUserAndFollowingArtist(user, artist)
                .ifPresent(follow -> {
                    throw new CustomException(ErrorCode.FOLLOW_DUPLICATE);
                });

        artist.setFollowerCount(artist.getFollowerCount() + 1);

        userRepository.save(artist);

        followRepository.save(Follow.builder()
                .user(user)
                .followingArtist(artist)
                .dateCreated(LocalDateTime.now())
                .build()
        );
    }

    /**
     * 예술가 팔로우 삭제 요청.
     *
     * @param followRequest FollowRequest
     */
    @Override
    public void deleteFollow(FollowRequest followRequest) {
        final User user = userService.getAuthUser();

        User artist = getFollowArtist(followRequest, user);

        Follow follow = followRepository.findByUserAndFollowingArtist(user, artist)
                .orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_FOUND));

        artist.setFollowerCount(artist.getFollowerCount() - 1);

        userRepository.save(artist);

        followRepository.delete(follow);
    }

    private User getFollowArtist(FollowRequest followRequest, User user) {
        final Long artistId = followRequest.getArtistId();
        if (artistId.equals(user.getId())) {
            throw new CustomException(ErrorCode.CANNOT_FOLLOW_MYSELF);
        }

        return userRepository.findById(followRequest.getArtistId())
                .orElseThrow(() -> new CustomException(ErrorCode.ARTIST_NOT_FOUND));
    }

    /**
     * 예술가 팔로워 리스트 조회.
     *
     * @param userId Long
     * @param pageable Pageable
     * @return Slice
     */
    @Override
    public Slice<UserInfoDto> getFollowerList(Long userId, Pageable pageable) {
        Slice<Follow> page = followRepository.findAllByFollowingArtist_Id(userId, pageable)
                .orElseThrow(() -> new CustomException(ErrorCode.NFT_NOT_FOUND));
        return page.map(UserInfoDto::of3);
    }

    /**
     * 해당 아티스트 아이디에 내 팔로워 정보가 존재하는지 보기.
     *
     * @param artistId Long
     * @return artistId
     */
    @Override
    public Boolean getFollowerInfo(Long artistId) {
        final User user = userService.getAuthUser();
        return followRepository.existsByUserIdAndFollowingArtistId(user.getId(), artistId);
    }
}
