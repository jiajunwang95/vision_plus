import {NgModule} from '@angular/core';
import {Routes,RouterModule, PreloadAllModules} from '@angular/router';
import { LandingpageComponent } from 'src/app/components/dashboard/landingpage/landingpage.component';

const routes : Routes = [
    {
        path : '',
        component : LandingpageComponent
    },

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