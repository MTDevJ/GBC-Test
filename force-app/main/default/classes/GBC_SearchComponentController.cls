public with sharing class GBC_SearchComponentController {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccount(String searchValue){
       if (searchValue != '') {
            String query = 'SELECT Id, Name FROM Account WHERE Name LIKE \'%' + searchValue + '%\' ';
            try {
                return Database.query(query);
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
       } 
        return null;
    }
}