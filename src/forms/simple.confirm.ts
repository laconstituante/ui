import {Component,Input,OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {PageManagerService} from '../services/page.manager.service';

import {MdDialogRef} from '@angular/material';
@Component({
  selector: 'simple-confirm',
  templateUrl: './simple.confirm.html'
})
export class SimpleConfirm{
    title:string;
    body:string;
    goToHomePage:boolean;
    constructor (private notifier:PageManagerService,private dialogRef: MdDialogRef<any>,@Inject(MD_DIALOG_DATA) private data: any) {
        
    }
    ngOnInit(){
        this.title = this.data.title;
        this.body = this.data.body;
        this.goToHomePage = this.data.goToHomePage;
    }
    goToLoggedInSection(){
        if(this.goToHomePage){
            this.notifier.broadCastPageManagerService('dashboard');
        }
        this.dialogRef.close();
    }
}