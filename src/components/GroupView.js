import React, { Component } from 'react';
import {Button, Form, Input} from 'semantic-ui-react'
import {Image} from 'cloudinary-react'
import {fetchPhotos} from './FetchPhotos'


export default class GroupView extends Component {
    state = {
        group: {},
    }

    componentDidMount() {
        let groupNumber = Number(this.props.match.params.id)
        fetch(`http://localhost:3003/groups/${groupNumber}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ group: data})
        })

        // fetchPhotos("famsproj")
    }

    showWidget = (widget) => {
        window.widget.open()
    }

    submitHandler = (e) => {
        console.log("Clicked!")
    }

    uploadHandler = () => {
        window.cloudinary.openUploadWidget({
            cloudName: "famsproj",
            uploadPreset: "vugx2ccg"
        }, (error, result) => { this.checkUploadResult(result) })
    }
    

    checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            // console.log(this.props.currentUser.id)
            // this.props.postPhoto({user_id: this.props.currentUser.id,
            //     caption: '',
            //     url: resultEvent.info.secure_url
            // })
            console.log("Made It!")
        }
    }

    deleteHandler = () => {
        console.log("Clicked")
    }

  render() {
      console.log("https://res.cloudinary.com/famsproj/image/upload/v1543893523/qdwkvkapzfbmohwjxch6.jpg")

    return (
      <div>
          <div>
            <h1>{this.state.group.name}</h1>
          </div>
          
          <div>
                <Image cloudName="famsproj" publicId="welcomeImg" width="300" crop="scale"/>
              
            </div>
                <Button href="#" id="upload_widget_opener" onClick={this.uploadHandler} color="green">Upload multiple images</Button>
                
            <div>
                <Button content="Delete Group" color="red" onClick={e => this.deleteHandler(e)} />
            </div>
         
      </div>
    )
  }
}
