import { useTransition } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useState } from 'preact/hooks';
import './Style';


const NotificationMsg = (props) =>
    <div class="notification is-danger arrow-top">
        {props.children}
    </div>



export function NotificationMessage(props) {
    const [savedMsg, setSavedMsg] = useState()

    if (props.children){
        setSavedMsg(props.children)
    }

    const transitions = useTransition(props.show, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    })
    return transitions(
      (styles, item) => item && <animated.div style={{zIndex: 400, ...styles}}>
          <NotificationMsg>{savedMsg}</NotificationMsg>
      </animated.div>
    )
  }