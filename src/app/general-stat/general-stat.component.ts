import { Component, OnInit,ViewChild } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { UIChart } from 'primeng/primeng';

@Component({
  selector: 'app-general-stat',
  templateUrl: './general-stat.component.html'
})
export class GeneralStatComponent implements OnInit {
  personnalPie:any;
  @ViewChild('chart') chart: UIChart;
  constructor(private rest:RestService) {
    
   } 
  ngOnInit() {
    this.personnalPie = {
      labels: ['Oui','Non'],
      datasets: [{
        data:[0,0],
        backgroundColor: [
              "#99d066",
              "#ff5131"
        ],
        hoverBackgroundColor: [
            "#689f38",
            "#d50000"
        ]
      }]
    };
    this.getGlobalStat();
  }
  getGlobalStat(){
    let self = this;
    this.rest.getGlobalStat().subscribe(
      success => {
        if(success && success.entity && success.entity.length){
            let stats = success.entity;
            stats.forEach(graph => {
              let personnalPie = {
                labels: ['Nombre de vote OUI','Nombre de vote NON','Nombre de votes sans opinion'],
                datasets: [
                    {
                        data: [graph.yes, graph.no,graph.noOpinion],
                        backgroundColor: [
                             "#99d066",
                             "#ff5131",
                            "#36A2EB"
                        ],
                        hoverBackgroundColor: [
                            "#689f38",
                            "#d50000",
                            "#36A2EB"
                        ]
                    }]    
                };
                self.personnalPie = Object.assign({}, personnalPie);
                // setTimeout(() => {
                //   self.chart.reinit();
                // }, 100);
            });
        }
      },
      error => {

      }
    );
  }
  update(event){
    console.log(event);
  }
}
