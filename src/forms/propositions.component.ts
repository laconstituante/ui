import {Component,Input,OnInit} from '@angular/core';
import { Proposition } from '../dto/proposition';
import { RestService } from "../services/rest.service";
import {MdDialogRef} from '@angular/material';
@Component({
  selector: 'propositions-component',
  templateUrl: './propositions.component.html'
})
export class PropositionsComponent implements OnInit{
     propositions:Proposition[];     
    ngOnInit(){
      if(this.rest && this.rest.parent_alinea_id){
        this.rest.getPropositionsFromAlineaAuth(this.rest.parent_alinea_id).subscribe(
            success =>{
                if(success && success.entity){
                    this.propositions = success.entity;
                }
            },
            error =>{

            }
        );
      }
    }
    constructor (private rest:RestService,
                 private dialogRef: MdDialogRef<PropositionsComponent>) {
        
    }
    close(){
        this.dialogRef.close();
    }    
}