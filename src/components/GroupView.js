import React, { Component } from 'react';
import {Button, Form, Input} from 'semantic-ui-react'
import {Image} from 'cloudinary-react'
import {fetchPhotos} from './FetchPhotos'


export default class GroupView extends Component {
    state = {
        group: {},
        photos: []
    }

    componentDidMount() {
        let groupNumber = Number(this.props.match.params.id)
        fetch(`http://10.39.108.188:3000/groups/${groupNumber}`)
        .then(res => res.json())
        .then(data => {
            // debugger
            this.setState({ group: data, photos: data.media})
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
        }, (error, result) => { this.checkUploadResult(result)})

    }
    

    checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            fetch("http://10.39.108.188:3000/media", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "user_id": 1,
                    "group_id": this.state.group.id,
                    "image": resultEvent.info.secure_url,
                    "title": "Hey Girl!"
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ photos: [...this.state.photos, resultEvent.info.secure_url]})
            })
        }

        
    }

    updateCaption = e => {
        console.log("Clicked")
    }

    deleteHandler = e => {
        let id = Number(e.target.parentElement.id)

        this.setState({ 
            photos: [...this.state.photos].filter(photo => {
                return Number(e.target.parentElement.id) !== photo.id
            })
        })

        fetch(`http://10.39.108.188:3000/media/${id}`, {
            method: "DELETE",
        })
        .then(alert("Photo Has Been Deleted!"))
    }

  render() {
      console.log("https://res.cloudinary.com/famsproj/image/upload/v1543893523/qdwkvkapzfbmohwjxch6.jpg")
      console.log(this.state.photos)
        let allImages = this.state.photos.map(image => {
            // debugger
            return (<div id={image.id}>
                    <img src={image.image} width="300" crop="scale" alt="image not found =("/>
                    <h1>{image.title}</h1>
                    <Button content="Update Caption" color="green" onClick={e => this.updateCaption(e)}/>
                    <Button content="Delete Photo" color="red" onClick={e => this.deleteHandler(e)}/>
                    </div>)
        })
    return (
      <div>
          <div>
            <h1>{this.state.group.name}</h1>
          </div>
            {allImages}
          <div>
                
              
            </div>
                <Button href="#" id="upload_widget_opener" onClick={this.uploadHandler} color="green">Upload multiple images</Button>
                
            <div>
                <Button content="Delete Group" color="red" onClick={e => this.deleteHandler(e)} />
            </div>
         
      </div>
    )
  }
}
