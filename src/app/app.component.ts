import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resolution-check';
  scale = 100;
  top = 0;
  left = 0;
  xScale : number = 0;
  yScale: number = 0;

  ngAfterViewInit(): void {
    const style = document.getElementById('innerMainBody');
    console.log("Height : " + style.offsetHeight);
    console.log("width : " + style.offsetWidth);
    console.log("X width total : " + style.offsetWidth/1366);
    console.log("Y height total : " + style.offsetHeight/768);
    setTimeout(() => {
      this.xScale = style.offsetWidth/1600;
      this.yScale = style.offsetHeight/900;
    }, 0);
    
    fromEvent(window, "wheel").subscribe((ev: WheelEvent) => {
      const newScale = this.scale - ev.deltaY * 0.2;
      this.scale = Math.max(newScale, 100);
      const topVal = ev.clientY - this.scale / 2;
      const leftVal = ev.clientX - this.scale / 2;
      this.top = topVal >= 0 ? topVal : 0;
      this.left = leftVal >= 0 ? leftVal : 0;
    });
  }
}
