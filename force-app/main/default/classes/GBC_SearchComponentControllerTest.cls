@isTest
private class GBC_SearchComponentControllerTest {
    
    @TestSetup
    static void initData(){
        Account acc = new Account(
            Name = 'Test'
        );
    
        Account acc2 = new Account(
            Name = 'John'
        );
    
        insert new List<Account> {acc,acc2};
    }

    @IsTest
    public static void testSearchAccount(){

        List<Account> account = GBC_SearchComponentController.searchAccount('Te');

        System.assert(account.size() == 1);
    }
}