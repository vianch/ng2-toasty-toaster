import { Injectable, EventEmitter } from "@angular/core";

import {Toast, ToastyTypes} from "./toasty.models";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ToastyService  {

    private toastEmitter: EventEmitter<Toast>;
    private clearEmitter: EventEmitter<string>;
    private toast: Toast;

    constructor() {
        this.toastEmitter = new EventEmitter<Toast>();
        this.clearEmitter = new EventEmitter<string>();
    }

    public getToasts(): Observable<Toast> {
        return this.toastEmitter.asObservable();
    }

    public getClearAllToast(): Observable<string> {
        return this.clearEmitter.asObservable();
    }

    public clearAllToast(): void {
        this.clearEmitter.emit(null);
    }

    public toastyDefault( message: string, title?: string | undefined ): void {
        this.createToasty(message, (title) ? title : "", ToastyTypes[ToastyTypes.default]);
    }

    public toastyInfo( message: string, title?: string | undefined ): void {
        this.createToasty(message, (title) ? title : "", ToastyTypes[ToastyTypes.info]);
    }

    public toastySuccess( message: string, title?: string | undefined ): void {
        this.createToasty(message, (title) ? title : "", ToastyTypes[ToastyTypes.success]);
    }

    public toastyWait( message: string, title?: string | undefined ): void {
        this.createToasty(message, (title) ? title : "", ToastyTypes[ToastyTypes.wait]);
    }

    public toastyWarning( message: string, title?: string | undefined ): void {
        this.createToasty(message, (title) ? title : "", ToastyTypes[ToastyTypes.warning]);
    }

    public toastyError( message: string, title?: string | undefined ): void {
        this.createToasty(message, (title) ? title : "", ToastyTypes[ToastyTypes.error]);
    }

    private createToasty(  message: string, title: string, toastyType: string): void {
        this.toast = new Toast();
        this.toast.message = message;
        this.toast.title = title;
        this.toast.type = toastyType;

        this.toastEmitter.emit(this.toast);
    }

}