import React, { Component } from 'react';
import {Button, Form, Input} from 'semantic-ui-react'
import {Image} from 'cloudinary-react'
import {fetchPhotos} from './FetchPhotos'


export default class GroupView extends Component {
    state = {
        group: {},
        photos: [],
        clicked: "empty",
        inputValue: ""
    }

    componentDidMount() {
        let groupNumber = Number(this.props.match.params.id)
        fetch(`http://localhost:3003/groups/${groupNumber}`)
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
            fetch("http://localhost:3003/media", {
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
        // debugger
        this.setState({ clicked: e.target.parentElement.id, inputValue: e.target.parentElement.children[1].innerText
        })
    }

    goBack = () => {
        this.setState({ clicked: "empty" })
    }

    changeHandler = e => {
        this.setState({ inputValue: e.target.value})
    }

    nameHandler = e => {
       let id = e.target.parentElement.id
        fetch(`http://localhost:3003/media/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify({
                "title": this.state.inputValue
            })
        })
        .then(res => res.json())
        .then(() => {
            this.setState({inputValue: "", clicked: "empty"})
            this.componentDidMount()
            })
    }

    deleteHandler = e => {
        let id = Number(e.target.parentElement.id)

        this.setState({ 
            photos: [...this.state.photos].filter(photo => {
                return Number(e.target.parentElement.id) !== photo.id
            })
        })

        fetch(`http://localhost:3003/media/${id}`, {
            method: "DELETE",
        })
        .then(alert("Photo Has Been Deleted!"))
    }

  render() {
      console.log(this.state.clicked)
    let allImages = this.state.photos.map(image => {
        if (this.state.clicked !== "empty"){
            if (image.id === Number(this.state.clicked)) {
                    console.log(image)
                    return (<div id={image.id} key={image.id}>
                                <Form onSubmit={e => this.nameHandler(e)}>
                                    <Input label="Edit Name" value={this.state.inputValue} onChange={this.changeHandler} />
                                </Form>
                                    <img src={image.image} width="300" crop="scale" alt="image not found =(" />
                                <Button content="Delete Photo" color="red" onClick={e => this.deleteHandler(e)}/>
                                <Button content="Go Back" color="green" onClick={e => this.goBack(e)} />
                            </div>)
                }
                } else {
                    console.log(image)
                return (<div id={image.id} key={image.id}>
                    <img src={image.image} width="300" crop="scale" alt="image not found =("/>
                    <h1>{image.title}</h1>
                    <Button content="Update Photo" color="green" onClick={e => this.updateCaption(e)}/>
                    </div>)
                }
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
