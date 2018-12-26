package vn.hcmus.forestnetwork.constant;

public class ApiURI {
    private static final String GET_CURRENT_SYSTEM_BLOCK_HEIGHT = "/get/current_block_height";
    private static final String GET_ALL_TRANSACTION_OF_BLOCK_BY_HEIGHT = "/get/transaction_of_block?height=";

    private ApiURI(){}

    public static String getGetCurrentSystemBlockHeightUri(){
        return ExternalServerInfo.HOST + GET_CURRENT_SYSTEM_BLOCK_HEIGHT;
    }

    public static String getAlTransactionOfBlockByHeightUri(Long height){
        return ExternalServerInfo.HOST + GET_ALL_TRANSACTION_OF_BLOCK_BY_HEIGHT + height;
    }
}
