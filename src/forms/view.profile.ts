import {Component,Input,OnInit} from '@angular/core';
import {UserProfile} from '../dto/user';
import {RestService} from '../services/rest.service';

@Component({
  selector: 'view-profile',
  templateUrl: './view.profile.html'
})
export class ViewProfile{
    constructor (private rest:RestService) {
        
    }
    
}