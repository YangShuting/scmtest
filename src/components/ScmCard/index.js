import React, { PureComponent, Fragment } from 'react';
import { List, Card } from 'antd';
import styles from './index.less';

class ScmCard extends PureComponent {
  state = {
    totalCallNo: 0,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        totalCallNo: 0,
      });
    }
  }

  render() {
    return (
      <div />
    );
  }
}

export default StandardTable;
