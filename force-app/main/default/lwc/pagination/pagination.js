import { LightningElement, track, api } from 'lwc';

export default class Pagination extends LightningElement {
    @track currentPage = 1;
    @api totalElement;
    @api numberResultPage = 20;
    //@track totalPages = 1;
    
    connectedCallback(){}

    handleButton(e){
        if(e.target.value === 'next'){
            this.changePage(this.currentPage + 1);
        }else if(e.target.value === 'back'){
            this.changePage(this.currentPage - 1);
        }
        
    }

    handleChangePage(e){
        this.changePage(e.detail);
    }

    changePage(page){
        this.currentPage = page;
        //Dispatch envent changepage
    }

    get pages(){
        return this.generatePageButton(Math.ceil(this.totalElement / this.numberResultPage),
                this.currentPage,
                2);
    }

    get canBack(){
        return this.currentPage < 2;
    }

    get canNext(){
        return Math.ceil(this.totalElement / this.numberResultPage) <= this.currentPage;
    }

    @api generatePageButton(totalPages, currentPage, delta = 1){
        var pages = [];
        currentPage = Number.parseInt(currentPage);
        if(totalPages < currentPage) return pages;
        pages.push(currentPage);

        if(currentPage !== 1) {
            let start = currentPage - delta > 0 ? currentPage - delta : 1;
            this.range(start, currentPage -1).reverse().forEach(e =>{
                pages.unshift(e);
            });
        }
        if(currentPage - delta > 1) pages.unshift('...');
        if(currentPage < totalPages) {
            let end = currentPage + delta < totalPages ? currentPage + delta : totalPages;
            this.range(currentPage + 1, end).forEach(e =>{
                pages.push(e);
            });
            //pages.push(currentPage + delta);
        }
        if(currentPage + delta < totalPages) pages.push('...');

        return pages;
    }

    range(start, end){
        var list = [];
        for (let i = start; i <= end; i++) {
            list.push(i);
        }
        return list;
    }

}