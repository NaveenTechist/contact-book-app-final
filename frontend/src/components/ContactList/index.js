import './index.css'
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom'
const ContactList = (props) => {
    const { each, deleteFunction } = props
    const { id, name, phone } = each
    const onClickDeleteBtn = async () => {
        deleteFunction(id)
        const url = `https://contact-book-app-8yf7.onrender.com/contacts/${id}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(url, options)
        console.log(response)

    }

    return (
        <>
            <div className="each-contact" >
                <Link to={`/contact-details/${id}`} className='name-conatct Link'>
                    <div className="name-container" style={{ backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) }}>
                        <h1 className='single-letter'>{name[0]}</h1>
                    </div>
                    <div className='name-and-phone'>
                        <h1 className="contact-name">{name}</h1>
                        <p className="contact-number">{phone}</p>
                    </div>
                </Link>
                <div>
                    <button type='button' className='hidden-btn' onClick={onClickDeleteBtn}><MdDeleteOutline className='delete-icon' /></button>
                </div>
            </div>
        </>
    )
}
export default ContactList