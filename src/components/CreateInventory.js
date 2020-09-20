import React, { Component } from 'react';
import {Form, Button, Row, Col, Input, InputNumber, DatePicker, Select, Modal} from 'antd';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'; 
import { withRouter } from 'react-router-dom';
import {createInventoryData, createInventoryRes} from '../actions/createInventoryAction';
import {getInventory} from '../actions/readInventoryAction';
import moment from 'moment';

const { Option } = Select;
var _= require('lodash');

class CreateInventory extends Component{
    // To call form method use ref for class component.
    formRef = React.createRef();

    formControlPosition = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 6 },
            lg: { span: 5 }
        },
        wrapperCol:{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 8 },
            lg: { span: 5 }
        }
    };
    formControlButtonPosition = {
        wrapperCol:{
            xs: { offset: 0, span: 24 },
            sm: { offset: 0, span: 24 },
            md: { offset: 6, span: 19 },
            lg: { offset: 5, span: 20 }
        }
    }

    onCreateClick = (values) => {
        console.log('check the values: ', values);
        let apiInput = {};
        apiInput['type'] = values.type;
        apiInput['manufacturer'] = values.manufacturer;
        apiInput['model'] = values.model;
        apiInput['serial_number'] = values.serial_number;
        apiInput['vendor'] = values.vendor;
        apiInput['cost'] = values.cost;
        apiInput['date_purchased'] = values.date_purchased;
        apiInput['purchased_by'] = values.purchased_by;
        apiInput['count'] = values.count;
        apiInput['location'] = values.location;
        this.props.createInventoryData(apiInput)
            .then(res => {
                console.log('check the response for create: ', res);
                let createInventoryResponse = 'FAILURE';
                if (!_.isNil(this.props.createInventoryResList) && !_.isNil(this.props.createInventoryResList.createInventoryResList) &&
                    this.props.createInventoryResList.createInventoryResList === 'SUCCESS')
                    createInventoryResponse = 'SUCCESS';
                Modal.info({
                    title: createInventoryResponse === 'SUCCESS'?'Successfully created the record':'Unable to create a record'
                });
                this.props.createInventoryRes(null);
                this.props.getInventory();
            });
    }

    purchasedByData = ["Amith", "Amanda", "Kevin"];

    render(){
        console.log('check the props in create: ', this.props);
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <Form
                            {...this.formControlPosition}
                            ref={this.formRef}
                            name='control-ref'
                            onFinish={(values) => this.onCreateClick(values)}
                        >
                            <Form.Item
                                label='Type'
                                name='type'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Type'
                                    }
                                ]}>
                                        <Input />
                            </Form.Item>
                            <Form.Item
                                label='Manufacturer'
                                name='manufacturer'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Manufacturer'
                                    }
                                ]}>
                                        <Input />
                            </Form.Item>
                            <Form.Item
                                label='Model'
                                name='model'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Model'
                                    }
                                ]}>
                                        <Input />
                            </Form.Item>
                            <Form.Item
                                label='Serial Number'
                                name='serial_number'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Serial Number'
                                    }
                                ]}>
                                        <Input />
                            </Form.Item>
                            <Form.Item
                                label='Vendor'
                                name='vendor'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Vendor'
                                    }
                                ]}>
                                        <Input />
                            </Form.Item>
                            <Form.Item
                                label='Cost'
                                name='cost'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input cost'
                                    }
                                ]}>
                                        <InputNumber
                                            max={100000}
                                            min={1}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                            </Form.Item>
                            <Form.Item
                                label='Purchased Date'
                                name='date_purchased'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Purchased Date'
                                    }
                                ]}>
                                        <DatePicker
                                            format='YYYY-MM-DD'
                                            inputReadOnly
                                        />
                            </Form.Item>
                            <Form.Item
                                label='Purchased By'
                                name='purchased_by'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Purchased By'
                                    }
                                ]}>
                                            <Select
                                                placeholder='Select User'
                                                >
                                                {
                                                    this.purchasedByData.map(user => {
                                                        return(
                                                            <Option key={user} value={user}>{user}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>   
                            </Form.Item>
                            <Form.Item
                                label='Count'
                                name='count'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Count'
                                    }
                                ]}>
                                        <Input />
                            </Form.Item>
                            <Form.Item
                                label='Location'
                                name='location'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Location'
                                    }
                                ]}>
                                        <Input />
                            </Form.Item>
                            <Form.Item {...this.formControlButtonPosition}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    size='large'>
                                    CREATE
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}; 

function mapStateToProps(state){
    return{
        getInventoryList: state.getInventoryList,
        createInventoryResList: state.createInventoryResList
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getInventory, createInventoryData, createInventoryRes }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateInventory));