import { List, message, Avatar, Spin, Card, Icon, Checkbox, Row, Col } from 'antd';

const { Meta } = Card;
import reqwest from 'reqwest';
import fetch from 'dva/fetch';
import React, { PureComponent } from 'react';
import style from './style.less';
import InfiniteScroll from 'react-infinite-scroller';
import { LazyLoadImg, getJudge } from '../../utils/ajust';
import { Detail } from './ApplyDetail';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';


class Cards extends PureComponent {
    handleClick = () => {
      this.props.handleData();
    }

    render() {
      const { data } = this.props;
      return (
        <Col sm={24} md={8} xl={4} >
          <Card
            className={style.main}
                    // style={{ width: 300 }}
            cover={<LazyLoadImg onClick={this.handleClick} />}
          >
            <Meta
                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<Title data={data} />}
            />
            <Checkbox className={style.chosen} />
          </Card>
        </Col>
      );
    }
}

const Title = props =>
  (
    <Row className="info">
      <Col xs={24}>
        <span className={style.left}>编号：{props.data.Id}</span>
        <span className={style.right}>状态：{getJudge(props.data.status)}</span>
      </Col>
      <Col xs={24}>
        <span className={style.right}>总得分：123</span>
      </Col>
    </Row>
  );

export default class InfiniteListExample extends React.Component {
    state = {
      loading: false,
      hasMore: true,
      modal: false,
      modalData: {},
    }
    handleOpenModal = item => () => {
      this.setState({
        modal: true,
        modalData: item,
      });
    }
    handleCloseModal = () => {
      this.setState({
        modal: false,
      });
    }
    handleInfiniteOnLoad = () => {
      const data = this.state.data;
      this.setState({
        loading: true,
      });
      if (data.length > 100) {
        message.warning('Infinite List loaded all');
        this.setState({
          hasMore: false,
          loading: false,
        });
      }
      // this.getData((res) => {
      //     data = data.concat(res.results);
      //     this.setState({
      //         data,
      //         loading: false,
      //     });
      // });
    }
    render() {
      const { loading, hasMore, modal, modalData } = this.state;
      const { data, funs } = this.props;
      // const data = [1,2,3,4,5,6,7,8,9,10,11,12,14,15,16]
      return (
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow
          >
            <Row gutter={{
                        md: 8,
                        lg: 24,
                        xl: 48,
                        }}
            >
              {data.map((item, index) => <Cards handleData={this.handleOpenModal(item)} key={index} data={item} />)}
            </Row>

            {loading && hasMore && <Spin className="demo-loading" />}
          </InfiniteScroll>
          <Detail modal={modal} close={this.handleCloseModal} data={modalData} />
        </div>
      );
    }
}


// export default class InfiniteListExample extends React.Component {
//   state = {
//     data: [],
//     loading: false,
//     hasMore: true,
//   }
//   getData = (callback) => {
//     reqwest({
//       url: fakeDataUrl,
//       type: 'json',
//       method: 'get',
//       contentType: 'application/json',
//       success: (res) => {
//         callback(res);
//       },
//     });
//   }
//   componentWillMount() {
//     this.getData((res) => {
//       this.setState({
//         data: res.results,
//       });
//     });
//   }
//   handleInfiniteOnLoad = () => {
//     let data = this.state.data;
//     this.setState({
//       loading: true,
//     });
//     if (data.length > 14) {
//       message.warning('Infinite List loaded all');
//       this.setState({
//         hasMore: false,
//         loading: false,
//       });
//       return;
//     }
//     this.getData((res) => {
//       data = data.concat(res.results);
//       this.setState({
//         data,
//         loading: false,
//       });
//     });
//   }
//   render() {
//     return (
//       <div className="demo-infinite-container" style={{height:300,overflow: 'auto'}}>
//         <InfiniteScroll
//           initialLoad={false}
//           pageStart={0}
//           loadMore={this.handleInfiniteOnLoad}
//           hasMore={!this.state.loading && this.state.hasMore}
//           useWindow={false}
//         >
//           <List
//             dataSource={this.state.data}
//             renderItem={item => (
//               <List.Item key={item.id}>
//                 <List.Item.Meta
//                   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                   title={<a href="https://ant.design">{item.name.last}</a>}
//                   description={item.email}
//                 />
//                 <div>Content</div>
//               </List.Item>
//             )}
//           >
//             {this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}
//           </List>
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }
