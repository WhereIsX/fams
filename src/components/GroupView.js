import React, { Component } from 'react';
import {Button, Form, Input, Grid, Card, Image} from 'semantic-ui-react'


export default class GroupView extends Component {
    state = {
        group: {},
        photos: [],
        clicked: "empty",
        clickedImage: false,
        titleValue: "",
        nameValue: "",
        edit: false
    }

    componentDidMount() {
        // console.log(this.props.token, this.props.apiUrl)
        // debugger
        let groupNumber = Number(this.props.match.params.id)
        fetch(`${this.props.apiUrl}/groups/${groupNumber}`, {
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                Authorization: `${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ group: data, photos: data.media, nameValue: data.name})
        })
    }

    showWidget = (widget) => {
        window.widget.open()
    }

    submitHandler = (e) => {
        // e.preventDefault()
        // console.log(this.state.nameValue)
        // debugger
        fetch(`${this.props.apiUrl}/groups/${this.state.group.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify({
                name: this.state.nameValue
            })
        })
        .then(res => res.json())
        .then(() => {
            this.setState({edit: false})
            this.componentDidMount()
            })
    }

    uploadHandler = () => {
        window.cloudinary.openUploadWidget({
            cloudName: "famsproj",
            uploadPreset: "vugx2ccg"
        }, (error, result) => { this.checkUploadResult(result)})

    }
    

    checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            fetch(`${this.props.apiUrl}/media`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accepts": "application/json",
                    authorization: `${this.props.token}`
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
                this.componentDidMount()
            })
        }   
    }

    fullImage = () => {
        this.setState({ clickedImage: !this.state.clickedImage})
    }

    updateCaption = e => {
        // debugger
        this.setState({ clicked: e.target.parentElement.id, titleValue: e.target.parentElement.children[1].innerText
        })
    }

    goBack = () => {
        this.setState({ clicked: "empty", edit: false })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    nameHandler = e => {
       let id = e.target.parentElement.id
        fetch(`${this.props.apiUrl}/media/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json",
                authorization: `${this.props.token}`
            },
            body: JSON.stringify({
                "title": this.state.titleValue
            })
        })
        .then(res => res.json())
        .then(() => {
            this.setState({titleValue: "", clicked: "empty"})
            this.componentDidMount()
            })
    }

    editGroupHandler = e => {
        this.setState({ edit: !this.state.edit})
    }

    deleteGroupHandler = e => {
        fetch(`${this.props.apiUrl}/groups/${this.state.group.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() => {
            alert("Group Has Been Deleted!")
            this.props.history.replace("/home")})
    }

    deleteHandler = e => {
        let id = Number(e.target.parentElement.id)

        this.setState({ 
            photos: [...this.state.photos].filter(photo => {
                return Number(e.target.parentElement.id) !== photo.id
            })
        })

        fetch(`${this.props.apiUrl}/media/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json",
                authorization: `${this.props.token}`
            }
        })
        .then(() => {
                alert("Photo Has Been Deleted!")
                this.goBack()
            })
    }

  render() {
      console.log(this.state.clicked)
    let allImages = this.state.photos.map(image => {
        if (this.state.clicked !== "empty"){
            if (image.id === Number(this.state.clicked)) {
                    console.log(image)
                    return (<div className="imageCard" id={image.id} key={image.id}>
                                <Form onSubmit={e => this.nameHandler(e)}>
                                    <Input label="Edit Name" name="titleValue" value={this.state.titleValue} onChange={this.changeHandler} />
                                </Form>
                                    <img src={image.image} width={(this.state.clickedImage === false ? "300" : "600")} crop="scale" alt="image not found =("  onClick={this.fullImage}/>
                                <Button content="Delete Photo" color="red" onClick={e => this.deleteHandler(e)}/>
                                <Button content="Go Back" color="green" onClick={e => this.goBack(e)} />
                            </div>)
                }
                } else {
                    console.log(image)
                return (<div id={image.id} key={image.id} className="imageCard">
                    <Grid.Column>
                        <Card>
                        <Image src={image.image} alt="image not found =("  onClick={this.fullImage}/>
                            <Card.Content>
                                <Card.Header className="imageHeader" width="300" height="200">{image.title}</Card.Header>
                            {( this.state.edit === false ? <Button content="Update Photo" color="white" onClick={e => this.updateCaption(e)}/> : null)}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    </div>)
                }
    })
            
            
    return (
      <div>
          <div>
            {( this.state.edit === true ? <Form onSubmit={e => this.submitHandler(e)}><Input name="nameValue" label="Edit Name" value={this.state.nameValue} onChange={e => this.changeHandler(e)}/></Form> : <div className="header"><h1>{this.state.group.name}</h1></div>)}
          </div>
            <Grid>
                <Grid.Row>
                {allImages}
                </Grid.Row>
            </Grid>
          <div>
                
              
            </div>
                {( this.state.clicked === "empty"  && this.state.edit === false? <Button href="#" id="upload_widget_opener" onClick={this.uploadHandler} color="green">Upload multiple images</Button> : null)}
                <div>
                {( this.state.edit === true ? <Button content="Go Back" color="green" onClick={e => this.goBack(e)} /> : null)}
            </div>
            <div>
                {( this.state.clicked === "empty" && this.state.edit === false ? <Button content="Edit Group" color="red" onClick={e => this.editGroupHandler(e)} /> : <Button content="Delete Group" color="red" onClick={e => this.deleteGroupHandler(e)} />)}
            </div>
         
      </div>
    )
  }
}
