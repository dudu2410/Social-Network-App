package vn.hcmus.forestnetwork.repostiory.impl;

import com.querydsl.jpa.impl.JPAQuery;
import vn.hcmus.forestnetwork.entity.QUserTransaction;
import vn.hcmus.forestnetwork.entity.UserTransaction;
import vn.hcmus.forestnetwork.repostiory.UserTransactionRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class UserTransactionRepositoryCustomImpl implements UserTransactionRepositoryCustom {

    private static final String INTERACT_TYPE = "interact";
    public static final String PAYMENT_TYPE = "payment";
    public static final String UPDATE_ACCOUNT_TYPE = "update_account";
    public static final String FOLLOWINGS = "followings";
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Long getCurrentTransactionSequenceByAddress(String address) {
        return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction.txSequence.max())
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.fromAddress.eq(address))
                .fetchOne();
    }

    @Override
    public List<UserTransaction> getAllUserTransactionByAddress(String address) {
        return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction)
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.fromAddress.eq(address))
                .fetch();
    }

    @Override
    public List<UserTransaction> getAllUserPostByAddress(String address) {
        return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction)
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.fromAddress.eq(address)
                        .and(QUserTransaction.userTransaction.type.ne(INTERACT_TYPE)))
                .fetch();
    }

    @Override
    public List<UserTransaction> getLastAccountUpdate(String address, String updateType) {
        if (updateType.equals("picture")) {
            return new JPAQuery<QUserTransaction>(entityManager)
                    .select(QUserTransaction.userTransaction)
                    .from(QUserTransaction.userTransaction)
                    .where(QUserTransaction.userTransaction.fromAddress.eq(address)
                            .and(QUserTransaction.userTransaction.contentType.eq(updateType)
                                    .or(QUserTransaction.userTransaction.contentType.eq("avatae"))))
                    .fetch();
        }
        return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction)
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.fromAddress.eq(address)
                        .and(QUserTransaction.userTransaction.contentType.eq(updateType)))
                .fetch();
    }

    @Override
    public List<UserTransaction> getRecieveCurrencyTransaction(String address) {
        String searchText = "%" + address + "%";
        return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction)
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.content.like(searchText, '%')
                        .and(QUserTransaction.userTransaction.type.eq(PAYMENT_TYPE)))
                .fetch();
    }

    @Override
    public List<UserTransaction> getSendCurrencyTransaction(String address) {
        return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction)
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.fromAddress.eq(address)
                        .and(QUserTransaction.userTransaction.type.eq(PAYMENT_TYPE)))
                .fetch();
    }

    @Override
    public List<UserTransaction> getAllFollowingTransaction(String address) {
        return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction)
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.fromAddress.eq(address)
                        .and(QUserTransaction.userTransaction.type.eq(UPDATE_ACCOUNT_TYPE))
                        .and(QUserTransaction.userTransaction.contentType.eq(FOLLOWINGS)))
                .fetch();
    }

    @Override
    public List<UserTransaction> getByTxHash(String txHash) {
        return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction)
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.txHash.eq(txHash))
                .fetch();
    }

    @Override
    public Long getHeartNumberOfTx(String txHash) {
       return new JPAQuery<QUserTransaction>(entityManager)
                .select(QUserTransaction.userTransaction.count())
                .from(QUserTransaction.userTransaction)
                .where(QUserTransaction.userTransaction.txHash.eq(txHash))
                .fetchOne();
    }

}
