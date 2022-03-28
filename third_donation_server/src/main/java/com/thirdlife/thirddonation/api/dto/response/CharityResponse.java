package com.thirdlife.thirddonation.api.dto.response;

import com.thirdlife.thirddonation.common.model.response.BaseResponseBody;
import com.thirdlife.thirddonation.db.entity.nft.Charity;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 자선 단체 리스트를 반환하는 DTO.
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CharityResponse extends BaseResponseBody {

    private List<Charity> data;

    /**
     * 상태 코드와 메시지, 자선 단체 리스트를 입력받아 CharityResponse 객체를 반환합니다.
     *
     * @param statusCode Integer
     * @param message String
     * @param list List
     * @return CharityResponse
     */
    public static CharityResponse of(Integer statusCode, String message, List<Charity> list) {
        CharityResponse response = new CharityResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setData(list);
        return response;
    }
}
