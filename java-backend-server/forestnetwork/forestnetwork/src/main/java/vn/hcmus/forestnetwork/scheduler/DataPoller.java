package vn.hcmus.forestnetwork.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import vn.hcmus.forestnetwork.dto.UserTransactionDTO;
import vn.hcmus.forestnetwork.entity.SystemStatus;
import vn.hcmus.forestnetwork.mapper.UserTransactionMapper;
import vn.hcmus.forestnetwork.repostiory.SystemStatusRepository;
import vn.hcmus.forestnetwork.repostiory.UserTransactionRepository;
import vn.hcmus.forestnetwork.service.ExternalService;

import javax.transaction.Transactional;
import java.util.List;

@Component
public class DataPoller {
    private static final Logger log = LoggerFactory.getLogger(DataPoller.class);

    @Autowired
    private ExternalService externalService;

    @Autowired
    private SystemStatusRepository systemStatusRepository;

    @Autowired
    private UserTransactionRepository userTransactionRepository;

    @Scheduled(fixedRate = 500)
    @Transactional(rollbackOn = RuntimeException.class)
    public void pollingData() {
        Long currentBlockHeight = externalService.getCurrentSystemBlockHeight();
        SystemStatus systemStatus;
        if (systemStatusRepository.count() == 0) {
            systemStatus = SystemStatus.builder()
                    .forestSystemBlockHeight(1L)
                    .ourSystemBlockHeight(0L)
                    .build();
        } else {
            systemStatus = systemStatusRepository.getCurrentSystemStatus();
        }
        if (!systemStatus.getForestSystemBlockHeight().equals(currentBlockHeight)) {
            systemStatus.setForestSystemBlockHeight(currentBlockHeight);
        }

        if (systemStatus.getOurSystemBlockHeight() <= systemStatus.getForestSystemBlockHeight()) {
            Long blockHeightToCall = systemStatus.getOurSystemBlockHeight() < systemStatus.getForestSystemBlockHeight() ?
                    systemStatus.getOurSystemBlockHeight() + 1 : systemStatus.getOurSystemBlockHeight();

            List<UserTransactionDTO> apiCallResult = externalService.getAllTransactionOfBlockByHeight(blockHeightToCall);

            apiCallResult.forEach(userTransactionDTO -> {
                if (CollectionUtils.isEmpty(userTransactionRepository.getByTxHash(userTransactionDTO.getTxHash()))) {
                    userTransactionRepository.save(UserTransactionMapper.toUserTransaction(userTransactionDTO));
                }
            });
            systemStatus.setOurSystemBlockHeight(blockHeightToCall);
        }

        systemStatusRepository.save(systemStatus);
        log.info("Processed block " + systemStatus.getOurSystemBlockHeight());
    }
}
