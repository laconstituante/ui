import {Component,Input,OnInit} from '@angular/core';
import {RestService} from '../services/rest.service';
import {PageManagerService} from '../services/page.manager.service';

import {MdDialogRef} from '@angular/material';
import { Router } from "@angular/router";
@Component({
  selector: 'confirm-email',
  templateUrl: './confirm.email.html'
})
export class ConfirmEmail {    
    code:string;        
    display:string = 'form';
    warning:string = null;
    error:string = '';
    constructor (
        private rest:RestService,
        private notifier:PageManagerService,
        private dialogRef: MdDialogRef<ConfirmEmail>,
        private _router:Router) {
        
    }
    onSubmit(){
        let confObj:any = {
            email_token : this.code,
            user_id : this.rest.getUserProfile().user_id
        }
        this.display = 'loading';
        console.log(confObj);
        if(confObj.email_token && confObj.user_id){
            this.rest.confirmEmail(confObj).subscribe(
                event =>{
                    if(event && event.entity && event.entity.api_token){
                        this.rest.setAuth(event.entity);
                        this.display = 'success';
                    }else{
                        this.display = 'error';
                        this.error = "Le code de confirmation saisi est incorrect. Veuiilez recommencer s'il vous plait.";
                    }
                },
                error=>{
                    this.display = 'error';
                    this.error = error;
                    console.log('ConfirmEmail component receives error', error);
                }
            );
        }else{
            this.display = 'form';
            this.warning = 'Le code de validation est necessaire pour valider votre compte.. Merci de saisir le code que nous vous avons envoye a votre adresse email.';
        }
            
    }
    goToLoggedInSection(){
        this._router.navigateByUrl('comment-ca-marche');
        this.dialogRef.close();
    }
    goToForm(){
        this.display = 'form';
    }
}