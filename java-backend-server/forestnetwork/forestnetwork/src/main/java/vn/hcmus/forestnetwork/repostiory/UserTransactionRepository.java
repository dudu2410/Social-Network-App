package vn.hcmus.forestnetwork.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;
import vn.hcmus.forestnetwork.entity.UserTransaction;

@Repository
public interface UserTransactionRepository extends JpaRepository<UserTransaction, Long>, QuerydslPredicateExecutor<UserTransaction>, UserTransactionRepositoryCustom {
}
