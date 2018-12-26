package vn.hcmus.forestnetwork.repostiory.impl;

import com.querydsl.jpa.impl.JPAQuery;
import vn.hcmus.forestnetwork.repostiory.SystemStatusRepositoryCustom;
import vn.hcmus.forestnetwork.entity.QSystemStatus;
import vn.hcmus.forestnetwork.entity.SystemStatus;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class SystemStatusRepositoryCustomImpl implements SystemStatusRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public SystemStatus getCurrentSystemStatus() {
        return new JPAQuery<QSystemStatus>(entityManager)
                .select(QSystemStatus.systemStatus)
                .from(QSystemStatus.systemStatus)
                .where(QSystemStatus.systemStatus.id.ne(0))
                .fetchOne();
    }
}
