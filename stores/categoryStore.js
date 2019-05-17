import { observable, action } from 'mobx';
import { message } from 'antd'
import Firebase from '../config/Firebase'
import firebase from 'firebase'

class categoryStore {

    @observable data = []
    @observable loading = true
    @observable category_name = ''
    @observable img_url = ''
    @observable isPopular = false
    @observable category_name2 = ''
    @observable img_url2 = ''
    @observable isPopular2 = false

    @action setCategory_name = category_name => this.category_name = category_name
    @action setCategory_name2 = category_name => this.category_name2 = category_name
    @action setImg_url = img_url => this.img_url = img_url
    @action setIsPopular = isPopular => this.isPopular = isPopular
    @action setIsPopular2 = isPopular => this.isPopular2 = isPopular
    
    @action reset() {
        this.category_name = ''
        this.img_url = ''
        this.isPopular = false
        this.category_name2 = ''
        this.img_url2 = ''
        this.isPopular2 = false
    }

    @action chexkPupolar(id, isPopular) {
        let db = Firebase.firestore().collection('category');
        db.doc(id).update({ isPopular: !isPopular })
    }

    @action newCategory() {
        const db = Firebase.firestore().collection('category')
        const timeStamp = firebase.firestore.FieldValue.serverTimestamp()
        db.add({
            _id: '',
            created_at: timeStamp,
            created_at_date: Date.now(),
            updated_at_date: Date.now(),
            updated_at: timeStamp,
            category_name: this.category_name,
            img_url: this.img_url,
            isPopular: this.isPopular,
        }).then((ref) => {
            db.doc(ref.id).update({ _id: ref.id })
            message.success('สร้างหมวดหมู่ใหม่แล้ว')
        }).catch(error => console.error(error))
    }

    @action updateCategory(id) {
        const db = Firebase.firestore().collection('category')
        db.doc(id).update({
            updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            updated_at_date: Date.now(),
            category_name: this.category_name2,
            img_url: this.img_url2,
            isPopular: this.isPopular2
        }).then(() => message.success('อัพเดทหมวดหมู่แล้ว'))
            .catch(error => console.error(error))
    }

    @action deleteCategory(id) {
        const db = Firebase.firestore().collection('category')
        db.doc(id).delete().then(() => message.success('ลบหมวดหมู่แล้ว'))
            .catch(error => console.error(error))
    }

    @action getCategory() {
        this.loading = true
        let listItem = []
        const db = Firebase.firestore()
        var citiesRef = db.collection('category');
        citiesRef.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                listItem.push({
                    id: doc.id,
                    category_name: doc.data().category_name,
                    created_at_date: doc.data().created_at_date,
                    img_url: doc.data().img_url,
                    isPopular: doc.data().isPopular,
                    isPerfect: doc.data().category_name && doc.data()._id && doc.data().created_at && doc.data().img_url && doc.data().isPopular !== '' || null || undefined
                })
                this.data = listItem
                this.loading = false
            })
            this.loading = false
        })
    }
}

export default new categoryStore();