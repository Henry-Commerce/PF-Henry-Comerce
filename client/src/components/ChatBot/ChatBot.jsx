import React, {Component} from 'react';

export class ChatBot extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        (function(d, m){
            var kommunicateSettings = {"appId":"a2c6e5c1e5688b708e360286821c7ad","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
          })(document, window.kommunicate || {});
    }
    render() {
        <div></div>
    }
}
