import {Component, DestroyRef, OnInit, inject, OnDestroy, signal, computed} from '@angular/core';
import {interval, map} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal<number>(0);

  ngOnInit(): void {
    const subscription = interval(1000).pipe(map((data) => data * 2))
      .subscribe({
      next: (data) => console.log(data)
    });

    this.destroyRef.onDestroy(
      () => {
        subscription.unsubscribe();
      }
    )
  }

  protected readonly onclick = onclick;

  onClick() {
    this.clickCount.update(count => count + 1)
  }
}
