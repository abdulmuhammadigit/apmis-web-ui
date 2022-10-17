import { BaseModel } from '../../_base/crud';

export class User extends BaseModel {
	public id: number;
	public username: string;
	public fullName: string;
	public valid: boolean;
	public token: string;
	public tokenType: string;

    clear(): void {
        this.id = undefined;
        this.username = '';
        this.fullName = '';
        this.valid = false;
        this.token = '';
        this.tokenType = '';
    }
}
