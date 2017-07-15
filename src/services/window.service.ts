import { Injectable } from '@angular/core';

function getWindow (): any {
    if(typeof(window) == 'object'){
        return window;
    }else{
        return {};
    }
    
}

@Injectable()
export class WindowService {
    get nativeWindow (): any {
        return getWindow();
    }
}