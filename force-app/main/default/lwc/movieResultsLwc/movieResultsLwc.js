import { api, LightningElement, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import retrieveMovies from "@salesforce/apex/moviesController.retrieveMovies";
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Record_Selected__c';
export default class MovieResultsLwc extends LightningElement {
    @track result
    @api testApi
    @track selectedMovie = {};
    selected;
    @wire(MessageContext)
    messageContext;

    
    
    connectedCallback() {
        this.fetchMovies();
    }
   
  
    fetchMovies() {
         retrieveMovies().then(response => {
             console.log(response);
            this.result = response;
                }).catch(error => {
            console.error(error);
        }) 
    }

    previewMovie(event){
        this.result.forEach(movie => {
            if(movie.Id == event.target.dataset.item){
                this.selectedMovie = {... movie}
                this.selected = this.selectedMovie.Id;

                const payload = { recordId: this.selected };
                publish(this.messageContext, recordSelected, payload);
        
                console.log('this.selected', this.selected)
            }
        });
    }

    formatMoviesData(res) {
        this.result = res.map((item, index) => {
            let id = `new_${index + 1}`;
            let date = new Date(item.publishedAt).toDateString()
            let name = item.source.name;
            return { ...item, id: id, name: name, date: date }
        })

    }




}