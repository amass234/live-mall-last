import { observable, action } from 'mobx';
import Firebase from '../config/Firebase';
import moment from 'moment';
import { message } from 'antd';

class commonStore {
    @observable appname = 'Live Mall'
    @observable list = []
    @observable token = []
    @observable loading = false
    @observable loadingB = false
    @observable sessionId = ''
    @observable subToken = ''
    @observable pubToken = ''

    @action setpubToken(pubToken) {
        this.pubToken = pubToken
    }
    @action setsessionId(sessionId) {
        this.sessionId = sessionId
    }
    @action setsubToken(subToken) {
        this.subToken = subToken
    }

    @action getReport() {
        this.loading = true
        let list = []
        const db = Firebase.firestore().collection('report')
        db.onSnapshot(snapshot => {
            !snapshot.empty ?
                snapshot.forEach(doc => {
                    list.push({
                        ...doc.data()
                    })
                    this.list = list
                    this.loading = false
                })
                : this.loading = false
        })
    }

    @action getToken() {
        this.loading = true
        let token = []
        const db = Firebase.firestore().collection('opentok')
        db.onSnapshot(snapshot => {
            !snapshot.empty ?
                snapshot.forEach(doc => {
                    token.push({
                        ...doc.data()
                    })
                    this.token = token
                    this.loading = false
                })
                : this.loading = false
        })
    }

    @action newToken() {
        this.loadingB = true
        const db = Firebase.firestore().collection('opentok')
        db.doc('server1').set({
            sessionId: this.sessionId,
            pubToken: this.pubToken,
            subToken: this.subToken,
            created_at: moment().format('YYYY-MM-DDTHH:mm:ss')
        }).then(() => this.loadingB = false, message.success('Created Toked'))
            .catch(err => { this.loadingB = false, console.log(err.message), message.error('Error Created Toked') })
    }

}

export default new commonStore()