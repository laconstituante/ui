import {Component, ViewEncapsulation,OnInit,Input} from '@angular/core';
import {RestService} from '../services/rest.service';
import {PieData} from '../dto/PieData';
@Component({
  selector: 'dash-board-component',
  templateUrl: './dash.board.component.html'
})

export class DashBoardComponent implements OnInit{

    ngOnInit(){        
    }
    constructor(private rest:RestService){

    }

}