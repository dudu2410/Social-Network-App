package vn.hcmus.forestnetwork.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTransactionDTO {

    private String from;

    @JsonProperty("tx_hash")
    private String txHash;

    private String type;

    @JsonProperty("content_type")
    private String contentType;

    private Object content;

    private Long sequence;
}
