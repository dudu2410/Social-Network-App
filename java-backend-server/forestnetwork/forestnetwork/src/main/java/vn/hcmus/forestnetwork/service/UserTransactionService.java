package vn.hcmus.forestnetwork.service;

import vn.hcmus.forestnetwork.dto.UserInfoDTO;
import vn.hcmus.forestnetwork.dto.UserTransactionDTO;

import java.util.List;

public interface UserTransactionService {

    Long getCurrentTransactionSequenceOfUser(String address);

    List<UserTransactionDTO> getAllTransactionOfUser(String address);

    List<UserTransactionDTO> getAllPostOfUser(String address);

    UserInfoDTO getUserInfo(String address);
}
