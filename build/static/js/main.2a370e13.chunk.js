(this.webpackJsonpades=this.webpackJsonpades||[]).push([[0],{44:function(e,t,a){},46:function(e,t,a){},49:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a.n(n),c=a(36),s=a.n(c),i=(a(44),a(11)),o=a(0),l=a.n(o),d=a(2),u=a.p+"static/media/logo.6ce24c58.svg",j=(a(46),a(37)),p=a(16),b=Object(j.a)({apiKey:"AIzaSyAFY9L3JNCYGf5APtJM9QallQ8TLXvFWDU",authDomain:"quizment-ae4a6.firebaseapp.com",projectId:"quizment-ae4a6",storageBucket:"quizment-ae4a6.appspot.com",messagingSenderId:"774729961857",appId:"1:774729961857:web:87e44344039ae5dd875880",measurementId:"G-4GXXKNTKV9"}),h=Object(p.b)(b),m=a(6),O=function(){var e=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.e)(h);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(m.jsx)("div",{children:Object(m.jsxs)("header",{className:"App-header",children:[Object(m.jsx)("img",{src:u,className:"App-logo",alt:"logo"}),Object(m.jsxs)("p",{children:["Edit ",Object(m.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(m.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"}),Object(m.jsx)("button",{onClick:e,children:"Sign Out"})]})})},f=(a(49),a(4)),g=a(5),x=a(7),v=a(8),w=a(38),N=a.n(w),y=(a(27),function(e){Object(x.a)(a,e);var t=Object(v.a)(a);function a(){var e;Object(f.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={rewardName:"",rewardPoints:"",pictureURL:""},e.handleName=function(t){e.setState({rewardName:t.target.value})},e.handlePoints=function(t){e.setState({rewardPoints:t.target.value})},e.handleURL=function(t){e.setState({pictureURL:t.target.value})},e.handleSubmit=function(t){t.preventDefault();var a={rewardName:e.state.rewardName,ptsRequired:e.state.rewardPoints,url:e.state.pictureURL};console.log("reward : "+JSON.stringify(a)),N.a.post("https://localhost:8081/api/rewards",{reward:a}).then((function(e){console.log(e),console.log(e.data)}))},e}return Object(g.a)(a,[{key:"render",value:function(){return Object(m.jsx)("div",{className:"uploadReward",children:Object(m.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(m.jsxs)("label",{children:["Reward Name :",Object(m.jsx)("input",{type:"text",name:"rewardName",onChange:this.handleName})]}),Object(m.jsxs)("label",{children:["Points Required :",Object(m.jsx)("input",{type:"number",name:"rewardName",onChange:this.handlePoints})]}),Object(m.jsxs)("label",{children:["Picture URL :",Object(m.jsx)("input",{type:"file",name:"rewardName",onChange:this.handleURL})]}),Object(m.jsx)("button",{type:"submit",children:"Add"})]})})}}]),a}(r.a.Component)),S=y;var L=function(){var e=Object(n.useState)({}),t=Object(i.a)(e,2),a=t[0],r=t[1];return Object(p.c)(h,(function(e){try{r(e)}catch(n){var t=n.code,a=n.message;console.log(t),console.log(a)}})),Object(m.jsx)("div",{className:"App",children:a?Object(m.jsx)(O,{}):Object(m.jsx)(S,{})})},R=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,69)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))};s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(L,{})}),document.getElementById("root")),R()}},[[68,1,2]]]);
//# sourceMappingURL=main.2a370e13.chunk.js.map