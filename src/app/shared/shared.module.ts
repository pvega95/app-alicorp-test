import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcesoModalComponent } from '../features/list-process/proceso-modal/proceso-modal.component';
import { MaterialModule } from './material/material.module';


const MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
];

const COMPONENTS = [
    ProcesoModalComponent
];

const PIPES = [

];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS, ...PIPES],
    declarations: [...COMPONENTS, ...PIPES],
})
export class SharedModule { }
