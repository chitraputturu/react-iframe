import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  iframeNode = null;

  render(){
    return (<div>
      <h1>Dynamic iframe</h1>
      <div className="iframe-container">
        <iframe title="sample" width="100%" scrolling="no" allowFullScreen={true} src="http://localhost:3000/test.html" ref={(node) => this.iframeNode = node} />
      </div>
    </div>)
  }

  componentDidMount(){
    const iframeDOMNode = ReactDOM.findDOMNode(this.iframeNode);
    
    iframeDOMNode.contentWindow.addEventListener('DOMContentLoaded',() => {
      if (
            iframeDOMNode &&
            iframeDOMNode.contentWindow &&
            iframeDOMNode.contentWindow.document &&
            iframeDOMNode.contentWindow.document.body
          ) {
            let height = iframeDOMNode.contentWindow.document.body.scrollHeight ? iframeDOMNode.contentWindow.document.body.scrollHeight : 0;
            let marginTop = window.getComputedStyle(iframeDOMNode.contentWindow.document.body).getPropertyValue('margin-top');
            let marginBottom = window.getComputedStyle(iframeDOMNode.contentWindow.document.body).getPropertyValue('margin-bottom');
            if(marginTop) {
               height += parseFloat(marginTop.replace('px', ''))
            }
            if (marginBottom) {
               height += parseFloat(marginBottom.replace('px', '')) + 10;
            }
            iframeDOMNode.height = height+'px';
            
          }
    },true)

  }

}

export default App;
