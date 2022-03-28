package com.thirdlife.thirddonation.api.service.user;

import com.thirdlife.thirddonation.api.dto.request.user.FollowRequest;
import com.thirdlife.thirddonation.api.exception.CustomException;
import com.thirdlife.thirddonation.api.exception.ErrorCode;
import com.thirdlife.thirddonation.db.entity.user.Follow;
import com.thirdlife.thirddonation.db.entity.user.User;
import com.thirdlife.thirddonation.db.repository.FollowRepository;
import com.thirdlife.thirddonation.db.repository.UserRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
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

    /**
     * 예술가 팔로우 요첟.
     *
     * @param followRequest FollowRequest
     */
    public void createFollow(FollowRequest followRequest) {
        final User user = userRepository.findById(followRequest.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        User artist = userRepository.findById(followRequest.getArtistId())
                .orElseThrow(() -> new CustomException(ErrorCode.ARTIST_NOT_FOUND));

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
        final User user = userRepository.findById(followRequest.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        User artist = userRepository.findById(followRequest.getArtistId())
                .orElseThrow(() -> new CustomException(ErrorCode.ARTIST_NOT_FOUND));

        Follow follow = followRepository.findByUserAndFollowingArtist(user, artist)
                .orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_FOUND));

        artist.setFollowerCount(artist.getFollowerCount() - 1);

        userRepository.save(artist);

        followRepository.delete(follow);
    }
}
