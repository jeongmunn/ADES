(this.webpackJsonpades=this.webpackJsonpades||[]).push([[0],{41:function(e,t,n){},50:function(e,t,n){},52:function(e,t,n){},55:function(e,t,n){},76:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a=n(7),c=n.n(a),s=n(20),i=n(42),r=n.n(i),l=(n(50),n(11)),d=n(10),o=n(0),j=n.n(o),b=n(3),h=n.p+"static/media/logo.6ce24c58.svg",u=(n(52),n(43)),p=n(24),O=Object(u.a)({apiKey:"AIzaSyAFY9L3JNCYGf5APtJM9QallQ8TLXvFWDU",authDomain:"quizment-ae4a6.firebaseapp.com",projectId:"quizment-ae4a6",storageBucket:"quizment-ae4a6.appspot.com",messagingSenderId:"774729961857",appId:"1:774729961857:web:87e44344039ae5dd875880",measurementId:"G-4GXXKNTKV9"}),m=Object(p.b)(O),x=n(1),g=function(){var e=function(){var e=Object(b.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.e)(m);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(x.jsx)("div",{children:Object(x.jsxs)("header",{className:"App-header",children:[Object(x.jsx)("img",{src:h,className:"App-logo",alt:"logo"}),Object(x.jsxs)("p",{children:["Edit ",Object(x.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(x.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"}),Object(x.jsx)("button",{onClick:e,children:"Sign Out"})]})})},f=(n(55),function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(""),i=Object(l.a)(s,2),r=i[0],d=i[1],o=function(){var e=Object(b.a)(j.a.mark((function e(){var t,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(p.a)(m,n,r);case 3:e.sent,e.next=12;break;case 6:e.prev=6,e.t0=e.catch(0),t=e.t0.code,a=e.t0.message,console.log(t),console.log(a);case 12:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),h=function(){var e=Object(b.a)(j.a.mark((function e(){var t,a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(p.d)(m,n,r);case 3:t=e.sent,console.log(JSON.stringify(t.user.uid)),e.next=13;break;case 7:e.prev=7,e.t0=e.catch(0),a=e.t0.code,c=e.t0.message,console.log(a),console.log(c);case 13:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{className:"signin",children:[Object(x.jsx)("h1",{children:"Sign in"}),Object(x.jsx)("input",{placeholder:"email",type:"email",onChange:function(e){c(e.target.value)}}),Object(x.jsx)("input",{placeholder:"password",type:"password",onChange:function(e){d(e.target.value)}}),Object(x.jsx)("button",{onClick:h,children:" Sign In"}),Object(x.jsx)("h1",{children:"Sign up"}),Object(x.jsx)("input",{placeholder:"email",type:"email",onChange:function(e){c(e.target.value)}}),Object(x.jsx)("input",{placeholder:"password",type:"password",onChange:function(e){d(e.target.value)}}),Object(x.jsx)("button",{onClick:o,children:"Sign Up"})]})}),v=n(14),y=n.n(v),w=n(19);function C(){var e=Object(d.f)();return Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{children:"Teacher Administration"}),Object(x.jsx)(w.a,{onClick:function(){e("/studentAdmin")},children:"Student Administration"}),Object(x.jsx)(w.a,{onClick:function(){e("/rewardsAdmin")},children:"Rewards Administration"}),Object(x.jsx)(w.a,{onClick:function(){e("/badgesAdmin")},children:"Badges Administration"}),Object(x.jsx)(w.a,{onClick:function(){e("/mazeAdmin")},children:"Maze Administration"}),Object(x.jsx)(w.a,{onClick:function(){e("/leaderboardAdmin")},children:"Leaderboard Administration"})]})}var S=n(5),A=n(6),N=n(8),k=n(9),D=n(23),R=(n(41),function(e){Object(N.a)(n,e);var t=Object(k.a)(n);function n(){var e;Object(S.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={data:[],class:[],name:"",requirements:"",pic_url:"",badgeClassID:""},e.handleName=function(t){e.setState({name:t.target.value})},e.handleRequirement=function(t){e.setState({requirements:t.target.value})},e.handleURL=function(t){e.setState({pic_url:t.target.files[0]})},e.handleSubmit=function(t){t.preventDefault();var n=Object(D.b)(),a=Object(D.c)(n,"img/"+e.state.pic_url.name),c=e.state.pic_url,s={contentType:e.state.pic_url.type};Object(D.d)(a,c,s),Object(D.a)(a).then((function(t){console.log("File available at",t);var n=document.getElementById("dropDown").value,a=parseInt(n);console.log(a+"classBADGE");var c={name:e.state.name,requirements:e.state.requirements,pic_url:t,badgeClassID:a};console.log("BADGEEEE"+JSON.stringify(c));y.a.post("https://ades-ca1-project.herokuapp.com/api/newBadge",c,{headers:{"content-type":"application/json"}}).then((function(e){console.log(e),console.log(e.data),window.location.reload()}))}))},e}return Object(A.a)(n,[{key:"componentDidMount",value:function(){var e=this;y.a.get("https://ades-ca1-project.herokuapp.com/api/badges").then((function(t){console.log(t.data.length),e.setState({data:t.data})})),y.a.get("https://ades-ca1-project.herokuapp.com/api/badgeClass").then((function(t){console.log(t.data.length),e.setState({class:t.data})}))}},{key:"render",value:function(){var e=this.state.data,t=this.state.class;return Object(x.jsx)("div",{id:"body",children:Object(x.jsxs)("div",{id:"div",children:[Object(x.jsx)("h1",{style:{fontFamily:"sans-serif ",color:"blue"},children:"Badges Administration"}),Object(x.jsxs)("div",{className:"viewBadges",children:[Object(x.jsxs)("div",{id:"divForm",children:[Object(x.jsx)("h2",{id:"add",children:"Add Badge"}),Object(x.jsxs)("form",{onSubmit:this.handleSubmit,id:"form",children:[Object(x.jsxs)("label",{children:["Badge Name:",Object(x.jsx)("input",{type:"text",name:"name",onChange:this.handleName})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("label",{children:["Badge Requirement:",Object(x.jsx)("input",{type:"text",name:"requirements",onChange:this.handleRequirement})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("label",{children:["Pic URL:",Object(x.jsx)("input",{type:"file",name:"pic_url",onChange:this.handleURL})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("label",{children:["Badge Class ID:",Object(x.jsxs)("select",{name:"badgeClassID",onChange:this.handleBadgeClassID,id:"dropDown",children:[Object(x.jsx)("option",{value:"1",children:"Air"}),Object(x.jsx)("option",{value:"2",children:"Water"}),Object(x.jsx)("option",{value:"3",children:"Fire"}),Object(x.jsx)("option",{value:"4",children:"Geo"})]})]}),Object(x.jsx)("button",{type:"submit",children:"Add"})]})]}),Object(x.jsxs)("div",{children:[" ",Object(x.jsxs)("div",{children:[Object(x.jsx)("h2",{children:"Badge Class"}),Object(x.jsxs)("table",{class:"table",children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Class Name"}),Object(x.jsx)("th",{children:"Describtion "})]}),t&&t.map((function(e){return Object(x.jsxs)("tr",{id:"tableRow",class:"spaceUnder",children:[Object(x.jsx)("td",{children:e.className}),Object(x.jsx)("td",{children:e.classDescription})]})}))]})]})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("h2",{children:"View Badges"}),Object(x.jsxs)("table",{class:"table",children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Badge Name"}),Object(x.jsx)("th",{children:"Requirements"}),Object(x.jsx)("th",{children:"badgeClass"}),Object(x.jsx)("th",{children:"Picture"})]}),e&&e.map((function(e){return Object(x.jsxs)("tr",{id:"tableRow",class:"spaceUnder",children:[Object(x.jsx)("td",{children:e.name}),Object(x.jsx)("td",{children:e.requirements}),Object(x.jsx)("td",{children:e.className}),Object(x.jsx)("td",{children:Object(x.jsx)("img",{src:e.pic_url,style:{height:200,width:200},alt:""})}),Object(x.jsx)("td",{children:Object(x.jsx)(s.b,{to:"/EditBadge?id=".concat(e.badgeID),children:Object(x.jsx)(w.a,{children:"Edit"})})})]},e.badgeID)}))]})]})]})]})})}}]),n}(c.a.Component)),B=function(e){Object(N.a)(n,e);var t=Object(k.a)(n);function n(){var e;Object(S.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={data:[]},e}return Object(A.a)(n,[{key:"componentDidMount",value:function(){var e=this;y.a.get("https://ades-ca1-project.herokuapp.com/api/rewards").then((function(t){e.setState({data:t.data})}))}},{key:"render",value:function(){var e=this.state.data;return Object(x.jsxs)("div",{className:"viewReward",children:[Object(x.jsx)("h3",{className:"p-3 text-center",children:"React - Display a list of items"}),Object(x.jsx)(s.b,{to:"/uploadReward",children:Object(x.jsx)(w.a,{children:"Upload Reward"})}),Object(x.jsxs)("table",{className:"table table-striped table-bordered",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Name"}),Object(x.jsx)("th",{children:"Points"}),Object(x.jsx)("th",{children:"Picture"})]})}),Object(x.jsx)("tbody",{children:e&&e.map((function(e){return Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:e.rewardName}),Object(x.jsx)("td",{children:e.ptsRequired}),Object(x.jsx)("td",{children:Object(x.jsx)("img",{src:"../images/"+e.url,style:{height:200,width:200}})})]},e.rewardID)}))})]})]})}}]),n}(c.a.Component),I=n(74),q=(n(75),function(e){Object(N.a)(n,e);var t=Object(k.a)(n);function n(){var e;Object(S.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={rewardName:"",rewardPoints:"",file:""},e.handleName=function(t){e.setState({rewardName:t.target.value})},e.handlePoints=function(t){e.setState({rewardPoints:t.target.value})},e.handleURL=function(t){e.setState({file:t.target.files[0]})},e.handleSubmit=function(t){t.preventDefault();var n=new I;n.append("myImage",e.state.file),n.append("rewardName",e.state.rewardName),n.append("ptsRequired",e.state.rewardPoints),console.log("reward : "+n);y.a.post("https://ades-ca1-project.herokuapp.com/api/rewards",n,{headers:{"content-type":"multipart/form-data"}}).then((function(e){console.log(e),console.log(e.data)}))},e}return Object(A.a)(n,[{key:"render",value:function(){return Object(x.jsxs)("div",{className:"uploadReward",children:[Object(x.jsx)("h1",{children:"Upload Reward"}),Object(x.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(x.jsxs)("label",{children:["Reward Name :",Object(x.jsx)("input",{type:"text",name:"rewardName",onChange:this.handleName})]}),Object(x.jsxs)("label",{children:["Points Required :",Object(x.jsx)("input",{type:"number",name:"ptsRequired",onChange:this.handlePoints})]}),Object(x.jsxs)("label",{children:["Picture URL :",Object(x.jsx)("input",{type:"file",name:"myImage",onChange:this.handleURL})]}),Object(x.jsx)("button",{type:"submit",children:"Add"})]})]})}}]),n}(c.a.Component)),E=function(e){Object(N.a)(n,e);var t=Object(k.a)(n);function n(){var e;Object(S.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={data:[]},e}return Object(A.a)(n,[{key:"componentDidMount",value:function(){var e=this;y.a.get("https://ades-ca1-project.herokuapp.com/api/mazeContent").then((function(t){e.setState({data:t.data})}))}},{key:"render",value:function(){var e=this.state.data;return Object(x.jsx)("div",{id:"body",children:Object(x.jsx)("div",{id:"div",children:Object(x.jsxs)("div",{className:"viewMazeLvl",children:[Object(x.jsx)("h3",{className:"p-3 text-center",children:"Map of Maze Content"}),Object(x.jsxs)("table",{className:"table table-striped table-bordered",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Maze Level"}),Object(x.jsx)("th",{children:"Points"})]})}),e&&e.map((function(e){return Object(x.jsxs)("tr",{id:"tableRow",class:"spaceUnder",children:[Object(x.jsx)("td",{children:e.mazeLvl}),Object(x.jsx)("td",{children:e.points}),Object(x.jsx)("td",{children:Object(x.jsx)(s.b,{to:"/EditMazeContent?lvl=".concat(e.mazeLvl),children:Object(x.jsx)(w.a,{children:"Edit"})})})]})}))]})]})})})}}]),n}(c.a.Component),L=function(e){Object(N.a)(n,e);var t=Object(k.a)(n);function n(){var e;Object(S.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={points:""},e.handlePoints=function(t){e.setState({points:t.target.value})},e.handleSubmit=function(t){t.preventDefault();var n={points:e.state.points};console.log("MAZE____"+JSON.stringify(n));var a=window.location.href.split("/")[3].slice(20);y.a.put("".concat("https://ades-ca1-project.herokuapp.com/api","/mazeContent/").concat(a),n,{headers:{"content-type":"application/json"}}).then((function(e){console.log(e),console.log(e.data)}))},e}return Object(A.a)(n,[{key:"render",value:function(){var e=window.location.href.split("/")[3].slice(20);return Object(x.jsx)("div",{id:"bodyEdit",children:Object(x.jsx)("div",{id:"divEdit",children:Object(x.jsxs)("div",{className:"editReward",children:[Object(x.jsxs)("h1",{children:["Edit Points on Level ",e]}),Object(x.jsxs)("form",{onSubmit:this.handleSubmit,id:"formEdit",children:[Object(x.jsxs)("label",{children:["Points Required :",Object(x.jsx)("input",{type:"number",name:"points",onChange:this.handlePoints})]}),Object(x.jsx)("button",{type:"submit",children:"Update"})]})]})})})}}]),n}(c.a.Component),P=(n(76),function(e){Object(N.a)(n,e);var t=Object(k.a)(n);function n(){var e;Object(S.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={data:[],name:"",requirements:"",pic_url:"",badgeClassID:""},e.handleName=function(t){e.setState({name:t.target.value})},e.handleRequirement=function(t){e.setState({requirements:t.target.value})},e.handleURL=function(t){e.setState({pic_url:t.target.files[0]})},e.handleBadgeClassID=function(t){e.setState({badgeClassID:t.target.value})},e.handleSubmit=function(t){t.preventDefault();var n=Object(D.b)(),a=Object(D.c)(n,"img/"+e.state.pic_url.name),c=e.state.pic_url,s={contentType:e.state.pic_url.type};Object(D.d)(a,c,s),Object(D.a)(a).then((function(t){console.log("File available at",t);var n=document.getElementById("dropDown").value,a=parseInt(n),c={name:e.state.name,requirements:e.state.requirements,pic_url:t,badgeClassID:a};console.log("BADGEEEE"+JSON.stringify(c));var s=window.location.href.split("/")[3].slice(13);console.log(s),y.a.put("".concat("https://ades-ca1-project.herokuapp.com/api","/editBadge/").concat(s),c,{headers:{"content-type":"application/json"}}).then((function(e){console.log(e),console.log(e.data),window.location.replace("https://ades-ca1-project.herokuapp.com/quizment/badgesAdmin")}))}))},e}return Object(A.a)(n,[{key:"render",value:function(){return Object(x.jsx)("div",{id:"bodyEdit",children:Object(x.jsx)("div",{id:"divEdit",children:Object(x.jsxs)("div",{className:"editReward",children:[Object(x.jsx)("h1",{children:"Edit Badge"}),Object(x.jsxs)("form",{onSubmit:this.handleSubmit,id:"formEdit",children:[Object(x.jsxs)("label",{class:"label",children:["Badge Name:",Object(x.jsx)("input",{type:"text",name:"name",onChange:this.handleName})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("label",{class:"label",children:["Badge Requirement:",Object(x.jsx)("input",{type:"text",name:"requirements",onChange:this.handleRequirement})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("label",{class:"label",children:["Pic URL:",Object(x.jsx)("input",{type:"file",name:"pic_url",onChange:this.handleURL})]}),Object(x.jsx)("br",{}),Object(x.jsxs)("label",{children:["Badge Class ID:",Object(x.jsxs)("select",{name:"badgeClassID",onChange:this.handleBadgeClassID,id:"dropDown",children:[Object(x.jsx)("option",{value:"1",children:"Air"}),Object(x.jsx)("option",{value:"2",children:"Water"}),Object(x.jsx)("option",{value:"3",children:"Fire"}),Object(x.jsx)("option",{value:"4",children:"Geo"})]})]}),Object(x.jsx)("br",{}),Object(x.jsx)("button",{type:"submit",children:"Add"})]})]})})})}}]),n}(c.a.Component));n(77);var _=function(){var e=Object(a.useState)({}),t=Object(l.a)(e,2),n=(t[0],t[1]);return Object(p.c)(m,(function(e){try{n(e)}catch(c){var t=c.code,a=c.message;console.log(t),console.log(a)}})),Object(x.jsxs)(d.c,{children:[Object(x.jsx)(d.a,{path:"/",element:Object(x.jsx)(f,{})}),Object(x.jsx)(d.a,{path:"/studentDashboard",element:Object(x.jsx)(g,{})}),Object(x.jsx)(d.a,{path:"/teacherAdmin",element:Object(x.jsx)(C,{})}),Object(x.jsx)(d.a,{path:"/badgesAdmin",element:Object(x.jsx)(R,{})}),Object(x.jsx)(d.a,{path:"/rewardsAdmin",element:Object(x.jsx)(B,{})}),Object(x.jsx)(d.a,{path:"/uploadReward",element:Object(x.jsx)(q,{})}),Object(x.jsx)(d.a,{path:"/mazeAdmin",element:Object(x.jsx)(E,{})}),Object(x.jsx)(d.a,{path:"/EditMazeContent",element:Object(x.jsx)(L,{})}),Object(x.jsx)(d.a,{path:"/EditBadge",element:Object(x.jsx)(P,{})})]})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,79)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),s(e),i(e)}))};r.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(s.a,{basename:"/quizment",children:Object(x.jsx)(_,{})})}),document.getElementById("root")),z()}},[[78,1,2]]]);
//# sourceMappingURL=main.c5fbcab4.chunk.js.map