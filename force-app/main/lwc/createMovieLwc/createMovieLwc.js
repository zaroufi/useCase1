import { LightningElement, track } from 'lwc';
import saveMovie from '@salesforce/apex/moviesController.saveMovie';

export default class CreateMovieLwc extends LightningElement {
    @track error;
    @track movieRecord = {
        Name : name,
        Description : description,
        Category : category,
    };

    handleNameChange(event) {
        this.movieRecord.Name = event.target.value;
        window.console.log('Name ==> '+this.movieRecord.Name);
    }

    handleDescriptionChange(event) {
        this.movieRecord.Description = event.target.value;
        window.console.log('Description ==> '+this.movieRecord.Description);
    }

    handleCategoryChange(event) {
        this.movieRecord.Category = event.target.value;
        window.console.log('Category ==> '+this.movieRecord.Category);
    }

    handleSave() {
        saveMovie({objAcc: this.accRecord})
        .then(result => {
            // Clear the user enter values
            this.movieRecord = {};

            window.console.log('result ===> '+result);
            // Show success messsage
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Movie Created Successfully!!',
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = error.message;
        });
    }


}