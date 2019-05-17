import { observable, action } from 'mobx';
import Firebase from '../config/Firebase'
import firebase from 'firebase'
import moment from 'moment'
import { message } from 'antd'

class depositStore {

    @observable depositList = []
    @observable loading = true
    @observable amount = ''
    @observable amountCount = ''
    @observable name = ''
    @observable type = ''
    @observable countIsVerify = ''
    @observable countIsVerifyFalse = ''
    @observable visible = false

    @action setName = name => this.name = name
    @action setAmount = amount => this.amount = amount
    @action setType = type => this.type = type


    @action async countVerify() {
        const db = Firebase.firestore().collection('deposit').where('isVerify', '==', true)
        const dbf = Firebase.firestore().collection('deposit').where('isVerify', '==', false)
        let list = []
        await db.get().then(snapshot =>
            snapshot.forEach(doc => {
                list.push({ id: doc.id })
                this.countIsVerify = list.length >= 0 ? list.length.toString() : '0'
            }))
        await dbf.get().then(snapshot =>
            snapshot.forEach(doc => {
                list.push({ id: doc.id })
                this.countIsVerifyFalse = list.length >= 0 ? list.length.toString() : '0'
            }))
    }

    @action updateIsVerify(id, email, pk_id) {
        const db = Firebase.firestore().collection('deposit')
        const dbUser = Firebase.firestore().collection('users')
        const dbPackage = Firebase.firestore().collection('package')
        db.doc(id).update({
            isVerify: true
        }).then(async () => {
            await dbUser.doc(email).update({ role: 'seller' })
            await dbPackage.doc(pk_id).get().then(doc => {
                dbUser.doc(email).collection('package_history').doc(pk_id).set({
                    ...doc.data(),
                    created_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
                    exp_date:
                        doc.data().unit === 'DAY' ?
                            moment().add(doc.data().exp_date, 'day').format('YYYY-MM-DDTHH:mm:ss') :
                            doc.data().unit === 'MONTH' ?
                                moment().add((doc.data().exp_date * 30), 'day').format('YYYY-MM-DDTHH:mm:ss') :
                                moment().add((doc.data().exp_date * 365), 'day').format('YYYY-MM-DDTHH:mm:ss')
                })
            })
            await message.success('Update is Verify Success')
            this.visible = false
        })
    }

    @action updateDeposit(id) {
        const db = Firebase.firestore().collection('deposit')
        db.doc(id).update({
            amount: this.amount,
            name: this.name,
            type: this.type,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(() => this.loading = false, this.visible = false, message.success('Update Success'))
            .catch((error) => {
                this.loading = false
                console.log(error)
                message.error('Update Fail')
            })
    }

    @action getDeposit() {
        let itemList = []
        const db = Firebase.firestore().collection('deposit')
        db.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                itemList.push({
                    id: doc.id,
                    _id: doc.data()._id,
                    ...doc.data()
                })
                const output = [...new Map(itemList.map(o => [o.id, o])).values()]
                const filter = output.filter(itemList => itemList.amount)
                const result = filter.map(item => {
                    return item.amount
                })
                this.countIsVerify = output.filter(itemList => itemList.isVerify === true).length || 0
                this.countIsVerifyFalse = output.filter(itemList => itemList.isVerify === false).length || 0
                this.amountCount = this.sum(result);
                this.depositList = output
                this.loading = false
            })
            this.loading = false
        })
        // .then(() => this.loading = false)
        //     .catch((error) => {
        //         this.loading = false
        //         console.log(error)
        //     })
    }

    @action sum(obj) {
        var sum = 0;
        for (var el in obj) {
            if (obj.hasOwnProperty(el)) {
                sum += parseFloat(obj[el]);
            }
        }
        return sum;
    }
}

export default new depositStore()