// import React from 'react'
import pug from "babel-plugin-transform-react-pug"
// export default Login = props => pug`
//     div#login 
//     div#jumbo
//         p.login Log in with github for a test run!
//     div.buttonOption
//         a.flex style="text-decoration:none; color:black;" href="github")
//         img(src="https://cdn.iconscout.com/icon/free/png-256/github-1693585-1442626.png" width="100px") 
//         pre(style="font-size: 30px; background-color: #66ff66; width: 50%; margin: 0 auto; margin-top: 12px;"). 
//                         Sign in 
//             //- span(id="online_span" style="text-align: none !impo; margin: none;")
//             //-     img(rel="online icon" src="https://i0.wp.com/worldofmadnesstv.uk/wp-content/uploads/2017/01/online-server-icon-womtv.png?ssl=1" style="width: 1vw;")  
//             //-     span(id="number_online") 
// `
const Login = props => pug`
  .wrapper
    if props.shouldShowGreeting
      p.greeting Hello World!

    button(onClick=props.notify) Click Me
`