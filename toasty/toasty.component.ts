// Created by VIANCH
// This project is licensed under the terms of the MIT license.
// based on https://github.com/akserg/ng2-toasty AND https://github.com/CodeSeven/toastr

import {Component, Input, OnInit, OnDestroy, Output} from "@angular/core";

import {ToastyPositions, Toast, ToastyConfig} from "./toasty.models";
import {ToastyService} from "./toasty.service";
import {Subscription} from "rxjs";

@Component({
    selector: "ng2-toasty",
    template: `
        <div id="toasty" [ngClass]="[position]" *ngIf="toasts.length > 0">
               
            <div *ngFor="let toast of toasts" class="toast animated bounceInUp" [ngClass]="[toast.type, toastyConfig.theme]">
                <div *ngIf="toastyConfig.showClose" class="toast-close-button" (click)="closeToastEvent($event, toast.id)"></div>
                <div *ngIf="toast.title || toast.message" class="toast-text">
                    <span *ngIf="toast.title" class="toast-title">{{toast.title}}</span>
                    <br *ngIf="toast.title && toast.message" />
                    <span *ngIf="toast.message" class="toast-message">{{toast.message}}</span>
                </div>
            </div>
            
        </div>
    `,
})
export class ToastyComponent  implements OnInit, OnDestroy {
    public toastyConfig: ToastyConfig;
    public toasts: Array<Toast>;
    private positionValue: string;
    private toastSubscription: Subscription;
    private clearToastSubscription: Subscription;

    @Input()
    public set position(value: string)  {
        this.positionValue = (this.existPositionInToasty(value)) ? value :  this.toastyConfig.position;
    }
    public get position(): string { return this.positionValue; }

    constructor(private toastyService: ToastyService) {
        this.toastyConfig = new ToastyConfig();
    }

    public ngOnInit(): void {
        this.initData();
        this.registerSubscribers();
    }

    public ngOnDestroy(): void {
        this.destroyAllToasts();
    }

    public closeToastEvent($event: MouseEvent, toastId: string): void {
        $event.preventDefault();
        this.closeSingleToast(toastId);
    }

    private existPositionInToasty( positionName: string ): boolean {
        for (let i = 0, positionLength = ToastyPositions.length; i < positionLength; i++) {
            if (ToastyPositions[i] === positionName) return true;
        }
        return false;
    }

    private initData(): void {
        this.toasts = [];
    }

    private registerSubscribers(): void {
        this.toastSubscription = this.toastyService.getToasts().subscribe((toast: Toast) => {
            this.setToasts(toast);
            this.toastTimeOut(toast.id);
        });

        this.clearToastSubscription = this.toastyService.getClearAllToast().subscribe(() => {
            this.toasts = [];
        });
    }

    private setToasts(toast: Toast): void {
        if (this.toasts.length >= this.toastyConfig.limit) {
            this.toasts.shift();
        }
        this.toasts.push(toast);
    }

    private closeSingleToast(toastId: string): void {
         for (let i = 0, toastLength = this.toasts.length;  i < toastLength; i++) {
             if (this.toasts[i].id === toastId) {
                 this.toasts.splice(i, 1);
                 break;
             }
         }
    }

    private toastTimeOut(toastId: string): void {
        setTimeout(() => {
            this.closeSingleToast(toastId);
        }, this.toastyConfig.timeout);
    }

    private destroyAllToasts(): void {
        this.toasts = [];
        delete this.toasts;
        this.toastSubscription.unsubscribe();
        this.clearToastSubscription.unsubscribe();
    }
}
