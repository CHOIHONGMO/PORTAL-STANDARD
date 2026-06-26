package com.portal.user.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

@Entity
@Table(name = "COMVNUSERMASTER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Immutable
public class UserMaster {

    @Id
    @Column(name = "ESNTL_ID", length = 20)
    private String esntlId;

    @Column(name = "USER_ID", length = 20)
    private String userId;

    @Column(name = "USER_NM", length = 60)
    private String userNm;
}
