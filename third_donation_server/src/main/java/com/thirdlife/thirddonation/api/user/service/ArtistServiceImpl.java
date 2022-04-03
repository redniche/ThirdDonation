package com.thirdlife.thirddonation.api.user.service;

import com.thirdlife.thirddonation.api.user.dto.ArtistInfoDto;
import com.thirdlife.thirddonation.api.user.dto.request.ArtistRegisterRequest;
import com.thirdlife.thirddonation.common.exception.CustomException;
import com.thirdlife.thirddonation.common.exception.ErrorCode;
import com.thirdlife.thirddonation.common.util.FileManageUtil;
import com.thirdlife.thirddonation.db.user.entity.Artist;
import com.thirdlife.thirddonation.db.user.entity.Authority;
import com.thirdlife.thirddonation.db.user.entity.User;
import com.thirdlife.thirddonation.db.user.repository.ArtistRepository;
import com.thirdlife.thirddonation.db.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
        Long userId = artistRegisterRequest.getUserId();
        User user = userRepository.findById(artistRegisterRequest.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        MultipartFile multipartFile = artistRegisterRequest.getImageFile();

        //파일저장
        String fileName = multipartFile.getOriginalFilename();
        String savingFileName = FileManageUtil.saveFile(multipartFile, fileName);

        //엔티티 생성

        Artist artist = artistRepository.findById(userId).orElse(null);
        if (artist == null) {
            artist = artistRegisterRequest.toEntity();
            artist.setUser(user);
        } else {
            artist.setName(artistRegisterRequest.getName());
            artist.setRegisterNumber(artistRegisterRequest.getRegisterNumber());
        }
        artist.setFilePath(savingFileName);
        artistRepository.save(artist);
    }

    /**
     * 장애인 예술가 신청 요청 등록.
     */
    @Override
    public Page<ArtistInfoDto> getArtistList(Pageable pageable) {
        return artistRepository.findAll(pageable).map(ArtistInfoDto::of);
    }

    /**
     * 장애인 예술가 신청 요청 등록.
     */
    @Override
    public void enableArtist(Long userId) {
        Artist artist = artistRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        // 허가할 때 없는 아이디일 수 있다.(삭제이상발생시)
        userRepository.findById(artist.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        User user = artist.getUser();
        if (user.getAuthority() == Authority.ADMIN) {
            throw new CustomException(ErrorCode.CANNOT_DOWN_AUTHORITY);
        } else if (user.getAuthority() == Authority.ARTIST) {
            artist.getUser().setAuthority(Authority.NORMAL);
            artist.setEnabled(false);
        } else {
            artist.getUser().setAuthority(Authority.ARTIST);
            artist.setEnabled(true);
        }

        artistRepository.save(artist);
    }
}
