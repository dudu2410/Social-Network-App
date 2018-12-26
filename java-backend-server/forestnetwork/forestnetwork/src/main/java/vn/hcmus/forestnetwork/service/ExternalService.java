package vn.hcmus.forestnetwork.service;

import vn.hcmus.forestnetwork.dto.UserTransactionDTO;

import java.util.List;

public interface ExternalService {

    List<Object> test();

    Long getCurrentSystemBlockHeight();

    List<UserTransactionDTO> getAllTransactionOfBlockByHeight(Long height);
}
