import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RestService } from "../services/rest.service";

@Component({
  selector: 'help-component',
  templateUrl: './help.component.html'
})
export class HelpComponent {
  
  constructor(private _router:Router,private rest:RestService) { }
  
  vote(){
    if(this.rest.isLoggedIn()){
      this._router.navigateByUrl('poursuivre-mes-votes');
    }else{
      this._router.navigateByUrl('creer-un-compte');
    }
  }
}
