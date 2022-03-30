package com.thirdlife.thirddonation.db.board.entity;

import java.time.LocalDateTime;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


/**
 * 생성시간과 최종변경시간을 자동으로 만들어주는 BaseEntity 추상 클래스입니다.
 */
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public abstract class BaseEntity {
    @CreatedDate
    protected LocalDateTime dateCreated;

    @LastModifiedDate
    protected LocalDateTime dateLastUpdated;
}
