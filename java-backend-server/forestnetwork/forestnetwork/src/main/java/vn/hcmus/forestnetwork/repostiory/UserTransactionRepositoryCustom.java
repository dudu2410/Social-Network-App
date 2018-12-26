package vn.hcmus.forestnetwork.repostiory;

import vn.hcmus.forestnetwork.entity.UserTransaction;

import java.util.List;

public interface UserTransactionRepositoryCustom {

    Long getCurrentTransactionSequenceByAddress(String address);

    List<UserTransaction> getAllUserTransactionByAddress(String address);

    List<UserTransaction> getAllUserPostByAddress(String address);

    List<UserTransaction> getLastAccountUpdate(String address, String updateType);

    List<UserTransaction> getRecieveCurrencyTransaction(String address);

    List<UserTransaction> getSendCurrencyTransaction(String address);

    List<UserTransaction> getAllFollowingTransaction(String address);

    List<UserTransaction> getByTxHash(String txHash);
}
