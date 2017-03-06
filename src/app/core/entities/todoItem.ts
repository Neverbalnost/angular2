export class TodoItem {
	public title: string;
	public description: string;
	public startDate: Date;
	public id: Date;

	constructor(title: string, subTitle: string, startDate: Date, endDate: Date) {
		this.title = title;
		this.description = subTitle;
		this.startDate = startDate;
		this.id = endDate;
	}
}
