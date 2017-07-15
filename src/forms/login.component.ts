import {Component,Input,OnInit} from '@angular/core';
import {LoginObject} from '../dto/loginObject';
import {RestService} from '../services/rest.service';
import {AuthObject} from '../dto/auth.obj';
import {PageManagerService} from '../services/page.manager.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html'
})
export class LoginFormComponent implements OnInit{
    userLogin:LoginObject = new LoginObject();
    warning:string;
    ngOnInit(){
      
    }
    constructor (private rest:RestService,private notifier:PageManagerService) {
        
    }
    onSubmit(){
        if(!this.userLogin.is_persistent){
            this.userLogin.is_persistent = false;
        }
        this.rest.loginUser(this.userLogin).subscribe(
            success =>{
                if(success.entity && success.entity.api_token){
                    this.rest.setAuth(new AuthObject(success.entity.api_token,success.entity.is_persistent));
                    this.notifier.broadCastPageManagerService('dashboard');
                }else{
                    this.warning = "Oups... Il semblerait que l'adresse email ou le mot de passe soient incorrects";
                }
            },
            error =>{
                this.warning = "Une erreur s'est produite lors de votre authentification. Merci de reéssayer plus tard";
                console.log('error login',error);
            });
    }
}