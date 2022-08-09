import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Response } from "../interface/response.interface";
import { UserService } from "../service/user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {

    response: Response;
    constructor(
        private userService: UserService,
        ) {}

    ngOnInit(): void {
        this.userService.getUsers(15).subscribe(users => {
            console.log(users);
            this.response = users;
        })
    }



 }