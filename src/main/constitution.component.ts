import {Component, ViewEncapsulation,OnInit,Input} from '@angular/core';
import {RestService} from '../services/rest.service';
import {PieData} from '../dto/PieData';
import { Router } from "@angular/router";
import { Constitution } from "../dto/constitution";
// import { WindowService } from "../services/window.service";
@Component({
  selector: 'constitution-component',
  templateUrl: './constitution.component.html'
})

export class ConstitutionComponent implements OnInit{    
    @Input() constitution: Constitution;
    url:string;
    ngOnInit(){       
        if(!this.constitution && this.router.url){
            this.getConstitution(this.router.url);
        }
    }
    constructor(private rest:RestService,private router: Router){}

    processConstitution(constitutions:Constitution[]){
        constitutions.forEach(constitution=>{
            if(this.url === constitution.constitution_url){
                this.constitution = constitution;
            }            
        });
    }
    
    getConstitution(url:string){
        this.url = url.replace('/constitution/','');
        this.rest.getConstitutions().subscribe(
            success =>{
                if(success && success.length){
                    this.processConstitution(success);
                }else{
                    this.processError();
                }
            },
            error =>{
                this.processError();
            }
        );
    }
    
    processError(){

    }    
}