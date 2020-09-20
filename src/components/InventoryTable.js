import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

var _= require('lodash');
const isEmpty = require('is-empty');

const InventoryTable = (props) => {

    const columnNames = [
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

        // Get the Inventory List
        let dataDisplay = {};
        const   [selectionType] = useState('radio')

        return(
            <div>
                <Table
                    tableLayout='fixed'
                    columns = {columnNames}
                    dataSource = {props.dataDisplay}
                    rowKey='id'
                    rowSelection={{
                        selectedRowKeys: props.selectedRowKeys,
                        type: selectionType,
                        onChange: (selectedRowKeys, selectedRows) => {
                            if (!isEmpty(selectedRows)) 
                                props.selectedRecordFunction({ selectedRecord: selectedRows[0],
                                                                selectedRowKeys: selectedRowKeys });
                            else
                                props.selectedRecordFunction({ selectedRecord: {}, selectedRowKeys: [] });
                        }
                    }}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        )
};

export default InventoryTable;