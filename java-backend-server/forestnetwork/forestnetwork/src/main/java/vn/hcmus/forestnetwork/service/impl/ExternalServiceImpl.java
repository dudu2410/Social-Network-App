package vn.hcmus.forestnetwork.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import vn.hcmus.forestnetwork.constant.ApiURI;
import vn.hcmus.forestnetwork.dto.UserTransactionDTO;
import vn.hcmus.forestnetwork.service.ExternalService;

import java.util.Arrays;
import java.util.List;

@Service
public class ExternalServiceImpl implements ExternalService {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public List<Object> test() {
        return restTemplate.getForObject("http://localhost:3002/get/transactions?address=GBOVRS6DWD56GOIEYHFFYRLUBCV3JPQXRZ7YY4B34IHK6KWO4MQXGNZF", List.class);
    }

    @Override
    public Long getCurrentSystemBlockHeight() {
        return restTemplate.getForObject(ApiURI.getGetCurrentSystemBlockHeightUri(), Long.class);
    }

    @Override
    public  List<UserTransactionDTO> getAllTransactionOfBlockByHeight(Long height) {
       UserTransactionDTO[] reponse = restTemplate.getForObject(ApiURI.getAlTransactionOfBlockByHeightUri(height), UserTransactionDTO[].class);
       return Arrays.asList(reponse);
    }
}
