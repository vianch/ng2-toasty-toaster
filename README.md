Angular 2: Toastr
===================

The lib is inspired by [angular-toastr] (https://github.com/Foxandxss/angular-toastr), and will show bootstrap-like toasts. 
Please update Angular 2 to latest version to avoid any unexpected issues.

![Examples](toastr-examples.jpg?raw=true "Default Toasts")

![Examples](pushnotification.png?raw=true "Push notification Toasts")

astr/bundles/ng2-toastr.min.js', since adding 'import {ToastModule} from 'ng2-toastr/ng2-toastr';' to your module file (below) will allow it to be autoloaded.

1. Add ToastyModule into your AppModule class. `app.module.ts` would look like this:

    ```javascript
        import {ToastyModule} from "./toasty/toasty.module";

        @NgModule({
            imports: [ToastyModule.forRoot()],
            exports: [ToastyModule],
            declarations: [],
            providers: [],
        })
    ```

2. Inject 'ToastyService' class in your component class.

    ```javascript
        import {ToastyService} from "./toasty/toasty.service";
        
        @Component({
       ...
        })
        export class AppComponent  implements OnInit, AfterViewInit {
        
          constructor(
              private dataService: DataService,
              private toastyService: ToastyService,
          ) { }
            
            public ngAfterViewInit(): void {
                this.toastyService.toastyDefault("Video gallery on!", "New toasty");
            }

            public clickMeInfo(): void {
                this.toastyService.toastyInfo("Clicked info!", "New toasty i ");
            }

            public clickMeError(): void {
                this.toastyService.toastyError("Clicked error!", "New toasty e");
            }

            public clickMeWait(): void {
                this.toastyService.toastyWait("Clicked Wait!", "New toasty w ");
            }

            public clickMeWarning(): void {
                this.toastyService.toastyWarning("Clicked warning!", "New toasty");
            }

            public clickMeSuccess(): void {
                this.toastyService.toastySuccess("Clicked succes!", "New toasty");
            }

            public clickMe(): void {
                this.toastyService.toastyDefault("Clicked!", "New toasty");
            }

            public eraseAllToasts(): void {
                this.toastyService.clearAllToast();
            }
        }
    ```

3. Add HTML markup 
  ```HTML 
    <div (click)="clickMe()" >CLICK ME</div>
    <div (click)="clickMeInfo()" >CLICK ME</div>
    <div (click)="clickMeError()" >CLICK ME</div>
    <div (click)="clickMeWait()" >CLICK ME</div>
    <div (click)="clickMeWarning()" >CLICK ME</div>
    <div (click)="clickMeSuccess()" >CLICK ME</div>
    <div (click)="eraseAllToasts()" >REMOVE ALL TOAST ME</div>

    <ng2-toasty [position]="'bottom-left'">

    </ng2-toasty>
 ```

### ToastOptions Configurations

By default, the toastr will show up at top right corner of the page view, and will automatically dismiss in 5 seconds. 
You can configure the toasts using ToastyConfig class in toasty.models.ts:


##### positionClass: (string)
Determines where on the page the toasts should be shown. Here are list of values: 
```javascript
const ToastyPositions = [
    "bottom-right", "bottom-left", "top-right", "top-left", "top-center", "bottom-center", "center-center"
];
```

##### ToastyTYpes themes: 
    colored,
    material,
    bootstrap,

##### ToastyTYpes: 
    default,
    info,
    success,
    wait,
    warning,
    error,


# Push Notifications 
If you arn't familiar with push notifications you can read more about them on the [Mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/API/Notification).
Based on push notification of [Fauc](http://flauc.github.io/angular2-notifications/)

## Requesting Permission
To request permission from the user to display push notifications call the `requestPushNotificationPermission()` method on the `ToastyService`.
```ts
this.toastyService.requestPushNotificationPermission();
```

# Create Notification

You can create a permission calling the `create(title: string, options: PushNotification)` method, like this: 

```ts
this.toastyService.createPushNotification("Test", {body: "something"}).subscribe(
            response => console.log(response),
            error => console.log(error)
        )
```

## Options

The following are options that can be passed to the options parameter: 

```ts
interface PushNotification {
    body?: string
    icon?: string
    tag?: string
    renotify?: boolean
    silent?: boolean
    sound?: string
    noscreen?: boolean
    sticky?: boolean
    dir?: 'auto' | 'ltr' | 'rtl'
    lang?: string
    vibrate?: number[]
}
```

Options correspond to the Notification interface of the Notification API:
[Mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/API/Notification).