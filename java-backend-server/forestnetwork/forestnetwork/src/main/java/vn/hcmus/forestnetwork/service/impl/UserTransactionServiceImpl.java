package vn.hcmus.forestnetwork.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmus.forestnetwork.dto.UserInfoDTO;
import vn.hcmus.forestnetwork.dto.UserTransactionDTO;
import vn.hcmus.forestnetwork.entity.UserTransaction;
import vn.hcmus.forestnetwork.mapper.UserTransactionMapper;
import vn.hcmus.forestnetwork.repostiory.UserTransactionRepository;
import vn.hcmus.forestnetwork.service.UserTransactionService;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserTransactionServiceImpl implements UserTransactionService {

    @Autowired
    private UserTransactionRepository userTransactionRepository;

    @Override
    public Long getCurrentTransactionSequenceOfUser(String address) {
        return userTransactionRepository.getCurrentTransactionSequenceByAddress(address);
    }

    @Override
    public List<UserTransactionDTO> getAllTransactionOfUser(String address) {
        List<UserTransaction> result = userTransactionRepository.getAllUserTransactionByAddress(address);
        return result.stream()
                .map(UserTransactionMapper::toUserTransactionDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserTransactionDTO> getAllPostOfUser(String address) {
        List<UserTransaction> result = userTransactionRepository.getAllUserPostByAddress(address);
        return result.stream()
                .map(UserTransactionMapper::toUserTransactionDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserInfoDTO getUserInfo(String address) {
        UserInfoDTO userInfoDTO = new UserInfoDTO();
        userInfoDTO.setFollowings(getFollowingAddresses(address));
        userInfoDTO.setName(getLastInfo(address, "name"));
        userInfoDTO.setPicture(getLastInfo(address, "picture"));
        Map<String,Long> currency = new HashMap<>();
        currency.put("amount",getUserCurrency(address));
        userInfoDTO.setCurrency(currency);
        userInfoDTO.setOxy(0L);
        return userInfoDTO;
    }

    private Set<String> getFollowingAddresses(String address) {
        List<UserTransactionDTO> followings = userTransactionRepository.getAllFollowingTransaction(address)
                .stream().map(UserTransactionMapper::toUserTransactionDTO)
                .collect(Collectors.toList());
        Set<String> followingAddresses = new HashSet<>();
        followings.forEach(userTransactionDTO -> {
            Map<String, List<String>> addressMap = (Map<String, List<String>>) userTransactionDTO.getContent();
            followingAddresses.addAll(addressMap.get("addresses"));
        });
        return followingAddresses;
    }

    private Long getReceiveCurrency(String address) {
        List<UserTransactionDTO> receiveCurr = userTransactionRepository.getRecieveCurrencyTransaction(address)
                .stream().map(UserTransactionMapper::toUserTransactionDTO)
                .collect(Collectors.toList());
        Long total = 0L;
        for (UserTransactionDTO userTransactionDTO : receiveCurr) {
            String currency = ((Map<String, String>) userTransactionDTO.getContent()).get("amount");
            if (!currency.isEmpty()) {
                total += Long.parseLong(currency);
            }
        }
        return total;
    }

    private Long getSendCurrency(String address) {
        List<UserTransactionDTO> receiveCurr = userTransactionRepository.getSendCurrencyTransaction(address)
                .stream().map(UserTransactionMapper::toUserTransactionDTO)
                .collect(Collectors.toList());
        Long total = 0L;
        for (UserTransactionDTO userTransactionDTO : receiveCurr) {
            String currency = ((Map<String, String>) userTransactionDTO.getContent()).get("amount");
            if (!currency.isEmpty()) {
                total += Long.parseLong(currency);
            }
        }
        return total;
    }

    private Long getUserCurrency(String address) {
        return getReceiveCurrency(address) - getSendCurrency(address);
    }

    private String getLastInfo(String address, String type) {
        Optional<UserTransaction> updateAccTx = userTransactionRepository.getLastAccountUpdate(address, type)
                .stream().max(Comparator.comparing(UserTransaction::getTxSequence));
        if (updateAccTx.isPresent()) {
            return updateAccTx.get().getContent();
        } else {
            return "";
        }
    }
}
