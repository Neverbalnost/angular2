import { Directive, ElementRef, Input, OnInit } from '@angular/core';
@Directive({ selector: '[newCourse]' })
export class NewCourseDirective implements OnInit {
    private el;

    constructor(el: ElementRef) {
        this.el = el;
    }

    public ngOnInit() {
        const currDate = new Date();
        const courseDate = (new Date(this.courseDate));
        if (courseDate < currDate) {
            const timeDiff = Math.abs(courseDate.getTime() - currDate.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays <= 14 ) this.el.nativeElement.style.borderColor = 'green';
        } else if (courseDate > currDate) {
            this.el.nativeElement.style.borderColor = 'blue';
        }

    }

    @Input() courseDate: Date;
}