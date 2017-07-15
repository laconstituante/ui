import { Injectable }  from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {UserProfile} from '../dto/user';


@Injectable()
export class PageManagerService{
    pageManager:Subject<string> = new Subject();
    getPageManagerService(){
        return this.pageManager;
    }
    broadCastPageManagerService(obj){
        this.pageManager.next(obj);
    }
}
