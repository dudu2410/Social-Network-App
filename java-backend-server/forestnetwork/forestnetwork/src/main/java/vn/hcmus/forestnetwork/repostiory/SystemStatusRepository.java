package vn.hcmus.forestnetwork.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmus.forestnetwork.entity.SystemStatus;

@Repository
public interface SystemStatusRepository extends JpaRepository<SystemStatus,Integer>, SystemStatusRepositoryCustom {
}
