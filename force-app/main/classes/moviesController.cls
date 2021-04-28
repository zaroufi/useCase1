public with sharing class moviesController {

@AuraEnabled
public static void saveMovie(Movie__c movie){
try {
    insert movie;
}
 catch(Exception e){
    throw new AuraHandledException(e.getMessage());
 }
}

@AuraEnabled
public static List <Movie__c> retrieveMovies(){

    List <Movie__c> listMovies = new List<Movie__c> (
        [SELECT Id, Name, Description__c,Category__c, Release_date__c, imageUrl__c,Rating__c FROM Movie__c ]
    );
    return listMovies;
}
}
