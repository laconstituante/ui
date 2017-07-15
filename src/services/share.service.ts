import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {
    facebook:Sharer;
    googleplus:Sharer;
    linkedin:Sharer;
    twitter:Sharer;
    email:Sharer;
    whatsapp:Sharer;
    telegram:Sharer;
    viber:Sharer;
    pinterest:Sharer;   
    tumblr:Sharer;
    hackernews:Sharer;
    shareWidth:number = 600;
    shareHeight:number = 600;
    constructor() { 
        this.facebook = new Sharer('https://www.facebook.com/sharer/sharer.php',true,'facebook','font','facebook','');
        this.googleplus = new Sharer('https://plus.google.com/share',true,'googleplus','font','googleplus','');
        this.linkedin = new Sharer('https://plus.google.com/share',true,'linkedin','font','linkedin','');
        this.twitter = new Sharer('https://twitter.com/intent/tweet/',true,'twitter','font','twitter','');
        this.email = new Sharer('',false,'email','font','email','');
        this.pinterest = new Sharer('https://www.pinterest.com/pin/create/button/',true,'pinterest','font','pinterest','');
        this.tumblr = new Sharer('http://tumblr.com/widgets/share/tool',true,'tumblr','font','tumblr','');
    }
    urlSharer(sharer) {
        var p = sharer.params || {}, keys = Object.keys(p), i, str = keys.length > 0 ? '?' : '';
        for (i = 0; i < keys.length; i++) {
            if (str !== '?') {
                str += '&';
            }
            if (p[keys[i]]) {
                str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
            }
        }
        sharer.shareUrl += str;
        if (sharer.isLink) {
            var popWidth = sharer.width || 600, popHeight = sharer.height || 480;
            if(window){
                var left = window.innerWidth / 2 - popWidth / 2 + window.screenX, 
                top = window.innerHeight / 2 - popHeight / 2 + window.screenY, 
                popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left, 
                newWindow = window.open(sharer.shareUrl, '', popParams);
                if (window.focus) {
                    newWindow.focus();
                }
            }
        }
        else {
            //Specific loginc to non url base sharing
            //window.location.href = sharer.shareUrl;
        }
    }
    getSharer(sharerName:string,caption,url:string=null):Sharer {
        switch(sharerName.toLowerCase()){
            case 'facebook' : 
                this.facebook.params = {u: url? url : 'https://www.laconstituante.fr'};
                return this.facebook;
            case 'googleplus' : 
                this.googleplus.params = {url:url? url :  'https://www.laconstituante.fr'};
                return this.googleplus;
            case 'linkedin' : 
                this.linkedin.params = {url: url? url : 'https://www.laconstituante.fr'};
                this.linkedin;
            case 'twitter' : 
                this.twitter.params = {text: caption, url:url? url :  'laconstituante.fr',hashtags: ['démocratie','6erépublique'], via: 'laconstituante'}
                return this.twitter;
            case 'pinterest' : 
                this.pinterest.params = {url:url? url :  'https://www.laconstituante.fr',media: 'La constituante',description: caption}
                return this.pinterest;
            case 'tumblr' : 
                this.tumblr.params = {url:url? url : 'https://www.laconstituante.fr'}
                return this.tumblr;
        }       
    }
    share(sharer:Sharer) {        
        // custom popups sizes
        if (sharer) {
            sharer.width = this.shareWidth;
            sharer.height = this.shareHeight;
        }
        return sharer !== undefined ? this.urlSharer(sharer) : false;
    }
}

export class Sharer{
    shareUrl:string;
    isLink:boolean;
    name:string;
    logoType:string;
    logoLocation:string;
    apikey:string;
    params:any;
    width:number;
    height:number;
    constructor(url:string, islink:boolean,name:string,logoType:string,logolocation:string,apikey:string){
        this.shareUrl = url;
        this.isLink = islink;
        this.name = name;
        this.logoType = logolocation;
        this.logoLocation = logolocation;
        this.apikey = apikey;        
    }
}