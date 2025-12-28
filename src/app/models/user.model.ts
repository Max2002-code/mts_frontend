import { AuthModel } from "./auth.model";

export class Company{
    id!:number
    name!:string
    email!:string
    phone!:number
}

export class UserModel extends AuthModel {

    id = 0
    username = ''
    email = ''
    password = ''
    full_name = ''
    user_type = ''
    is_superuser = false
    company: Company = new Company

    constructor(init?: Partial<UserModel>) {
        super()

        Object.assign(this, init)
    }

    setUser(_user:unknown){
        const user = _user as UserModel
        this.id = user.id
        this.username = user.username || ''
        this.email = user.email || ''
        this.password = user.password || ''
        this.full_name = user.full_name || ''
        this.user_type = user.user_type || ''
        this.is_superuser = user.is_superuser || false
        
        if (user.company){
            this.company = Object.assign(new Company(), user.company)
        }
    }

}