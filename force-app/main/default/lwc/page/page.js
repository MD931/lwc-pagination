import { LightningElement, api } from 'lwc';

export default class Page extends LightningElement {

    @api numPage;
    @api currentPage;

    handleClick(e){
        const selectedEvent = new CustomEvent("selectpage", {
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