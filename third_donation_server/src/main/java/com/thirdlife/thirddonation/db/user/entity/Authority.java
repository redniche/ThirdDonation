package com.thirdlife.thirddonation.db.user.entity;

/**
 * 권한을 명시하는 enum 클래스입니다.
 * 순서를 바꾸지 마세요. 오른쪽일수록 더 큰 권한을 가지고 있습니다.
 */
public enum Authority {
    NORMAL(0), ARTIST(1), ADMIN(2);

    Authority(int i) {
    }
}
