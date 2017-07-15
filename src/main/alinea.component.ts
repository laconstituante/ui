import {Component,Input,OnInit} from '@angular/core';
import { RestService } from '../services/rest.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'alinea-component',
  templateUrl: './alinea.component.html'
})
export class AlineaComponent{
    subscription;
    constitutionId
    ngOnInit(){
        this.subscription = this.route.params.subscribe(params => {
            this.constitutionId = params['id']; // (+) converts string 'id' to a number
            //this.getConstitutionTitres();
        });    
    }
    constructor(private rest:RestService,private route: ActivatedRoute){}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}