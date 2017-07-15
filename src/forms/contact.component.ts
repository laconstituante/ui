import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from "../services/rest.service";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { Contact } from "../dto/contact";
import { SimpleConfirm } from "./simple.confirm";

@Component({
  selector: 'contact-component',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  contact:Contact = new Contact();
  contactForm : FormGroup;
  constructor(private rest:RestService,
              private dialog: MdDialog,
              private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    let email = this.rest.userProfile ? this.rest.userProfile.email : '';
    this.contactForm = this.formBuilder.group({
        email: [email, Validators.compose([Validators.maxLength(100), Validators.email, Validators.required])],
        subject: ['',Validators.required],
        message:  ['', Validators.compose([Validators.maxLength(700), Validators.required])],
        captcha:  ['', Validators.required]
    });
  }
  onSubmit(){
        this.contact.email = this.contactForm.value.email;
        this.contact.subject = this.contactForm.value.subject;
        this.contact.message = this.contactForm.value.message;
        this.contact.captcha = this.contactForm.value.captcha;
        this.rest.contactUs(this.contact).subscribe(
          success =>{
            let config:MdDialogConfig = new MdDialogConfig();
            if(!success.error){
                config.data = {title:'Parfait',body:'Nous avons bien enregistré votre message. Nous reviendrons vers vous dans les plus brefs délais',goToHomePage:true};
                config.disableClose = true;
                this.dialog.open(SimpleConfirm,config);
            }else{
              if(success.message === 'WRONG_CAPTCHA'){
                config.data = {title:'Oups..',body:'Il semblerait que le code de vérification soit erroné. Veuillez reessayer.',goToHomePage:false};
                config.disableClose = true;
                this.dialog.open(SimpleConfirm,config);
              }
              else{
                config.data = {title:"Oups..",body:"Une erreur s'est produite. Veuillez reessayer plus tard.",goToHomePage:false};
                config.disableClose = true;
                this.dialog.open(SimpleConfirm,config);
              }   
            }
        },error=>{
            console.log(event);
        });
    }
}
