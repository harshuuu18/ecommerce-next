(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[260],{6384:function(r,e,n){"use strict";n.d(e,{Z:function(){return i}});var s=n(3812),a=n(5893);function i(r){var e=r.data;return(0,a.jsxs)("div",{className:"CarouselDiv",children:[(0,a.jsxs)("h2",{children:[(0,a.jsx)("img",{src:"/flash512r.png",alt:"",width:"32px"}),"  ","Flash Deals"]}),(0,a.jsx)("div",{className:"actualCarousel",children:e?e.map((function(r,e){var n=r.name,i=r.price,c=r.url,t=(r._id,r.mediaUrl);return(0,a.jsx)(s.Z,{name:n,price:i,src:t,url:"/product/".concat(c)},e)})):""})]})}},3812:function(r,e,n){"use strict";n.d(e,{Z:function(){return i}});var s=n(1664),a=n(5893);function i(r){var e=r.name,n=r.price,i=r.url,c=r.src;return(0,a.jsxs)("div",{className:"product",children:[(0,a.jsx)(s.default,{href:i||"/",children:(0,a.jsxs)("a",{children:[(0,a.jsx)("div",{className:"PrImgCover",children:(0,a.jsx)("img",{src:c||"https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-1.png&w=1920&q=75",alt:""})}),(0,a.jsxs)("h4",{children:[" ",e," "]}),(0,a.jsxs)("section",{className:"price-tag",children:["\u20b9 ",n," "]})]})}),(0,a.jsx)("div",{className:"sale-bookmark",children:(0,a.jsx)("p",{children:"25% Off"})})]})}},9099:function(r,e,n){"use strict";function s(r){var e=r._id,n=r.name,s=r.url,a=r.mediaUrl,i=r.price,c=r.vendor;if(localStorage.getItem("items")){var t=JSON.parse(localStorage.getItem("items")),d=t.find((function(r){return r._id===e}));if(d){var l=t.indexOf(d),u=t[l].quantity;t[l].quantity=u+1}else t.push({_id:e,name:n,url:s,mediaUrl:a,price:i,vendor:c,quantity:1});localStorage.setItem("items",JSON.stringify(t))}}n.d(e,{Z:function(){return s}})},3554:function(r,e,n){"use strict";n.r(e),n.d(e,{__N_SSP:function(){return l},default:function(){return u}});var s=n(1163),a=n(282),i=n(6384),c=n(9099),t=n(7294),d=n(5893),l=!0;function u(r){var e=r.data,n=((0,s.useRouter)().query.pid,e._id),l=e.name,u=e.url,o=e.mediaUrl,h=e.price,x=e.brand,m=e.vendor,j=e.description,f=(0,t.useState)(o[0]),p=f[0],v=f[1];return(0,d.jsxs)(d.Fragment,{children:[o?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"detailPage",children:[(0,d.jsxs)("div",{className:"detailPageLeft",children:[(0,d.jsx)("img",{src:p||o[0],width:"300px",alt:""}),(0,d.jsx)("div",{className:"ProductImageS",children:o?o.map((function(r,e){return(0,d.jsx)("span",{style:{backgroundImage:"url(".concat(r,")"),borderColor:"".concat(p==r?"#f94144":"")},onClick:function(){return v(r)}},e)})):""})]}),(0,d.jsxs)("div",{className:"detailPageRight",children:[(0,d.jsx)("h2",{children:l}),(0,d.jsx)("br",{}),(0,d.jsxs)("span",{children:["Brand: ",(0,d.jsx)("h4",{children:x})]}),(0,d.jsx)("br",{}),(0,d.jsxs)("span",{children:["Vendor: ",(0,d.jsx)("h4",{children:m})]}),(0,d.jsx)("br",{}),(0,d.jsxs)("span",{className:"priceTag",children:["$",h," "]}),(0,d.jsx)("br",{}),(0,d.jsx)("span",{children:"Stock Available"}),(0,d.jsx)("br",{}),(0,d.jsx)(a.Z,{className:"AddToCartBtn",onClick:function(){return(0,c.Z)({_id:n,name:l,url:u,mediaUrl:o[0],price:h,vendor:m})},children:"Add to Cart"})]})]}),(0,d.jsxs)("div",{className:"DetailPage2",children:[(0,d.jsx)("br",{}),(0,d.jsx)("span",{children:"Specification:"}),(0,d.jsx)("p",{children:j})]})]}):(0,d.jsx)("h1",{children:"Product not found"}),(0,d.jsx)("br",{}),(0,d.jsx)(i.Z,{})]})}},3295:function(r,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/product/[pid]",function(){return n(3554)}])}},function(r){r.O(0,[774,888,179],(function(){return e=3295,r(r.s=e);var e}));var e=r.O();_N_E=e}]);