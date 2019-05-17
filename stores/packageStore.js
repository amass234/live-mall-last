import { observable, action } from 'mobx';
import Firebase from '../config/Firebase'
import firebase from 'firebase'
import { message } from 'antd'
import moment from 'moment'

class packageStore {

    @observable packageList = []
    @observable loading = true
    @observable package_name = ''
    @observable prices = ''
    @observable exp_date = ''
    @observable package_name2 = ''
    @observable price2 = ''
    @observable exp_date2 = ''
    @observable color = ''
    @observable unit = ''
    @observable description = ''
    @observable color2 = ''
    @observable unit2 = ''
    @observable description2 = ''

    @action reset() {
        this.package_name = ''
        this.prices = ''
        this.exp_date = ''
    }

    @action setPackage_name = package_name => this.package_name = package_name
    @action setPrice = prices => this.prices = prices
    @action setExp_date = exp_date => this.exp_date = exp_date
    @action setDescription = description => this.description = description
    @action setColor = color => this.color = color
    @action setUnit = unit => this.unit = unit

    @action setPackage_name2 = package_name => this.package_name2 = package_name
    @action setPrice2 = prices => this.price2 = prices
    @action setExp_date2 = exp_date => this.exp_date2 = exp_date
    @action setDescription2 = description => this.description2 = description
    @action setColor2 = color => this.color2 = color
    @action setUnit2 = unit => this.unit2 = unit

    @action newPackage() {
        const db = Firebase.firestore().collection('package')
        db.add({
            _id: '',
            created_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
            package_name: this.package_name,
            price: this.prices,
            exp_date: this.exp_date,
            unit: this.unit,
            color: this.color,
            description: this.description,
        }).then((ref) => {
            db.doc(ref.id).update({ _id: ref.id })
            message.success('สร้างแพคเกจใหม่แล้ว')
        }).catch(error => console.error(error.message))
    }

    @action updatePackage(id) {
        const db = Firebase.firestore().collection('package')
        db.doc(id).update({
            updated_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
            package_name: this.package_name2,
            price: this.price2,
            exp_date: this.exp_date2,
            unit: this.unit2,
            color: this.color2,
            description: this.description2,
        }).then(() => message.success('อัพเดทแพคเกจแล้ว'))
            .catch(error => console.error(error))
    }

    @action deletePack(id) {
        const db = Firebase.firestore().collection('package')
        db.doc(id).delete().then(() => message.success('ลบแพคเกจแล้ว'))
            .catch(error => console.error(error))
    }

    @action getPackage() {
        this.loading = true
        let itemList = []
        const db = Firebase.firestore().collection('package').orderBy('updated_at', 'desc')
        db.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                itemList.push({
                    id: doc.id,
                    ...doc.data(),
                    // _id: doc.data()._id,
                    // exp_date: doc.data().exp_date,
                    // updated_at: doc.data().updated_at,
                    // package_name: doc.data().package_name,
                    // price: doc.data().price,
                    // unit: doc.data().unit,
                    // description: doc.data().description,
                    isPerfect:
                        doc.data().color &&
                        doc.data().unit &&
                        doc.data().description &&
                        doc.data().exp_date &&
                        doc.data()._id &&
                        doc.data().created_at &&
                        doc.data().updated_at &&
                        doc.data().package_name &&
                        doc.data().price !== '' || undefined
                })
                this.packageList = [...new Map(itemList.map(o => [o.id, o])).values()]
                this.loading = false
            })
        })
        this.loading = false
        // .then(() => this.loading = false)
        //     .catch((error) => {
        //         this.loading = false
        //         console.log(error)
        //     })
    }

}

export default new packageStore()