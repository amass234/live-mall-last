import { observable, action } from 'mobx';
import Firebase from '../config/Firebase'
import { message } from 'antd'
import firebase from 'firebase'
import moment from 'moment'

class userStore {

    @observable data = []
    @observable loadingb = false
    @observable loading = true
    @observable f_name = ''
    @observable gender = ''
    @observable id_card = ''
    @observable l_name = ''
    @observable phone_no = ''
    @observable birth_date = ''
    @observable username = ''
    @observable package_name = null
    @observable exp_date = ''
    @observable showModal = false
    @observable isBan = false
    @observable word = ''
    @observable countBuyer = ''
    @observable countSeller = ''
    @observable visible = false

    @action setusername = username => this.username = username
    @action setf_name = f_name => this.f_name = f_name
    @action setgender = gender => this.gender = gender
    @action setid_card = id_card => this.id_card = id_card
    @action setl_name = l_name => this.l_name = l_name
    @action setphone_no = phone_no => this.phone_no = phone_no
    @action setpackage_name = package_name => this.package_name = package_name
    @action setbirth_date = birth_date => this.birth_date = birth_date
    @action setexp_date = exp_date => this.exp_date = exp_date

    @action getUser() {
        const listdata = []
        const db = Firebase.firestore()
        let dbUser = db.collection('users');
        dbUser.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                listdata.push({
                    email: doc.id,
                    ...doc.data(),
                    create_at_user: doc.data().created_at
                })
                dbUser.doc(doc.id).collection('package_history').orderBy('created_at', 'asc')
                    .onSnapshot(snapshots => {
                        !snapshots.empty ?
                            snapshots.forEach(history => {
                                listdata.push({
                                    email: doc.id,
                                    ...doc.data(),
                                    create_at_user: doc.data().created_at,
                                    historyID: history.id,
                                    ...history.data()
                                })
                                const out = [...new Map(listdata.map(o => [o.email, o])).values()]
                                this.data = out
                                this.loading = false
                                this.countSeller = out.filter(itemList => itemList.role === 'seller').length || 0
                                this.countBuyer = out.filter(itemList => itemList.role === 'buyer').length || 0
                            })
                            : this.data = [...new Map(listdata.map(o => [o.username, o])).values()]
                        this.loading = false
                        this.countSeller = [...new Map(listdata.map(o => [o.username, o])).values()]
                            .filter(itemList => itemList.role === 'seller').length || 0
                        this.countBuyer = [...new Map(listdata.map(o => [o.username, o])).values()]
                            .filter(itemList => itemList.role === 'buyer').length || 0
                    })
            })
            // const out = [...new Map(listdata.map(o => [o.email, o])).values()]
            // this.data = out
            // this.loading = false
            // this.countSeller = out.filter(itemList => itemList.role === 'seller').length || 0
            // this.countBuyer = out.filter(itemList => itemList.role === 'buyer').length || 0
        })
        // .catch(err => {
        //     console.log('Error getting documents', err);
        //     this.loading = false
        // });
    }

    @action banUser(email) {
        const db = Firebase.firestore()
        let dbUser = db.collection('users');
        dbUser.doc(email).update({
            isBan: !this.isBan
        }).then(() => message.success('BAN User Success'), this.visible = false)
            .catch(error => console.log(error.message))
    }

    @action verifyUser(email) {
        const db = Firebase.firestore()
        let dbUser = db.collection('users');
        dbUser.doc(email).update({
            isVerify: true
        }).then(() => message.success('Verify User Success', this.visible = false))
            .catch(error => console.log(error))
    }

    @action updateUser(email, historyID) {
        this.loadingb = true
        if (!this.package_name) {
            const db = Firebase.firestore()
            let dbUser = db.collection('users');
            dbUser.doc(email).update({
                f_name: this.f_name,
                gender: this.gender,
                l_name: this.l_name,
                phone_no: this.phone_no,
                birth_date: this.birth_date,
                username: this.username,
                updated_at: moment().format('YYYY-MM-DDTHH:mm:ss')
            }).then(async () => {
                await message.success('Update Success')
                this.loadingb = false
                this.visible = false
            })
                .catch(err => {
                    console.log('Error getting documents', err.message);
                    message.error('Update Fail')
                    this.loadingb = false
                })
        } else {
            const package_name = this.package_name
            const exp_date = this.exp_date
            const db = Firebase.firestore()
            const dbUser = db.collection('users');
            const dbPackage = Firebase.firestore().collection('package')
            dbUser.doc(email).update({
                f_name: this.f_name,
                gender: this.gender,
                l_name: this.l_name,
                phone_no: this.phone_no,
                birth_date: this.birth_date,
                username: this.username,
                updated_at: moment().format('YYYY-MM-DDTHH:mm:ss')
            }).then(async () => {
                await dbPackage.where('package_name', '==', package_name)
                    .get().then(docs => {
                        docs.forEach(doc => {
                            dbUser.doc(email).collection('package_history').doc(doc.id).set({
                                ...doc.data(),
                                created_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
                                updated_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
                                exp_date:
                                    doc.data().unit === 'YEAR' ?
                                        moment().add(doc.data().exp_date * 365, 'day').format('YYYY-MM-DDTHH:mm:ss') :
                                        doc.data().unit === 'MONTH' ?
                                            moment().add((doc.data().exp_date * 30), 'day').format('YYYY-MM-DDTHH:mm:ss') :
                                            moment().add((doc.data().exp_date), 'day').format('YYYY-MM-DDTHH:mm:ss')
                            })
                        })
                    }).then(() => {
                        message.success('Update Success')
                        this.loadingb = false
                        this.visible = false
                    })
                    .catch(err => {
                        console.log(err.message);
                        message.error('Update Fail')
                        this.loadingb = false
                    })

            })

        }
    }

    // @action searchingFor(word) {
    //     return x => {
    //         return x.title.toLowerCase().includes(word.toLowerCase()) || !word;
    //     }
    // }

    // @action searchUserByWord(word) {
    //     this.loading = true
    //     const listdata = []
    //     const db = Firebase.firestore()
    //     let dbUser = db.collection('users').where('username', '==', word)
    //     dbUser.get().then(snapshot => {
    //         snapshot.forEach(doc => {
    //             dbUser.doc(doc.id).collection('package_history')
    //                 .onSnapshot(pack => {
    //                     pack.forEach(history => {
    //                         listdata.push({
    //                             email: doc.id,
    //                             ...doc.data(),
    //                             historyID: history.id,
    //                             ...history.data()
    //                         }),
    //                             this.data = listdata.filter(this.searchingFor(word)),
    //                             this.loading = false
    //                     })
    //                 })
    //         })
    //     }).then(() => this.loading = false)
    //         .catch((error) => {
    //             this.loading = false
    //             this.data = []
    //             console.log(error)
    //         })
    // }

    // @action searchUserByRole(role) {
    //     this.loading = true
    //     const listdata = []
    //     const db = Firebase.firestore()
    //     let dbUser = db.collection('users')
    //     dbUser.where('role', '==', role)
    //         .get().then(snapshot => {
    //             snapshot.forEach(doc => {
    //                 dbUser.doc(doc.id).collection('package_history')
    //                     .onSnapshot(pack => {
    //                         pack.forEach(history => {
    //                             listdata.push({
    //                                 email: doc.id,
    //                                 ...doc.data(),
    //                                 historyID: history.id,
    //                                 ...history.data()
    //                             }),
    //                                 this.data = listdata,
    //                                 this.loading = false
    //                         })
    //                     })
    //             })
    //         }).then(() => this.loading = false).catch(() => this.loading = false, this.data = [])
    // }

}

export default new userStore();