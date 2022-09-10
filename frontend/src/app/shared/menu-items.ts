import { Injectable } from "@angular/core"; 

export interface Menu{
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    {state: 'dashboard', name:'Dashboard', icon:'dashboard', role:''},
    {state: 'project', name:'Manage Project', icon:'category', role:'admin'},
    {state: 'task', name:'Manage Task', icon:'inventory_2', role:'admin'},
    {state: 'timeEntries', name:'Manage Time Entry', icon:'inventory_2', role:''},
    {state: 'employee', name:'View Employee', icon:'people', role:'admin'},
];

@Injectable()
export class MenuItems{
    getMenuitem(): Menu[]{
        return MENUITEMS;
    }
}


