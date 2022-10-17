import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ktComponentHost]'
})
export class ComponentHostDirective {

  constructor(public container: ViewContainerRef) { }

}
