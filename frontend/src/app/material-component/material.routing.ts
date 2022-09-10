import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { ManageTimeEntriesComponent } from './manage-time-entries/manage-time-entries.component';



export const MaterialRoutes: Routes = [
    {
        path: 'project',
        component: ManageProjectComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole:['admin']
        }

    },
    {
        path: 'task',
        component: ManageTaskComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole:['admin']
        }

    },
    {
        path: 'timeEntries',
        component: ManageTimeEntriesComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole:['admin','user']
        }

    },
    {
        path: 'employee',
        component: ManageEmployeeComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole:['admin']
        }

    }
];
