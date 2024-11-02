import {NgModule} from '@angular/core';
import {Routes,RouterModule, PreloadAllModules} from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { AdminpageComponent } from './components/reusable/adminpage/adminpage.component';

const routes : Routes = [
    {
        path : 'testing',
        component : LandingpageComponent
    },
    {
        path : 'admin',
        component : AdminpageComponent
    }
]

@NgModule({
    imports : [RouterModule.forRoot(
        routes, {
            preloadingStrategy : PreloadAllModules
        }
    )],
    exports : [RouterModule]
})

export class AppRoutingModule {}