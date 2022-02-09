import { LightningElement, api } from 'lwc';

export default class Page extends LightningElement {

    @api numPage;
    @api currentPage;

    handleClick(e){
        console.log('handleClick');
        console.log('target value', e.target.value);
        const selectedEvent = new CustomEvent("changepage", {
            detail: e.target.value
          });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    get isInt(){
        return Number.isInteger(this.numPage);
    }

    get isDisable(){
        return this.numPage === this.currentPage;
    }
}