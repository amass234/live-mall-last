import { observable, action } from 'mobx'
import Firebase from '../config/Firebase'
import Router from 'next/router'
import { Icon, notification } from 'antd'

class AuthStore {

    @observable errors = undefined;
    @observable loading = false;
    @observable user = null
    @observable uid = ''
    @observable username = ''
    @observable avatar = ''
    @observable email = ''

    @observable values = {
        email: '',
        password: '',
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: type.toUpperCase(),
            description: message,
        });
    };

    @action setEmail(email) {
        this.values.email = email;
    }

    @action setPassword(password) {
        this.values.password = password;
    }

    @action getUser() {
        this.loading = true
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user
                this.uid = user.uid
                this.email = user.email
                this.username = user.displayName
                this.avatar = user.photoURL
                localStorage.setItem('user', user.uid);
                this.loading = false
            }
            else {
                this.user = null
                localStorage.removeItem('user');
                this.loading = false
            }
        })
    }

    @action logOut() {
        const _this = this
        Firebase.auth().signOut()
            .then(() => _this.openNotificationWithIcon('success', 'ออกจากระบบแล้ว'))
            .catch(error => _this.openNotificationWithIcon('error', error.message))
    }

    @action login() {
        const _this = this
        this.loading = true
        this.errors = undefined;
        return Firebase.auth().signInWithEmailAndPassword(this.values.email, this.values.password)
            .then(() => Router.replace('/user').then(() => this.getUser(), _this.openNotificationWithIcon('success', `ยินดีต้อนรับกลับ`)))
            .catch((err) => this.openNotificationWithIcon('error', err.message))
            .finally(action(() => { this.loading = false; }));
    }

    @action login2() {
        const _this = this
        this.loading = true
        this.errors = undefined;
        return Firebase.auth().signInWithEmailAndPassword(this.values.email, this.values.password)
            .then(() => this.getUser(), _this.openNotificationWithIcon('success', `ยินดีต้อนรับกลับ`))
            .catch((err) => this.openNotificationWithIcon('error', err.message))
            .finally(action(() => { this.loading = false; }));
    }

}

export default new AuthStore()

