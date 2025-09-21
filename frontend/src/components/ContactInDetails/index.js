import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'

import './index.css'
const displayStatus = {
    loading: 'LOADING',
    success: 'SUCCESS'
}

const ContactInDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const navigateToHome = () => {
        navigate('/')
    }

    const [contacts, setContacts] = useState([])
    const [currentStatus, setCurrentStatus] = useState(displayStatus.loading)


    useEffect(() => {
        const getContacts = async () => {
            const response = await fetch(`https://contact-book-app-8yf7.onrender.com/contacts/${id}`)
            if (response.ok) {
                const data = await response.json()
                setContacts(data)
                setCurrentStatus(displayStatus.success)
            }
        }
        getContacts()

    }, [])

    const loadinfFunction = () => (
        <div className="loader-conatiner">
            <Oval color="blue" secondaryColor="blue" />
        </div>
    )


    const successFucntion = () => (
        <div className="profile-indetails-conatiner">
            <div className="name-container-details">
                <h1 className='single-letter-details'>{contacts?.name ? contacts.name[0] : ''}</h1>
            </div>
            <h1 className="details-name">{contacts.name}</h1>
            <p className="location-details">Indian, Delhi</p>
            <div className="details-btn">
                <button type="button" className="detail-btn-sty selected-btn">Details</button>
                <button type="button" className="detail-btn-sty">History</button>
            </div>
            <div className="details">
                <p className="label-details">Phone Number</p>
                <h1 className="details-phone">{contacts.phone}</h1>
                <p className="location-details">Email</p>
                <h1 className="details-phone">{contacts.email}</h1>
            </div>
        </div>
    )


    console.log(contacts)
    const switchFunction = () => {
        switch (currentStatus) {
            case displayStatus.loading:
                return loadinfFunction()
            case displayStatus.success:
                return successFucntion()
            default:
                return null;
        }
    }
    return (
        <div className="contact-details-container">
            <div className="inside-detail-conatainer">
                <div className="details-icons">
                    <button type="button" className="hidden-btn" onClick={navigateToHome}>  <MdKeyboardArrowLeft className="details-icons-sty" />
                    </button>
                    <BsThreeDots className="details-icons-sty" />
                </div>
                {switchFunction()}
            </div>
        </div>
    )
}

export default ContactInDetails