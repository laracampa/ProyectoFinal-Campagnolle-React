import {useState, useEffect} from 'react'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'
import { useParams } from 'react-router-dom'
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/config"


const ItemDetailContainer = () => {
    const [producto, setProducto] = useState(null);

    const {idItem} = useParams();

    useEffect (()=>{
        const nuevoDoc = doc(db, "inventario", idItem);
        getDoc(nuevoDoc)
            .then(res =>{
                const data = res.data();
                const nuevoProducto = {id: res.id, ...data}
                setProducto(nuevoProducto);
            })
            .catch(error => console.error)
    }, [idItem])
    
    return (
        <div>
            <ItemDetail {...producto} />
        </div>
    )
}

export default ItemDetailContainer
