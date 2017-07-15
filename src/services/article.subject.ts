import { Injectable }  from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Titre } from "../dto/titre";


@Injectable()
export class ArticleSubject{
    articleSubject:Subject<Titre[]> = new Subject();
    getArticleSubject(){
        return this.articleSubject;
    }
    broadCastArticleSelected(titres:Titre[]){
        this.articleSubject.next(titres);
    }
}
