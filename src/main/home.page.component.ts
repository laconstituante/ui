import {Component,Input,OnInit} from '@angular/core';
// import { WindowService} from '../services/window.service';
import {UserProfile} from '../dto/user';
import { RestService } from "../services/rest.service";
import { Router } from "@angular/router";
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'home-page-component',
  templateUrl: './home.page.component.html'
})
export class HomePage implements OnInit{
    user:UserProfile = new UserProfile();
    selectedGender: string;    
    Genders = [      
      {value: '0', viewValue: 'Me.'},
      {value: '1', viewValue: 'M.'}
    ];
    constructor (private rest:RestService,private _router:Router,private titleService:Title) {
        
    }
    resolved(captchaResponse: string) {
        
    }
    ngOnInit(){
      this.titleService.setTitle('La constituante');
       if(this.rest.isLoggedIn()){
          this._router.navigateByUrl('tableau-de-bord');
        }else{
          this._router.navigateByUrl('accueil');
        }    
    }
    gotToSection(section){
      console.log(section)
    }
    
};