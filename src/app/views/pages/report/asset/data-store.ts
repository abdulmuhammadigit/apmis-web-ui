import { observable, action } from 'mobx-angular';
export class DataStore {

    @observable data = [];
    @action setData(data) {
        this.data = data;
    }
} export const dataStore = new DataStore();