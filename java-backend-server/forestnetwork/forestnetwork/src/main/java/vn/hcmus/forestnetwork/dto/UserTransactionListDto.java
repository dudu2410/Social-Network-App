package vn.hcmus.forestnetwork.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class UserTransactionListDto {
    private List<Map<String,Object>> list;

    public UserTransactionListDto() {
        list = new ArrayList<>();
    }

}
