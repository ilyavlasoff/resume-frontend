export class Workplace
{
    constructor(data)
    {
        this.organizationName = data.organizationName;
        this.postName = data.postName;
        this.startDate = new Date(data.startDate);
        this.endDate = new Date(data.endDate);
    }
}