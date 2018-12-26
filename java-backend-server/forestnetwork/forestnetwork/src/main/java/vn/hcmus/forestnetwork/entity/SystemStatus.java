package vn.hcmus.forestnetwork.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SYSTEM_STATUS")
public class SystemStatus {
    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Integer id;

    @Column(name = "OUR_SYSTEM_BLOCK_HEIGHT")
    private Long ourSystemBlockHeight;

    @Column(name = "FOREST_SYSTEM_BLOCK_HEIGHT")
    private Long forestSystemBlockHeight;
}
