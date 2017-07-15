import { Injectable }  from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions }  from '@angular/http';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class NewArticleHandler{
    newArticleSubject:Subject<Object> = new Subject();
    getArticleSubject(){
        return this.newArticleSubject;
    }
    broadCastNewArticleClicked(){
        this.newArticleSubject.next();
    }
}
