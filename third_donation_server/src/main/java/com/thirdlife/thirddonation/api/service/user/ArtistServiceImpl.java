package com.thirdlife.thirddonation.api.service.user;

import com.thirdlife.thirddonation.api.dto.request.user.ArtistRegisterRequest;
import com.thirdlife.thirddonation.api.exception.CustomException;
import com.thirdlife.thirddonation.api.exception.ErrorCode;
import com.thirdlife.thirddonation.db.entity.user.Artist;
import com.thirdlife.thirddonation.db.entity.user.User;
import com.thirdlife.thirddonation.db.repository.ArtistRepository;
import com.thirdlife.thirddonation.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 장애인 예술가 서비스.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class ArtistServiceImpl implements ArtistService {

    private final ArtistRepository artistRepository;
    private final UserRepository userRepository;

    /**
     * 장애인 예술가 신청 요청 등록.
     *
     * @param artistRegisterRequest ArtistRegisterRequest
     */
    @Override
    public void createArtist(ArtistRegisterRequest artistRegisterRequest) {
        if (artistRepository.existsById(artistRegisterRequest.getId())) {
            throw new CustomException(ErrorCode.ARTIST_DUPLICATE);
        }
        User user = userRepository.findById(artistRegisterRequest.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Artist artist = artistRegisterRequest.toEntity();
        artist.setUser(user);

        artistRepository.save(artist);
    }
}
