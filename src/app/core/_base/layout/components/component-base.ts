import { ComponentFactoryResolver, ComponentRef, Injectable, Type } from '@angular/core';
import { ComponentHostDirective } from '../directives/component-host.directive';


@Injectable({
	providedIn: 'root'
})
export class ComponentBase<T> {

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {

	}

	public Construct(Type: Type<any>, host: ComponentHostDirective): ComponentRef<T> {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(Type);
		const viewContainerRef = host.container;
		viewContainerRef.clear();

		const componentRef = viewContainerRef.createComponent<T>(componentFactory);
		return componentRef;
	}
}
