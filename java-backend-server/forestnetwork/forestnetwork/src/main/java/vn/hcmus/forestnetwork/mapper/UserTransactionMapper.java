package vn.hcmus.forestnetwork.mapper;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import vn.hcmus.forestnetwork.dto.UserTransactionDTO;
import vn.hcmus.forestnetwork.entity.UserTransaction;
import vn.hcmus.forestnetwork.util.JsonUtil;

import java.util.*;

public class UserTransactionMapper {
    private UserTransactionMapper() {
    }

    public static UserTransaction toUserTransaction(UserTransactionDTO userTransactionDTO) {
        return UserTransaction.builder()
                .fromAddress(userTransactionDTO.getFrom())
                .txHash(userTransactionDTO.getTxHash())
                .contentType(userTransactionDTO.getContentType())
                .txSequence(userTransactionDTO.getSequence())
                .type(userTransactionDTO.getType())
                .content(userTransactionDTO.getContent() instanceof Map ?
                        new JSONObject((Map) userTransactionDTO.getContent()).toString()
                        : (String) userTransactionDTO.getContent())
                .build();
    }

    public static UserTransactionDTO toUserTransactionDTO(UserTransaction userTransaction) {
        Object content = null;
        if (userTransaction.getContentType().equals("followings")) {

            Map<String, List<String>> result = new HashMap<>();
            List<String> addresses = new ArrayList<>();
            try {
                String jsonStr = (String) JsonUtil.jsonToMap(userTransaction.getContent(), userTransaction.getContentType()).get("addresses");
                jsonStr = jsonStr.replace("[", "");
                jsonStr = jsonStr.replace("]", "");
                jsonStr = jsonStr.replace(" ", "");
                if (!jsonStr.isEmpty()) {
                    String[] parts = jsonStr.split(",");
                    addresses.addAll(Arrays.asList(parts));
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
            result.put("addresses", addresses);
            content = result;
        } else {
            try {
                content = JsonUtil.isJSONValid(userTransaction.getContent()) ?
                        JsonUtil.jsonToMap(userTransaction.getContent(), userTransaction.getContentType()) :
                        userTransaction.getContent();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        UserTransactionDTO result = new UserTransactionDTO();
        result = UserTransactionDTO.builder()
                .txHash(userTransaction.getTxHash())
                .from(userTransaction.getFromAddress())
                .contentType(userTransaction.getContentType())
                .type(userTransaction.getType())
                .sequence(userTransaction.getTxSequence())
                .content(content)
                .build();

        return result;
    }
}
