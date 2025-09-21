import './index.css';
import { useState, useEffect } from 'react';
import ContactList from '..//ContactList'
import { LuContact } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

const displayStatus = {
    loading: 'LOADING',
    success: 'SUCCESS'
}

function Contacts() {

    const [contacts, setContacts] = useState([])
    const [currentStatus, setCurrentStatus] = useState(displayStatus.loading)
    useEffect(() => {
        const getContacts = async () => {
            const response = await fetch('https://contact-book-app-8yf7.onrender.com')
            if (response.ok) {
                const data = await response.json()
                setContacts(data)
                setCurrentStatus(displayStatus.success)
            }
        }
        getContacts()
    }, [])

    const deleteFunction = (id) => {
        const deleteContact = contacts.filter(each => each.id !== id && each)
        setContacts(deleteContact)
    }

    const onChangeSearch = (event) => {
        const searchedContacts = contacts.filter(each =>
            each.name.toLowerCase().includes((event.target.value).toLowerCase())
        )
        setContacts(searchedContacts)
    }
    const loadinfFunction = () => (
        <div className="loader-conatiner">
            <Oval color="blue" secondaryColor="blue" />
        </div>
    )

    const successFucntion = () => (
        <div className='all-contacts-container'>
            {contacts.map(each => <ContactList each={each} key={each.id} deleteFunction={deleteFunction} />)}
        </div>
    )


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
        <>
            <div className="main-app-container">
                <div className="inside-header-container">
                    <div className='header-container'>
                        <LuContact className='contact-icon' />
                        <h1 className="header-name">Contact</h1>
                        <Link to='/contacts'><button type="button" className='hidden-btn'><FiPlus className='add-icon' /></button></Link>
                    </div>
                    <div className='search-container'>
                        <div className='search-inner-container'>
                            <input type='search' className="search-input" placeholder='Search...' onChange={onChangeSearch} />
                            <div className='search-icon-container'>
                                < IoIosSearch className='search-icon' />
                            </div>
                        </div>
                    </div>
                    {switchFunction()}
                </div>
            </div>
        </>
    );
}

export default Contacts;
