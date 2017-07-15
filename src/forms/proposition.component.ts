import {Component,Input,OnInit} from '@angular/core';
import { Proposition } from '../dto/proposition';
import { RestService } from "../services/rest.service";
@Component({
  selector: 'proposition-component',
  templateUrl: './proposition.component.html'
})
export class PropositionComponent implements OnInit{
    @Input() proposition:Proposition;    
    ngOnInit(){
      if(this.proposition){
        if(!this.proposition.reported_count){
          this.proposition.reported_count = 0;
        }
        if(!this.proposition.novotes_count){
          this.proposition.novotes_count = 0;
        }
        if(!this.proposition.yesvotes_count){
          this.proposition.yesvotes_count = 0;
        }
      }
    }
    constructor (private rest:RestService) {
        
    }
    signaler(){
      this.proposition.vote = 3;
      this.submiteVote();
    }
    rejeter(){
      this.proposition.vote = 0;
      this.submiteVote();
    }
    approuver(){
      this.proposition.vote = 1;
      this.submiteVote();
    }
    submiteVote(){
      this.rest.voteProposition(this.proposition).subscribe(
        success =>{
          if(success && success.entity){
            this.proposition = success.entity;
          }
        },
        error =>{

        }
      );
    }
}