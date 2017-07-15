import {Component,Input,OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {RestService} from '../services/rest.service';
import { Router } from "@angular/router";
@Component({
  selector: 'insufficiant-privileges',
  templateUrl: './insufficiant.privileges.component.html'
})
export class InsufficiantPrivilegesComponent implements OnInit{
    pieData:any;
    ratio:number;
    constructor(private rest:RestService, 
                private dialogRef: MdDialogRef<InsufficiantPrivilegesComponent>,
                private _router:Router){
        
    }
    ngOnInit(){
        this.ratio = Math.floor(this.rest.getEligibility().totalvotes / this.rest.getEligibility().totalAlinea *100);
        this.pieData = {
            labels: ['Votes exprimés','Sans votes'],
            datasets: [
                {
                    data: [this.rest.getEligibility().totalvotes,this.rest.getEligibility().totalAlinea - this.rest.getEligibility().totalvotes ],
                    backgroundColor: [
                        "#99d066",
                        "#cfd8dc"
                    ],
                    hoverBackgroundColor: [
                        "#689f38",
                        "#9ea7aa"
                    ]
                }]    
            };
    }
    vote(){
        this._router.navigateByUrl('poursuivre-mes-votes');
        this.dialogRef.close();
    }

}