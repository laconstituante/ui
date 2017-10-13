import {Component, Input} from '@angular/core';
import { RestService } from '../services/rest.service';
import { PageScrollService } from "ng2-page-scroll/src/ng2-page-scroll.service";
import { PageScrollInstance } from "ng2-page-scroll/src/ng2-page-scroll-instance";
import { WindowService} from '../services/window.service';
import { Titre } from "../dto/titre";
@Component({
  selector: 'resume-vote',
  templateUrl: './resume.vote.component.html'
})
export class ResumeVotesComponent {  
  @Input() titres:Titre[];
  display:string;
  document;
  // @ViewChild('resumeVoteDiv') private myScrollContainer: ElementRef;
  constructor(private rest:RestService,private pageScrollService: PageScrollService, private windowRef:WindowService){
    this.document = windowRef.nativeWindow.document;
  }
  ngOnInit(){
    if(this.rest && this.rest.isLoggedIn()  && !this.titres){
        this.getNextAlineas();
    }
    if(this.titres){
      this.display = 'votes';
    }
  }
  getNextAlineas(){
      this.display = 'loading';
      this.rest.getNextAlineas().subscribe(
          success =>{
            if(success && success.entity){
              this.titres = success.entity;
              setTimeout(()=>{
                this.scrollToTop();
              },500);              
              this.display = 'votes';
            }else{
              //console.log(success);
            }
          },
          error =>{}
      );
  }
  continueVotes(){
    this.getNextAlineas();
  }
  scrollToTop(){
        try {
            //this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#resumeVoteDiv');
            this.pageScrollService.start(pageScrollInstance);
        } catch(err) {
          console.log(err);
         }                 
    }

}