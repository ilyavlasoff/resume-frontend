export class Resume
{
    constructor(data = null) {
        this.firstName = data.firstName ? data.firstName : '';
        this.lastName = data.lastName ? data.lastName : '';
        this.patronymic = data.patronymic ? data.patronymic : '';
        this.gender = data.gender ? data.gender : '';
        this.birthday = data.birthday ? new Date(data.birthday) : '';
        this.country = data.country ? data.country : '';
        this.city = data.city ? data.city : '';
        this.photo = data.photo ? data.photo : '';
        this.experienceLevel = data.experienceLevel ? data.experienceLevel : '';
        this.workplaces = [];
        this.educationLevel = data.educationLevel ? data.educationLevel : '';
        this.educations = [],
        this.phoneNumber = data.phoneNumber ? data.phoneNumber : '';
        this.email = data.email ? data.email : '';
        this.sphere = data.sphere ? data.sphere : '';
        this.desiredPost = data.desiredPost ? data.desiredPost : '';
        this.salaryMin = data.salaryMin ? data.salaryMin : '';
        this.salaryMax = data.salaryMax ? data.salaryMax : '';
        this.skills = data.skills ? data.skills : '';
        this.personalQualities = data.personalQualities ? data.personalQualities : '';
        this.aboutMyself = data.aboutMyself ? data.aboutMyself : '';
        this.status = data.status ? data.status : '';
        console.log(typeof data)
    }
}