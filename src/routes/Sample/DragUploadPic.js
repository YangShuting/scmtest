import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'


// @DragDropContext(HTML5Backend)
// export default class PicturesWall extends React.Component {
//     state = {
//       previewVisible: false,
//       previewImage: '',
//       fileList: [{
//         uid: -1,
//         name: 'xxx.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       }],
//     };
  
//     handleCancel = () => this.setState({ previewVisible: false })
  
//     handlePreview = (file) => {
//       this.setState({
//         previewImage: file.url || file.thumbUrl,
//         previewVisible: true,
//       });
//     }
//     onDrag =(e) => {
//         console.log(e)
//     }
  
//     handleChange = ({ fileList }) => this.setState({ fileList })
  
//     render() {
//       const { previewVisible, previewImage, fileList } = this.state;
//       const uploadButton = (
//         <div>
//           <Icon type="plus" />
//           <div className="ant-upload-text">Upload</div>
//         </div>
//       );
//       return (
//         <div className="clearfix">
//           <Upload
//             action="//jsonplaceholder.typicode.com/posts/"
//             listType="picture-card"
//             fileList={fileList}
//             onPreview={this.handlePreview}
//             onChange={this.handleChange}
//           >
//             {fileList.length >= 3 ? null : uploadButton}
//           </Upload>
//             <img draggable onDrag={this.onDrag} alt="example" style={{ width: '100%' }} src={previewImage} />
//         </div>
//       );
//     }
//   }








// @DragDropContext(HTML5Backend)
// class Container extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.moveCard = this.moveCard.bind(this)
// 		this.state = {
// 			cards: [
// 				{
// 					id: 1,
// 					text: 'Write a cool JS library',
// 				},
// 				{
// 					id: 2,
// 					text: 'Make it generic enough',
// 				},
// 				{
// 					id: 3,
// 					text: 'Write README',
// 				}
// 			],
// 		}
// 	}

// 	moveCard(dragIndex, hoverIndex) {
// 		const { cards } = this.state
// 		const dragCard = cards[dragIndex]

// 		this.setState(
// 			update(this.state, {
// 				cards: {
// 					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
// 				},
// 			}),
// 		)
// 	}

// 	render() {
// 		const { cards } = this.state

// 		return (
// 			<div style={style}>
// 				{cards.map((card, i) => (
// 					<Card
// 						key={card.id}
// 						index={i}
// 						id={card.id}
// 						text={card.text}
// 						moveCard={this.moveCard}
// 					/>
// 				))}
// 			</div>
// 		)
// 	}
// }