import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { ReportService } from 'src/app/services/report.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class AdminUsersComponent implements OnInit {
  currentUser: UserModel | undefined
  authorization:boolean = true

  public rows = { page: 1, per_page: 4, results: [] as any, total: 0, pages: 0 };
  search: any = {};
  companies:any []=[]
  roles:any []=[]

  pageSize: number = 20;
  currentPage: number = 0;
  inputPage: number = 1;

  filtered:boolean = false
  filter_role:string = ''
  filter_is_active:string = ''
  filter_name:string = ''
  filter_company:string = ''

  showDetailUser:boolean = false
  showUserModal:boolean = false
  selectedUser:any
  modalMode: 'deactivate' | 'activate' = 'deactivate'
  action:boolean = false
  nextStep:boolean = false

  tempPassword:string = ''
  copied:boolean = false

  editMode:boolean = false
  new_email:string = ''
  new_role:string = ''

  showCreateUserModal:boolean = false
  showCreatePassword:boolean = false
  createPassword: string = ''
  new_user = {
    username: '',
    email: '',
    full_name: '',
    user_type: '',
    company: '',
  }

  constructor(private authService:AuthService, private http:ReportService, private router:Router, private toast:ToastService) { }

  datatablePage(pageInfo: { count?: number; pageSize?: number; limit?: number; offset?: number }) {
    this.inputPage = (pageInfo.offset ?? 0) + 1;
    this.rows = { page: this.inputPage, per_page: this.rows.per_page, results: [], total: this.rows.total, pages: this.rows.pages };
    this.getUsers();
  }

  onFooterPageChange(page: number) {
    const totalPages = Math.ceil((this.rows.total ?? 0) / this.rows.per_page);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    this.datatablePage({
      offset: page - 1,
      pageSize: this.rows.per_page,
      limit: this.rows.per_page,
      count: this.rows.total
    });
  }

  formatted_date(date:string){
    let date_time = new Date(date)
    return date_time.toLocaleDateString('it-IT')
  }

  resetFilter(){
    this.filtered = false

    this.search = {}
    this.filter_role = ''
    this.filter_is_active = ''
    this.filter_company= ''
    this.getUsers()
  }

  filterUsers(){
    if (!this.filter_name && !this.filter_role && !this.filter_is_active && !this.filter_company) return

    this.filtered = true

    this.search.name = this.filter_name
    this.search.user_type = this.filter_role
    this.search.is_active = this.filter_is_active
    this.search.company = this.filter_company

    this.getUsers()
  }

  openEditMode(){
    this.editMode = true
    
    this.new_role = this.selectedUser.user_type
  }

  saveEditMode(){
    if (this.new_role === this.selectedUser.user_type){
      this.new_role = ''
    }

    if (this.new_email === this.selectedUser.email){
      this.new_email = ''
    }

    this.http.postEditMode(this.selectedUser.id, this.new_email, this.new_role).subscribe({
      next: data => {
        this.toast.success("Utente aggiornato")
        this.selectedUser = data
        this.editMode = false
      }, error: err => {
        console.error(err)
        this.toast.error(err.error.error)
      }
    })
  }

  cancelEditMode(){
    this.new_email = ''
    this.new_role = ''
    this.editMode = false
  }

  openDetailModal(user:any){
    this.showDetailUser = true
    this.selectedUser = user
  }

  closeDetailModal(){
    this.selectedUser = null
    this.showDetailUser = false
  }

  openReactivateModal(user:any){
    this.modalMode = 'activate'
    this.showUserModal = true
    this.selectedUser = user
  }

  openDeactivateModal(user:any){
    this.modalMode = 'deactivate'
    this.showUserModal = true
    this.selectedUser = user
  }

  closeUserModal(){
    this.selectedUser = null
    this.showUserModal = false
    this.nextStep = false
  }

  confirmAction(){
    if (this.modalMode === 'deactivate'){
      this.action = false
    } else {
      this.action = true
    }

    this.http.postDeactivateUser(this.selectedUser.id, this.action).subscribe({
      next: data => {
        if (data.success){
          const text = this.modalMode === 'deactivate' ? 'Disattivato' : 'Riattivato'
  
          this.toast.success(`Utente ${text} correttamente`)
  
          this.selectedUser = null
          this.showUserModal = false
          this.getUsers()
        }
      }, error: err => {
        console.error(err)
        this.toast.error(err.error.detail)
      }
    })
      
  }

  resetPassword(){
    this.http.getNewPassword(this.selectedUser.id).subscribe({
      next: data => {
        this.tempPassword = data
        this.nextStep  = true
      }, error: err => {
        console.error(err)
        this.toast.error(err.error.detail)
      },
    })
  }

  copyToClipboard(password:string){
    navigator.clipboard.writeText(password)
    this.copied = true
    setTimeout(() => this.copied = false, 1500)
  }

  openModalUser(){
    this.showCreateUserModal = true
  }

  createUser(){
    this.showCreatePassword = true

    this.http.postNewUser(this.new_user).subscribe({
      next: data => {
        this.toast.success("Utente Creato correttamente!")
        this.createPassword = data['password']
        this.getUsers()
      }, error: err => {
        console.error(err)
        this.toast.error(err.error.error)
      }
    })
  }

  closeCreateUser(){
    this.showCreateUserModal = false
    this.showCreatePassword = false
  }

  getUsers(){
    this.http.getAdminUsers(this.search, this.inputPage).subscribe(data => {
      this.rows = data;
    });
    this.http.getCompany().subscribe(data => {
      this.companies = data
    })
  }

  getRoles(){
    this.http.getRolesUser().subscribe({
      next: data => {
        this.roles = data
      }, error: err => {
        console.error(err)
        this.toast.error(err.error.error)
      }
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage()
    if (this.currentUser){
      if (!['superuser', 'admin'].includes(this.currentUser?.user_type)) {
        this.authorization = false
        this.router.navigate(['/no-auth'])
      }
    }

    this.getUsers()
    this.getRoles()
  }
  
}
