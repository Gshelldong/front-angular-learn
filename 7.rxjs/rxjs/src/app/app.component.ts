import {Component, DestroyRef, OnInit, inject, OnDestroy, signal, computed} from '@angular/core';
import {interval, map} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
// export class AppComponent implements OnInit {
//   private destroyRef = inject(DestroyRef);
//   clickCount = signal<number>(0);
//
//   ngOnInit(): void {
//     const subscription = interval(1000).pipe(map((data) => data * 2))
//       .subscribe({
//       next: (data) => console.log(data)
//     });
//
//     this.destroyRef.onDestroy(
//       () => {
//         subscription.unsubscribe();
//       }
//     )
//   }
//
//   protected readonly onclick = onclick;
//
//   onClick() {
//     this.clickCount.update(count => count + 1)
//   }
// }

export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);

  constructor() {
  }

  ngOnInit(): void {
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
