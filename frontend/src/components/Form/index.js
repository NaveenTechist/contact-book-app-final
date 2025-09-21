import './index.css'
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
const Form = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [errDisplay, setErrDisplay] = useState(false)
    const navigate = useNavigate()

    const toHome = () => {
        console.log('Btn Clicked')
        navigate('/')
    }

    const onSubmitForm = async () => {
        console.log('Form Submit')
        if (!name || !phone || !email) {
            setErrDisplay(true)
            return
        }
        setErrDisplay(false)
        toHome()
        const newContact = { name, phone, email }
        const url = "https://contact-book-app-8yf7.onrender.com/contacts"
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newContact)
        }
        setEmail('')
        setName('')
        setPhone('')
        await fetch(url, options)

    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }


    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }


    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }



    const navigateToHomeCross = () => {
        if (name !== '' || phone !== "" || email !== "") {
            setErrDisplay(true)
            return
        }
        navigate('/')
    }



    return (
        <>
            <div className='form-container'>
                <div className='inner-form-conatiner'>
                    <div className="new-contact-icons">
                        <div className='new-contact-icons-top-left'>
                            <button type="button" className="hidden-btn" onClick={navigateToHomeCross}><RxCross1 className='cross-icon' /></button>
                            <h1 className='new-contact-name'>New Contact</h1>
                        </div>
                        <button type="button" className="hidden-btn" onClick={onSubmitForm} ><FaCheck className='check-icon' /> </button>
                    </div>
                    <div className='img-container'>
                        <img src="https://imgs.search.brave.com/0Saygtgsgv733xRWzA9IdTZjUlT5abvWbWdpYy6b8P0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYWRk/LW5ldy1jb250YWN0/LWljb24tcWcxem5s/YzhpdHU3cHFheS5w/bmc" className='add-contact-img' alt="" />
                    </div>
                    <div className='form-container'>
                        <form>
                            <input type='text' placeholder='Name' className='new-contact-input' value={name} id="name" onChange={onChangeName} />
                            {errDisplay && <p className='error-msg'>Enter valid inputs</p>}
                            <input type='text' placeholder='Phone' id="phone" className='new-contact-input' value={phone} onChange={onChangePhone} />
                            {errDisplay && <p className='error-msg'>Enter valid inputs</p>}
                            <input type='text' placeholder='Email' id="email" className='new-contact-input' value={email} onChange={onChangeEmail} />
                            {errDisplay && <p className='error-msg'>Enter valid inputs</p>}
                            <input type='text' placeholder='Nickname' id="email" className='new-contact-input' />
                            <input type='text' placeholder='Address' id="email" className='new-contact-input' />
                            <input type='text' placeholder='Company' id="email" className='new-contact-input' />
                            {/* <input type='text' placeholder='Notes' id="email" className='new-contact-input' /> */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Form