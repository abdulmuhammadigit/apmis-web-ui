export class FormConfig {
    rows: FormRow[];
}
export class FormRow {
	elements: FormElement[];
}
export class FormElement {
    name: string;
    type: string;
    required? : boolean=false;
}
