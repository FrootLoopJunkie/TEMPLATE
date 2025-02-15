import React from 'react'
import axios from 'axios'
import MessageInput from './messageInput/messageInput' //tyler

class MessageHolder extends React.Component{
    constructor(props){
        super(props)
        this.state={
            arrOfMessages: [],
        }
     }
    render(){
        if(this.props.loggedInUserRole === null && this.state.arrOfMessages.length !== 0){
            this.setState({arrOfMessages: []})
        }
        if(this.state.arrOfMessages.length === 0 && this.props.loggedInUserRole !== null){
            axios.get(`http://localhost:8000/api/messages/test/${this.props.loggedInUserRole}`)
                .then(res =>{
                    const arrOfMessages = res.data;
                    this.setState({arrOfMessages:arrOfMessages})
                })
        }
        const messages = this.state.arrOfMessages.slice(0).reverse().map(message=>{
            return(
                <div className='single-message-container'>
                    <div className='single-message-content'>{message}</div>
                </div>
            )
            })
        return(
            <>
            <div className='messageContainer'>{messages}</div>
            {this.props.loggedInUserRole !== null && <MessageInput/>}
            </>
        )
    }
}
export default MessageHolder