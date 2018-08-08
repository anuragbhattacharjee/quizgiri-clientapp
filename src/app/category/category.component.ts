import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { DataService } from '../_services/data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertService, UserService } from '../_services';

@Component({
    templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {

    categoryAdditionForm: FormGroup;

    submitted = false;
    loading = false;
    categories: any = [];
    categorySuggestions: any = [];
    max = 0;

    constructor(private _dataService: DataService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {
        this.getDetailsCategories();

    }

    ngOnInit() {
        this.categoryAdditionForm = this.formBuilder.group({
            category: ['', Validators.required],
        });
    }

    get f() { return this.categoryAdditionForm.controls; }

    getCategories() {
        this.categories = this._dataService.categories;
        // this._dataService.getCategories().subscribe(res => {
        //     this.categories = res;
        // });
    }
    getDetailsCategories() {
        this._dataService.getDetailsCategories().subscribe(res => {
            this.categories = res;
            //console.log(this.categories);
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i]._id > this.max) this.max = this.categories[i]._id;
            }
        });
    }

    categoryAutoComplete() {
        if (this.categoryAdditionForm.controls.category.value === "") return this.categorySuggestions = [];
        this.categorySuggestions = this.categories
            .filter(c => c.name.toLowerCase().startsWith(this.categoryAdditionForm.controls.category.value));
        //.slice(0, 5);
        //console.log(this.categorySuggestions);
    }

    newCategory() {
        console.log("Added new category");
        this._dataService.shootModal = true;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.categoryAdditionForm.invalid) {
            return;
        }

        this.loading = true;

        this._dataService.createCategory({ _id: this.max + 1, name: this.categoryAdditionForm.controls.category.value }).subscribe(res => {
            this.alertService.success('Category added successfully', true);
            this.getDetailsCategories();
            this.loading = false;
            this.submitted = false;
            this.categoryAdditionForm.reset();
        }, err => {
            this.alertService.error(err);
            this.loading = false;
            this.submitted = false;
        });

    }

    deleteCategory(category) {
        console.log(category);
    }
}