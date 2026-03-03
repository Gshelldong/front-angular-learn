import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {single} from "rxjs";

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  // currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private destroyRef = inject(DestroyRef)

  constructor() {
    console.log('constructor exec');
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  ngOnInit() {
    console.log('component INIT');

    const interval = setInterval(() => {
      const rnd = Math.random(); //0 - 0.99999999
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    },5000);

     // 替代生命周期中的ngOnDestroy()
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }


  // ngOnDestroy() {
  //   clearTimeout(this.interval);
  // }
}
