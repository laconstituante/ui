import {Component, ViewEncapsulation,OnInit,Input} from '@angular/core';
import {RestService} from '../services/rest.service';
import { Constitution } from "../dto/constitution";
@Component({
  selector: 'constitution-component',
  templateUrl: './constitutions.component.html'
})
export class ConstitutionsComponent implements OnInit{
    constitutions:Constitution[];
    subscription;
    customHeight:number;
    ngOnInit(){
        
       this.getConstitutions();   
    }

    constructor(private rest:RestService){
    }
    getConstitutions(){
        this.rest.getConstitutions().subscribe(
            success => {
                if(success && success.length){
                    let constitutions = success;
                    constitutions.forEach(cons=>{
                        cons.vote_count = cons.vote_count ? cons.vote_count : 0;
                        cons.vote_no = cons.vote_no ? cons.vote_no :  0;
                        cons.vote_yes = cons.vote_yes ? cons.vote_yes : 0;
                        cons.vote_other = cons.vote_other ? cons.vote_other : 0;
                    });
                    this.constitutions = constitutions;
                }
            },
            error =>{

            }
        );
    }

}