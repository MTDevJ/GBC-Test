import { LightningElement, api, wire, track } from 'lwc';
import searchAccount from '@salesforce/apex/GBC_SearchComponentController.searchAccount'

const DELAY = 300;

export default class Gbc_searxh_component extends LightningElement {
    searchKey = '';

    @track comboboxClass= 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputElementClass = '';
    @track accounts;
    @track selectedName;
    @track blurTimeout;

    @wire(searchAccount, { searchValue: '$searchKey' })
    accounts;

    handleSearchValueChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        if(searchKey == ''){
            const valueSelectedEvent = new CustomEvent('accountselected', {detail:  undefined });
            this.dispatchEvent(valueSelectedEvent);
        } else{
            this.delayTimeout = setTimeout(() => {
                this.searchKey = searchKey;
            }, DELAY);
        }
    }

    handleElementClick() {
        this.searchKey = '';
        this.inputElementClass = 'slds-has-focus';
        this.comboboxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onBlur() {
       this.blurTimeout = setTimeout(() =>  {this.comboboxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }

    onSelect(event) {
        let selectedId = event.currentTarget.dataset.id;
        let selectedAccount = this.accounts.data.find(acc => acc.Id == selectedId);
        
        const valueSelectedEvent = new CustomEvent('accountselected', {detail:  selectedId });
        this.dispatchEvent(valueSelectedEvent);
        
        this.selectedName = selectedAccount ? selectedAccount.Name : undefined;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
        this.comboboxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }
}