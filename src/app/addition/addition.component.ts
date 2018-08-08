import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DataService } from '../_services/data.service';

import { AlertService, UserService } from '../_services';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
    templateUrl: 'addition.component.html',
    styleUrls: ['addition.component.css']
})


export class AdditionComponent implements OnInit {
    categoryOptionsModel: number[] ;
    //topicOptionsModel: number[] ;
    categoryOptions: IMultiSelectOption[];
    //topicOptions: IMultiSelectOption[];


    additionForm: FormGroup;
    loading = false;
    submitted = false;
    categories: any = [];
    selectedCategory = "";
    topics: any = [];
    topicSuggestions: any = [];
    categorySuggestions: any = [];
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    categoryInputFocus = false;
    topicInputFocus = false;
    str = "";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private _dataService: DataService) {

        this.getCategories();
        this.getTopics();
    }

    ngOnInit() {
        this.categories= this.route.snapshot.data['data'];
        this.categoryOptions = this._dataService.myOptions;

        this.additionForm = this.formBuilder.group({
           // category: ['', Validators.required],
            topic: [''],
            question: ['', Validators.required],
            answer: ['', Validators.required],
            answerOption1: ['', Validators.required],
            answerOption2: ['', Validators.required],
            answerOption3: ['', Validators.required],
            //optionsModel: [],
            categoryOptionsModel: [],
            //topicOptionsModel: [],
            quiestionType: ['']
        });

        this.additionForm.controls['categoryOptionsModel'].valueChanges
            .subscribe((selectedOptions) => {
                // changes
                console.log(selectedOptions);
                this.topicSuggestions = [];
                for(let i=0; i< selectedOptions.length; i++){
                    for(let j=0; j< this.topics.length; j++){
                        if(this.topics[j].category_id === selectedOptions[i]){
                            this.topicSuggestions.push(this.topics[j])
                        }
                    }
                }
            });

        //this.onChanges();

    }

    // onChanges(){
    //     this.additionForm.valueChanges
    //     .subscribe( result => {
    //         this.categoryAutoComplete(); 
    //         //console.log(this.categorySuggestions);
    //     });
        
    //     this.additionForm.get('category').valueChanges
    //     .subscribe( category => {
    //         if(category === ""){
    //             this.additionForm.get('topic').reset();
    //             //this.additionForm.get('topic').disable();
    //         }
    //     });
    // }

    onFocus(inputName){
        if(inputName === "category"){
            this.categoryInputFocus = true;
            this.topicInputFocus = false;
        } 
        if(inputName === "topic"){
            this.categoryInputFocus = false;
            this.topicInputFocus = true;
        } 
    }

    getCategories() {
        this._dataService.getDetailsCategories().subscribe(res => {
            this.categories = res;
            console.log(res);
        });

        // this.categories = [
        //     {name: "Anurag", _id: 1},
        //     {name: "General Knowledge", _id: 2},
        //     {name: "Social science", _id: 3}
        // ]
    }

    selectCategory(categoryName){
        this.selectedCategory = categoryName;
        this.topics = this.categories.filter( c => c.name === categoryName).map( x => x.topics);
        this.additionForm.get('topic').enable();
        this.categoryInputFocus = false;
        this.topicInputFocus = false;
    }

    getTopics(){
        this._dataService.getTopics().subscribe(res => {
            this.topics = res;
        });
    }

    categoryAutoComplete(){
        if(this.additionForm.controls.category.value === "") return this.categorySuggestions = [];

        this.categorySuggestions = this.categories
        .filter(c => c.name.toLowerCase().startsWith(this.additionForm.controls.category.value.toLowerCase()));
        //.slice(0, 5);
    }

    topicAutoComplete(){
        if(this.additionForm.controls.topic.value === "") return this.topicSuggestions = [];
        
        this.topicSuggestions = this.topics
        .filter(c => c.name.toLowerCase().startsWith(this.additionForm.controls.topic.value.toLowerCase()));
        //.slice(0, 5);
    }

    // convenience getter for easy access to form fields
    get f() { return this.additionForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.additionForm.invalid) {
            return;
        }

        this.loading = true;


       // console.log(this.additionForm.controls.topic.value);
        this._dataService.createQuestion(this.additionForm.value)
            //.pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Question added successfully', true);
                    this.submitted = false;
                    this.loading = false;
                    this.additionForm.reset();
                },
                error => {
                    this.alertService.error(error);
                    this.submitted = false;
                    this.loading = false;
                });
    }
}