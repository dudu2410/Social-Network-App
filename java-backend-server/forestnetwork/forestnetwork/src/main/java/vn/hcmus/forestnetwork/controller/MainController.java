package vn.hcmus.forestnetwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.hcmus.forestnetwork.dto.UserInfoDTO;
import vn.hcmus.forestnetwork.dto.UserTransactionDTO;
import vn.hcmus.forestnetwork.service.ExternalService;
import vn.hcmus.forestnetwork.service.UserTransactionService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MainController {

    @Autowired
    private ExternalService externalService;

    @Autowired
    private UserTransactionService userTransactionService;

    @CrossOrigin
    @RequestMapping("/get/current_user_info")
    public UserInfoDTO getCurrentUserInfo(@RequestParam(value = "address") String address) {
        return userTransactionService.getUserInfo(address);
    }


    @CrossOrigin
    @RequestMapping("/get/post")
    public List<UserTransactionDTO> getAllUserPost(@RequestParam(value = "address") String address){
        return userTransactionService.getAllPostOfUser(address);
    }

    @CrossOrigin
    @RequestMapping("/get/transactions")
    public List<UserTransactionDTO> getAllUserTransaction(@RequestParam(value = "address") String address){
        return userTransactionService.getAllTransactionOfUser(address);
    }

    @CrossOrigin
    @RequestMapping("/get/current_sequence")
    public Map<String,Long> getCurrentSequence(@RequestParam(value = "address") String address){
        Map<String,Long> result = new HashMap<>();
        result.put("sequence", userTransactionService.getCurrentTransactionSequenceOfUser(address));
        userTransactionService.getCurrentTransactionSequenceOfUser(address);
        return result;
    }

}
