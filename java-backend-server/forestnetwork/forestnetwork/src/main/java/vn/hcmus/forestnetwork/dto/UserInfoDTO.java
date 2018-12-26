package vn.hcmus.forestnetwork.dto;

import lombok.*;

import java.util.Map;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDTO {
    private String name;
    private String picture;
    Set<String> followings;
    private Map<String, Long> currency;
    private Long oxy;
}
