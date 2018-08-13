import { Component, OnInit, HostListener, HostBinding, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { DataService } from '../_services/data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../_services';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'topic.component.html'
})

export class TopicComponent implements OnInit {
    optionsModel: number[];
    myOptions: IMultiSelectOption[] = [];

    topicAdditionForm: FormGroup;
    topics: any = [];
    categories: any = [];

    submitted = false;
    loading = false;
    max = 0;

    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 1,
        displayAllSelectedText: true,
        isLazyLoad: true
    };

    myTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find',
        searchEmptyResult: 'Nothing found...',
        searchNoRenderText: 'Type in search box to see results...',
        defaultTitle: 'Select Category',
        allSelected: 'All selected',
    };

    private isOpen: Boolean = false;
    constructor(private _el: ElementRef,
        public _dataService: DataService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertService: AlertService) {

        this.categories = this.route.snapshot.data['data'];

        this.myOptions = this._dataService.myOptions;

    }

    ngOnInit() {
        this.getTopics();

        this.topicAdditionForm = this.formBuilder.group({
            topic: ['', Validators.required],
            desc: [''],
            tournament: Boolean
        });
    }



    get f() { return this.topicAdditionForm.controls; }

    // @HostBinding('class.show') get opened() {
    //     return this.isOpen;
    // }
    // @HostListener('click') open() {
    //     this.isOpen = true;
    //     this._el.nativeElement.querySelector('.dropdown-menu').classList.add('show')
    // }
    // @HostListener('document:click', ['$event.target']) close(targetElement) {
    //     let inside: boolean = this._el.nativeElement.contains(targetElement);
    //     if (!inside) {
    //         this.isOpen = false;
    //         this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show')

    //     }
    // }


    onChange() {
        // angular-2-dropdown-multiselect
        // drop down select on change
        // console.log(this.optionsModel);
    }

    getTopics() {
        this._dataService.getTopics().subscribe(res => {
            this.topics = res;

            for (let i = 0; i < this.topics.length; i++) {
                if (this.topics[i]._id > this.max) {
                    this.max = this.topics[i]._id;
                }
            }
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.topicAdditionForm.invalid) {
            return;
        }

        const obj = {
            _id: this.max + 1,
            category_id: this.optionsModel,
            name: this.topicAdditionForm.controls.topic.value,
            desc: this.topicAdditionForm.controls.desc.value,
            tournament: false
        };

        this._dataService.createTopic(obj).subscribe(res => {
            this.alertService.success('Topic added successfully', true);
            this.getTopics();
            this.loading = false;
            this.submitted = false;
            this.topicAdditionForm.reset();
        }, err => {
            this.alertService.error(err);
            this.loading = false;
            this.submitted = false;
        });
    }
}
