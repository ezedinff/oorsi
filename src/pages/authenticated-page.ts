import { AuthService } from "../providers/auth.service";
import { NavController } from "ionic-angular";
import { LoginPage } from "./login/login";
import { ProfilePage } from "./profile/profile";
import { RegisterPage } from "./register/register";

export default class AuthenticatedPage {

    isLoggedIn: boolean;

    constructor(protected authService: AuthService, protected navCtrl: NavController) {
        this.isLoggedIn = authService.isLoggedIn;
        this.authService.authenticationChanged.subscribe(data => this.isLoggedIn = data)
    }

    login() {
        this.navCtrl.push(LoginPage, { popTo: this.navCtrl.getActive() });
    }

    register() {
        this.navCtrl.push(RegisterPage, { popTo: this.navCtrl.getActive() });
    }

    reloadPage() {

    }
}