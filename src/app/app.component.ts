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
  scalehelper: number = 0;

 ngOnInit() : void {
    const style = document.getElementById('innerMainBody');
    console.log("Height : " + style.offsetHeight);
    console.log("width : " + style.offsetWidth);
    console.log("X width total : " + style.offsetWidth/1366);
    console.log("Y height total : " + style.offsetHeight/768);
    this.xScale = style.offsetWidth/1600;
    this.yScale = style.offsetHeight/900;
  }
  
  onMousewheel(event, input) {
    if (event.ctrlKey == true) {
      event.preventDefault();
      this.scalehelper = this.scale - event.deltaY * 0.2;
      if(this.scalehelper > 400) {
        return;
      }
      this.scale = Math.max(this.scalehelper, 100);
      const topVal = event.clientY - this.scale / 2;
      const leftVal = event.clientX - this.scale / 2;
      this.top = topVal >= 0 ? topVal : 0;
      this.left = leftVal >= 0 ? leftVal : 0;
    } else if(input) {
      this.scalehelper = 100 + (+event?.target.value);
      if(this.scalehelper > 400) {
        return;
      }
      this.scale = Math.max(this.scalehelper, 100);
      const topVal = event.clientY - this.scale / 2;
      const leftVal = event.clientX - this.scale / 2;
      this.top = topVal >= 0 ? topVal : 0;
      this.left = leftVal >= 0 ? leftVal : 0;
    }
  }
}
