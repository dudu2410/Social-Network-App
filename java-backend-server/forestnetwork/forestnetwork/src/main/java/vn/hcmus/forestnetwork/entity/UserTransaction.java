package vn.hcmus.forestnetwork.entity;

import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@Entity
@Builder
@Table(name = "USER_TRANSACTION")
@AllArgsConstructor
@NoArgsConstructor
public class UserTransaction {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Long id;

    @Column(name = "FROM_ADDRESS")
    private String fromAddress;

    @Column(name = "TX_HASH")
    private String txHash;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "CONTENT_TYPE")
    private String contentType;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "TX_SEQUENCE")
    private Long txSequence;
}
