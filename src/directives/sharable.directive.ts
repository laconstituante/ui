import { Directive, HostListener, Input } from '@angular/core';
import { ShareService, Sharer } from "../services/share.service";

@Directive({ selector: '[sharer]' })
export class SharableDirective {
    
    @Input() caption: string;
    @Input() customUrl: string;    
    @Input('sharer') sharer: string;
    @HostListener('click', ['$event']) 
    onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        let sharer = this.shareSerive.getSharer(this.sharer,this.caption,this.customUrl);
        this.shareSerive.share(sharer);
    }

    constructor(private shareSerive:ShareService) {

    }
}