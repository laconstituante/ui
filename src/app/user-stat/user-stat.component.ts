import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {UserStat} from '../../dto/user.stat';
import { PageManagerService } from "../../services/page.manager.service";


@Component({
  selector: 'user-stat-component',
  templateUrl: './user-stat.component.html'
})
export class UserStatComponent implements OnInit {
  voteText:string = 'Poursuivre mes votes';
  charObject:any;
  constructor(private rest:RestService,private pageManager:PageManagerService) { }
  graphs:UserStat[];
  firstSet;
  secondSet;
  firstObject;
  secondObject;
  ready;
  ngOnInit() {
    if(this.rest && this.rest.isLoggedIn()){
      this.getUserStat();
      this.getUserStatTitres();
    }else{
      //TO DO
      //Redirect to login page
    }
  }
  getUserStatTitres(){
    this.firstObject = {
        count:0,
        votes:0,
        total:0
    }
    this.secondObject = {
        count:0,
        votes:0,
        total:0
    }  
    let firstSet = {
        labels: [],
        datasets: [
            {
                label: 'Les pourcentages des votes par titres',                
                data: [],
                backgroundColor: [
                    'rgba(255, 81, 49, 0.5)',
                    'rgba(236, 239, 241, 0.5)',
                    'rgba(153, 208, 102, 0.5)',
                    'rgba(128, 222, 234, 0.5)',
                    'rgba(255, 81, 49, 0.5)',
                    'rgba(236, 239, 241, 0.5)',
                    'rgba(153, 208, 102, 0.5)',
                    'rgba(128, 222, 234, 0.5)',
                    'rgba(255, 81, 49, 0.5)'
                ],
                hoverBackgroundColor: [
                    'rgba(255, 81, 49, 1)',
                    'rgba(236, 239, 241, 1)',
                    'rgba(153, 208, 102, 1)',
                    'rgba(128, 222, 234, 1)',
                    'rgba(255, 81, 49, 1)',
                    'rgba(236, 239, 241, 1)',
                    'rgba(153, 208, 102, 1)',
                    'rgba(128, 222, 234, 1)',
                    'rgba(255, 81, 49, 1)'
                ]
            }
        ]
    }
    let secondSet = {
        labels: [],
        datasets: [
            {
                label: 'Les pourcentages des votes par titres',                
                data: [],
                backgroundColor: [
                    'rgba(255, 81, 49, 0.5)',
                    'rgba(236, 239, 241, 0.5)',
                    'rgba(153, 208, 102, 0.5)',
                    'rgba(128, 222, 234, 0.5)',
                    'rgba(255, 81, 49, 0.5)',
                    'rgba(236, 239, 241, 0.5)',
                    'rgba(153, 208, 102, 0.5)',
                    'rgba(128, 222, 234, 0.5)',
                    'rgba(255, 81, 49, 0.5)'
                ],
                hoverBackgroundColor: [
                    'rgba(255, 81, 49, 1)',
                    'rgba(236, 239, 241, 1)',
                    'rgba(153, 208, 102, 1)',
                    'rgba(128, 222, 234, 1)',
                    'rgba(255, 81, 49, 1)',
                    'rgba(236, 239, 241, 1)',
                    'rgba(153, 208, 102, 1)',
                    'rgba(128, 222, 234, 1)',
                    'rgba(255, 81, 49, 1)'
                ]
            }
        ]
    }
    this.rest.getUserStatTitres().subscribe(
      success =>{
        if(success && success.entity){
            success.entity.forEach( 
                (value,index)=>{
                    if(index < 8){
                        this.firstObject.count++;
                        if(!value.votesCount){
                            value.votesCount = 0;
                        }
                        this.firstObject.votes += value.votesCount;
                        this.firstObject.total += value.totaux;
                        if(index === 0){
                            firstSet.labels.push('Préambule');
                        }else{
                            firstSet.labels.push(value.titre_name.substring(0,value.titre_name.indexOf(':')));
                        }
                        firstSet.datasets[0].data.push(Math.floor( value.votesCount/value.totaux * 100) );
                    }else{
                        this.secondObject.count++;
                        this.secondObject.votes += value.votesCount;
                        this.secondObject.total += value.totaux;
                        secondSet.labels.push(value.titre_name.substring(0,value.titre_name.indexOf(':')));
                        secondSet.datasets[0].data.push(Math.floor(value.votesCount/value.totaux * 100));
                    }
                }
            );
            this.secondSet = secondSet;
            this.firstSet = firstSet;
            this.ready = true;
        }
      },  
      error =>{

      }
    );
  }
  getUserStat(){
    this.rest.getUserStat().subscribe(
      success => {
        if(success && success.entity){
          let graphs = success.entity;
          if(graphs && graphs.length){
            graphs.some(graph => {
              if(graph.id === 0 && graph.yes === 0 && graph.no && graph.noOpinion === 0){
                this.voteText = "Commencer a voter";
                return true;
              }
            });
            graphs.forEach(graph =>{
              let charObj = {
                labels: ['Alinéa rejetés','Sans opinion','Alinéas approuvé','Alinéas non votés'],
                datasets: [
                    {
                        data: [graph.no, graph.noOpinion,graph.yes,graph.emptyVote],
                        backgroundColor: [
                             "#ff5131",  
                             "#eceff1",                          
                            "#99d066",
                            "#80deea"

                        ],
                        hoverBackgroundColor: [
                            "#d50000",
                            "#36A2EB",
                            "#689f38", // 3rd
                            "#4bacb8"
                        ]
                    }]    
                };
                this.charObject = charObj;
            });
            this.graphs = graphs;
          }
        }
      },
      error =>{

      }
    );
  }
  goToNextVotes(){
    this.pageManager.broadCastPageManagerService('resume-votes');
  }
  onChartClick(event){
    console.log(event);
  }

}
