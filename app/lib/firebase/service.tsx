import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from './init';
import { SignUpDto } from '@/app/dto/signup';
import bcrypt from 'bcrypt';

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {   
    const snapshot = await getDocs(collection(firestore, collectionName)); 

    const data = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
    }));

    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id)); 

    const data = snapshot.data();
    return data;
    
}

export async function signUp(UserData: any,  callback : Function){
    const queryEmail = query(
        collection(firestore, 'users'),
        where('email', '==', UserData.email)
    ); 

    const snapshot = await getDocs(queryEmail);
    const data = snapshot.docs.map((doc) => ({
        id : doc.id,
        ...doc.data()
    }));

    if(data.length > 0){
        callback({
            status : false,
            message : "Email already exist"
        });

    }else{
        if(!UserData.role){
            UserData.role = "member";
        }

        UserData.password = await bcrypt.hash(UserData.password, 10);

        await addDoc(collection(firestore, 'users'), UserData)
            .then((res) => {
                callback({
                    status : true,
                    message : "Sign Up Success"
                });
            }).catch((err) => {
                callback({
                    status : false,
                    message : err
                });
            });

    }

}


export async function signIn(email : string){
    const queryEmail = query(
        collection(firestore, 'users'),
        where('email', '==', email)
    ); 

    const snapshot = await getDocs(queryEmail);
    const data = snapshot.docs.map((doc) => ({
        id : doc.id,
        ...doc.data()
    }));

    if(data){
        return data[0];
    }else{
        return null;
    }

    // if(data.length > 0){
    //     const user = data[0];
    //     const password = await bcrypt.compare(UserData.password, user.password);

    //     if(password){
    //         callback({
    //             status : true,
    //             message : "Sign In Success",
    //             data : user
    //         });
    //     }else{
    //         callback({
    //             status : false,
    //             message : "Password is wrong"
    //         });
    //     }
    // }else{
    //     callback({
    //         status : false,
    //         message : "Email is not registered"
    //     });
    // }
}