import { LightningElement,api } from 'lwc';
import ORDER_OBJECT from '@salesforce/schema/GBC_Order__c';
import NAME_FIELD from '@salesforce/schema/GBC_Order__c.Name';
import TYPE_FIELD from '@salesforce/schema/GBC_Order__c.GBC_Payment_Type__c';
import PERIOD_FIELD from '@salesforce/schema/GBC_Order__c.GBC_Payment_Period__c';
import CLIENT_FIELD from '@salesforce/schema/GBC_Order__c.Client__c';
import PRICE_FIELD from '@salesforce/schema/GBC_Order__c.GBC_Total_Price__c';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Gbc_order_component extends NavigationMixin(LightningElement) {

    orderObject = ORDER_OBJECT;
    nameField = NAME_FIELD;
    typeField = TYPE_FIELD;
    periodField = PERIOD_FIELD;
    accountField = CLIENT_FIELD;
    priceField = PRICE_FIELD;

    accountValue;

    handleSelectedAccount(event){
        this.accountValue = event.detail;
    }

    handleOrderCreated(){

        this.showToast();

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'GBC_Order__c',
                actionName: 'list'
            }
        });
    }
    
    showToast() {
        const event = new ShowToastEvent({
            title : 'New Order',
            message : 'Record created!',
            variant : 'success',
            mode : 'pester'
        });
        this.dispatchEvent(event);
    }
}