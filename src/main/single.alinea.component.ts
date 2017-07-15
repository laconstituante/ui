import {Component,Input,OnInit} from '@angular/core';
import { Alinea } from '../dto/alinea';
import { Proposition } from '../dto/proposition';
import { RestService } from '../services/rest.service';
import {MdDialog} from '@angular/material';
import {MdSnackBar} from '@angular/material';
import { VoteSnack } from '../snackbar/vote.snack.component';
import { PropositionsComponent } from "../forms/propositions.component";
@Component({
  selector: 'single-alinea',
  templateUrl: './single.alinea.component.html'
})
export class SingleAlineaComponent implements OnInit{
  @Input() alinea:Alinea;
  propositions:Proposition[];
  selectedTab:number = 0;
  proposition_txt:string = '';
  text_length_left:number = 700;
  pieData;
  ngOnInit(){
    if(this.alinea){
      this.getPropositionsFromAlineas();      
    }
    if(this.alinea.yesvotes_count || this.alinea.novotes_count || this.alinea.noOpinion){
      this.initChart();
    }
  }
  initChart(){
    this.pieData = {
            labels: ['Oui','Non','Sans opinion'],
            datasets: [
                {
                    data: [this.alinea.yesvotes_count, this.alinea.novotes_count,this.alinea.noOpinion],
                    backgroundColor: [
                        "#99d066",
                        "#ff5131",
                        "#cfd8dc"
                    ],
                    hoverBackgroundColor: [
                        "#689f38",
                        "#d50000",
                        "#9ea7aa"
                    ]
                }]    
            };
  }
  constructor(private rest:RestService,private dialog: MdDialog,private snackBar: MdSnackBar){
  }

  getPropositionsFromAlineas(){
    let self = this;
        this.rest.getPropositionsFromAlinea(this.alinea.alinea_id).subscribe(
            success => {
              if(success && success.entity){
                self.propositions = success.entity;
              }
            },
            error =>{
                console.log(error);
            }
        );
  }
  selectChange(event){
    this.selectedTab = event.index; 
    console.log(event);
  }
  soumettreProposition(){
    let proposition = new Proposition();
    proposition.proposition_text = this.proposition_txt;    
    proposition.alinea_id = this.alinea.alinea_id;
    this.rest.createProposition(proposition).subscribe(
      success =>{
        if(success && success.entity){
          this.propositions = success.entity;
          this.openSnackBar('Votre proposition a bien été enregistrée','Ok');
          this.proposition_txt = null;
        }else if(success && success.error && success.message == 'alreadyExists'){
          this.openSnackBar('Vous avez déja soumis une proposition pour cet alinéa','Ok');
        }
      },
      error => {}
    );
    console.log(this.proposition_txt);
  }

  vote(vote){
    if(this.rest && this.rest.isLoggedIn()){
      this.alinea.vote = vote;
      this.rest.voteAlinea(this.alinea).subscribe(
        success =>{
          if(success && success.entity){
            this.alinea = success.entity;
            this.initChart();
            this.openSnackBar('Votre vote a bien été pris en compte','Ok');
          }else{
            this.openSnackBar('Une erreure s\'est produite. Merci de reéssayer plus tard.','Ok');
          }
        },
        error =>{
          this.openSnackBar('Une erreure s\'est produite. Merci de reéssayer plus tard.','Ok');
        }
      );
    }else{
      this.openSnackBar('Vous devez etre connecté pour voter','Ok');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
  voirPropositions(){
    this.rest.setParentAlineaId(this.alinea.alinea_id);
    let dialogRef  = this.dialog.open(PropositionsComponent,{
                        disableClose:true,                        
                        width: '600px'
                    });
    dialogRef.afterClosed().subscribe(result => {
        //this.display = 'resume-votes';
    });
  }
  voirCommentaires(){

  }
}