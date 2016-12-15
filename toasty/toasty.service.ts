import { Injectable, EventEmitter } from "@angular/core";

import {Toast, ToastyTypes, PushNotification, PushPermission, Permission} from "./toasty.models";
import { Observable } from "rxjs/Observable";


declare const Notification: any;

@Injectable()
export class ToastyService  {
    public permission: Permission;
    private toastEmitter: EventEmitter<Toast>;
    private clearEmitter: EventEmitter<string>;
    private toast: Toast;

    constructor() {
        this.toastEmitter = new EventEmitter<Toast>();
        this.clearEmitter = new EventEmitter<string>();
        this.permission  = this.pushNotificationSUpported() ? Notification.permission : PushPermission[PushPermission.denied];
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

    public requestPushNotificationPermission() {
        if (this.pushNotificationSUpported()) {
            Notification.requestPermission((status: any) => this.permission = status);
        }
    }

    public createPushNotification(title: string, options?: PushNotification): Observable<any> {

        return new Observable((obs: any) => {

            if (!(this.pushNotificationSUpported())) {
                obs.error("Notifications are not available in this environment");
                obs.complete();
            }

            if (this.permission !==  PushPermission[PushPermission.granted]) {
                obs.error(`The user hasn"t granted you permission to send push notifications`);
                obs.complete();
            }

            const notificationEvents = new Notification(title, options);

            notificationEvents.onshow = (e: any) => obs.emit({notification: notificationEvents, event: e});
            notificationEvents.onclick = (e: any) => obs.emit({notification: notificationEvents, event: e});
            notificationEvents.onerror = (e: any) => obs.error({notification: notificationEvents, event: e});
            notificationEvents.onclose = () => obs.complete();
        });
    }

    private createToasty(  message: string, title: string, toastyType: string): void {
        this.toast = new Toast();
        this.toast.message = message;
        this.toast.title = title;
        this.toast.type = toastyType;

        this.toastEmitter.emit(this.toast);
    }

    private pushNotificationSUpported(): boolean {
        return "Notification" in window;
    }

}