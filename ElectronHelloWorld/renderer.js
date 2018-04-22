// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './HelloWorld.jsx'
import dotnetify from 'dotnetify';

dotnetify.hubServerUrl = "http://localhost:5000";

ReactDOM.render(<HelloWorld />, document.getElementById('Content'))
