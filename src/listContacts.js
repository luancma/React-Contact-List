import React,{Component} from 'react'
import PropTypes from 'prop-types';


class ListContacts extends Component{
    
    static PropTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteClicked: PropTypes.func.isRequired,
    }


    //Criar o estado 
    state = {
        query: '',
    }
    
    //Manipulando o estado e atribuíndo um valor
    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    //Retoar no valor da query para o estado inicial
    removeQueryValue = () => {
        this.updateQuery('');
    }

    render(){
        const { query } = this.state
        const { contacts, onDeleteClicked } = this.props
        const showContacts = query === ''
        ? contacts
        : contacts.filter((c) => (
            c.name.toLowerCase().includes(query.toLowerCase())
        ))
        return(
            <div className='list-contacts'>
            {console.log(query)}
                <div className='input-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                {showContacts.length !== contacts.length && (
                    <div className='show-all-contacts'>
                        <span>
                            Agora está mostrando {showContacts.length} de { contacts.length }.
                        </span>
                        <button onClick={this.removeQueryValue}>Show all contacts</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showContacts.map((contact) => (
                        <li key={contact.id}>
                            <div className='contact-item'>
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button
                                onClick={() => onDeleteClicked(contact)}>Delete contact
                            </button>
                        </li>  
                    ))}
                </ol>
            </div>
        )
    }
}
export default ListContacts;