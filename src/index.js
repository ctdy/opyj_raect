/**
 * 入口js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import 'antd/dist/antd.css'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";


//渲染App组件
ReactDOM.render(<App />, document.getElementById('root'));

