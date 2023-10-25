import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[appFading]',
})
export class FadingDirective implements OnInit {
  constructor() {}
  ngOnInit(): void {
    const element = document.querySelector('.my-component-element');

    if (element) {
      element.classList.add('fading');
    }
  }
}
