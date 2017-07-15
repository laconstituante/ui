import {Component, ViewEncapsulation,OnInit,Input} from '@angular/core';

import {Titre} from '../dto/titre';

@Component({
  selector: 'ensemble-component',
  templateUrl: './ensemble.component.html'
})

export class EnsembleComponent {
    ready:boolean = false;
    @Input() titres:Titre[];

    ngOnInit(){
      if(this.titres && this.titres.length){
        this.ready = true;
      }
    }

}