export default class userDto {
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.age = user.age;
        this.email = user.email;
        this.password = user.password;
        this.fullName =  `${this.first_name}-${this.last_name}`;
    }
}