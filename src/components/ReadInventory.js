import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'; 
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col, Table } from 'antd';
import {getInventory} from '../actions/readInventoryAction';
import data from '../data.json';

var _= require('lodash');
const isEmpty = require('is-empty');

class ReadInventory extends Component{
    columnNames = [
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            sorter: (a,b) => a.type - b.type
        },
        {
          title: 'Manufacturer',
          key:'manufacturer',
          dataIndex: 'manufacturer',
          sorter: (a,b) => a.manufacturer - b.manufacturer
        },
        {
            title: 'Model',
            key:'model',
            dataIndex: 'model'
        },
        {
            title: 'Serial Number',
            key:'serial_number',
            dataIndex: 'serial_number'
        },
        {
            title: 'Vendor',
            key:'vendor',
            dataIndex: 'vendor'
        }, 
        {
            title: 'Cost',
            key:'cost',
            dataIndex: 'cost',
            sorter: (a, b) => a.cost - b.cost
        }, 
        {
            title: 'Purchased Date',
            key:'date_purchased',
            dataIndex: 'date_purchased'
        },
        {
            title: 'Purchased By',
            key:'purchased_by',
            dataIndex: 'purchased_by'
        },
        {
            title: 'Count',
            key:'count',
            dataIndex: 'count',
            sorter: (a, b) => a.count - b.count
        },
        {
            title: 'Location',
            key:'location',
            dataIndex: 'location'
        }   
    ];

    componentDidMount(){
        this.props.getInventory();
    }

    render(){
        // Get the Inventory List
        let dataDisplay = {};
        // dataDisplay = data.inventoryRead;
        console.log('check the props: ', this.props);
        if (!_.isNil(this.props) && !_.isNil(this.props.getInventoryList) && !_.isNil(this.props.getInventoryList.getInventoryList)){
            dataDisplay = this.props.getInventoryList.getInventoryList;
        }
        return(
            <div>
                <Row>
                    <Col>
                    {
                        !isEmpty(dataDisplay) && 
                        <Table
                            tableLayout='fixed'
                            columns = {this.columnNames}
                            dataSource = {dataDisplay}
                        />
                    }
                    </Col>
                </Row>
            </div>
        )
    }
};

function mapStateToProps(state){
    return{
        getInventoryList: state.getInventoryList
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getInventory }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadInventory));