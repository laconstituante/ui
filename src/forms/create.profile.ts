import {Component,Input,OnInit} from '@angular/core';
import {UserProfile} from '../dto/user';
import {RestService} from '../services/rest.service';
import {MdDialog} from '@angular/material';
import {ConfirmEmail} from './confirm.email';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-profile',
  templateUrl: './create.profile.html',
  entryComponents: [ConfirmEmail]
})
export class CreateProfile implements OnInit{
     user:UserProfile = new UserProfile();
     isLoggedIn: boolean = false;
     msgs:any;
     passwordConfirm:string;
     isfrench:boolean = true;
     createUserForm : FormGroup;
     isFrance: boolean = true;
     Genders = [      
      {value: '0', viewValue: 'Me.'},
      {value: '1', viewValue: 'M.'}
    ];
    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
    ngOnInit(){
      this.user.isfrench = false;
      this.isLoggedIn = this.rest.isLoggedIn();
      
    }
    constructor (private rest:RestService,
                private dialog: MdDialog,
                private formBuilder: FormBuilder) {
        this.createUserForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.maxLength(100), Validators.email, Validators.required])],
            civilite: ['',Validators.required],
            firstname:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-zÀ-ÿ ]*'), Validators.required])],
            lastname:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-zÀ-ÿ ]*'), Validators.required])],
            password:  ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            confirmpassword: ['',Validators.required],
            dateofbirth:['',Validators.required],
            isfrench: [null,Validators.required],
            isfrance: [null,Validators.required],
            country: ['', Validators.pattern('[A-zÀ-ÿ ]*')],
            codePostal: ['', Validators.compose([Validators.maxLength(5), Validators.pattern('[0-9]{5}')])]
        });
        this.createUserForm.valueChanges.subscribe(control =>{
            this.isFrance = control.isfrance === 'true';
        });
    }
    onSubmit(){
        this.msgs = [];
        if(this.createUserForm.value.password !==  this.createUserForm.value.confirmpassword){
            this.msgs = [{severity:'warn', summary: 'Aie..', detail:'Le mot de passe saisi et sa confirmation ne se correspondent pas.'}];
            return;
        }
        this.user.civilite = this.createUserForm.value.civilite;
        this.user.codePostal = this.createUserForm.value.codePostal;
        this.user.dateofbirth = this.createUserForm.value.dateofbirth;
        this.user.email = this.createUserForm.value.email;
        this.user.firstname = this.createUserForm.value.firstname;
        this.user.isfrench = this.createUserForm.value.isfrench;
        this.user.lastname = this.createUserForm.value.lastname;
        this.user.password = this.createUserForm.value.password;
        if(this.isFrance){
            this.user.country = 'France';
            this.user.codePostal = '99999';
        }else{
            this.user.country = this.createUserForm.value.country;
        }
        this.rest.createAccount(this.user).subscribe(event =>{
            console.log(event);
            if(!event.error){
              this.rest.setUserProfile(event.entity);
              if(event.entity.user_id){                  
                this.dialog.open(ConfirmEmail,{disableClose:true});
              }
            }else{
                this.msgs = [{severity:'warn', summary: 'Aie..', detail:event.message}];
            }
              
        },error=>{
            console.log(event);
        });
        console.log(this.user);
    }
}