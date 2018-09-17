import { Directive, ElementRef, HostBinding, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Gesture } from 'ionic-angular';

declare var $;
/**
 * Generated class for the PanzoomDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */

@Directive({
  selector: '[panzoom]' // Attribute selector
})
export class PanzoomDirective  implements OnInit {

  @HostBinding('class')
  elementClass = 'panzoom';

  private gesture: Gesture;
  private element;
  
  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  } 


  ngOnInit() {
    console.log('Hello PanzoomDirective Directive');
    $(this.element).panzoom({
      panOnlyWhenZoomed: true,
      minScale: 1
    });

    this.gesture = new Gesture(this.element);
    
    this.gesture.listen();

    this.gesture.on('pinchstart', (e) => {
      console.log('pinchstart event');
    });

    this.gesture.on('pinch', (e) => {
      if(e.scale >= 1){
          $(this.element).panzoom("zoom")
      }else{
          $(this.element).panzoom("zoom", true)
      }
    });

    this.gesture.on('doubletap', (e) => {
        $(this.element).panzoom("reset")
    })

    this.gesture.on('pinchend', (e) => {
        console.log("scale====>" + e.scale);
    });
  }

}
