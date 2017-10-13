import {Component,Input} from '@angular/core';
import { WindowService } from "../services/window.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "../services/rest.service";
import { Title }     from '@angular/platform-browser';

@Component({
    selector : 'settings-component',
    templateUrl: './settings.component.html'
})
export class SettingsComponent{
    @Input() display:string;
    url;
    customHeight:number =800;
    subscription;
    constitutionId
    constructor (private rest:RestService,private route: ActivatedRoute,private _router: Router,private titleService:Title) {
        this.subscription = this.route.params.subscribe(params => {
            this.constitutionId = params['id']; 
        });
        
    }
    ngOnInit(){
        this.titleService.setTitle('La constituante');
        if(this._router.url === '/deconnexion'){
            this.rest.logOut();
            this._router.navigateByUrl('');
        }else{
            this.display = this._router.url;
        }
        
    }
}