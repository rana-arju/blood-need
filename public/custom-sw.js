if(!self.define){let e,a={};const s=(s,t)=>(s=new URL(s+".js",t).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let c={};const o=e=>s(e,n),r={module:{uri:n},exports:c,require:o};a[n]=Promise.all(t.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1.jpg",revision:"08110f6b6cacb1f691eea221800621d5"},{url:"/_next/app-build-manifest.json",revision:"d636efb18db76d730c470d3f495db100"},{url:"/_next/static/chunks/1004-6fd57cf29d7a3077.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/1181-540f403fe246ea63.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/1517-a911761471608c36.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/1856-22f6ab56743e8a0e.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/1866-06054d2f5f5fd73a.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/1888-a797eeb2c0006e91.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/1964-e4536dc8af5af6ba.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/2324-505a20bf5e83e767.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/2421-297b2936d091a981.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/2615-b3b24519fbdd7a4f.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/2650-f39f7c26f10387af.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/348-bdf46c4466a71022.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/3480-afcc8e4dbff14518.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/4010-c54238dd188c9a8d.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/4062-67b3b6d68be92697.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/4169-0f1b2027f4db9dcb.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/4255-4626a89ff2b305b2.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/4bd1b696-cfedbfcc8ef8c3c3.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/5184-043a733347a813fc.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/5203.7c54c202406d4620.js",revision:"7c54c202406d4620"},{url:"/_next/static/chunks/5390-6be827ffb82b6d9b.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/5421-45dcb35ca749a9a2.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/5547-86d28524648bdb6a.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/5565-43aa4c44a3c28980.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/6218.ec4f3176909768d6.js",revision:"ec4f3176909768d6"},{url:"/_next/static/chunks/6664-a353d70b09f41f6e.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/6777-f88d50eedc6f45c6.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/683-09f93d8844bf1cd0.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/7266-19cfd9489734ec18.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/7336-24b19c6af1a67ed4.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/7369-0b0705a8ec46c986.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/7518-dd5a7a50d3214aa4.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/7520-a246c9c7ffdc5486.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/7834-2843f607e7a6720d.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/8020-d726d61c6f476107.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/8050-5b71e53345f3e613.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/8057-1defb4fd4ca5277f.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/814-2656785e915459db.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/8173-297bb60690d4c74b.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/8401-3c541164b3667002.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/8888-1136388862d173a2.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/9892-90ba5b6ca4657ba3.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/9895-f709d02a449db1ab.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-drives/page-bcc33413cbdd8506.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/page-aeba2027dba5336a.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/page-58787d6b4ac1db93.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/layout-d50e81f59df9141d.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/page-dcbc55f4d73d742d.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/reviews/page-88bf56eb735eb433.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/%5Bid%5D/loading-2e2201e4d1347189.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/%5Bid%5D/page-db76b2e5e3b17665.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/page-19ac9d4194ac09fb.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/volunteers/page-d9906866b497470f.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/achievements/page-7431b979a7734c1c.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/donations/page-d8692d27251cae69.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/health/page-2b0ea341aaa27956.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/layout-1ec2229a7a75955e.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/page-eb44568dcb375f37.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/profile/page-e2c25980ce88fa94.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/page-89abca242b02bbd1.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/security/page-e54d662afb4b3470.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/about/page-a822214e62de70ed.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/awareness/page-1c6eb25cec25b51b.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/be-donor/page-57939cddc0c2ef14.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/%5Bid%5D/page-a10d46f1e523b023.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/page-820b62c7dda0015e.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blood-type-compatibility/page-022519e172961254.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/community-forum/page-64fbcfba168e91db.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/contact/page-ffde47f0558538cb.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donation-impact/page-3b22bd53a54df2e1.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donor-recipient-matching/page-7a9aa56890f62834.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/%5Bid%5D/page-00dd7d39368680e4.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/page-0b859629712e04be.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/emergency-alerts/page-ad87bcd1efcfcf4f.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/faq/page-9d3f42d9bd801616.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/layout-c56f6dd525627aed.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/blood-donation-101/page-1944cc91e4852f26.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/blood-types/page-a234a7687dd2e66e.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/preparation/page-44d884f8f96af0c8.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/notifications/page-e87b53aba6a3ee89.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/organize-blood-drive/page-7ffd5a5404f725ee.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/page-f2e9dedcc906a9fa.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/privacy/page-ade842b7448d257a.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/quiz/page-bb286abb11628f0c.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/request-blood/page-daaf58edf5ab7e16.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/%5Bid%5D/page-3fa988f7b138aaa7.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/page-cfa57dd626aebc65.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/reviews/page-2b918a22804e6088.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/virtual-test/page-772093bb24141a8f.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/why-give-blood/page-dd389ea8ca9f38a2.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/error/page-981f0086b34b7ad1.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signin/page-76ccef2a14f492ac.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signout/page-f8cd0e8c2d0aaa74.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signup/page-d8343cf4a9d0e110.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/_not-found/page-597df718e667d510.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-23f3e13d727d80c2.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/api/og/route-e14ef17efb9f720e.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/layout-ee34d748aecbc00f.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/loading-20b68eb902d8fc3d.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/not-found-943493c93ec62042.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/app/offline/page-96f7123212966fae.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/main-a1c78f8eb08083fd.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/main-app-374d285d2eb88114.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/pages/_app-c9ef09d97714d9a0.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/pages/_error-34df4b788d70a0b4.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-f7b332b6cdb09714.js",revision:"hv1gAMP8WpK9Gmtm_L790"},{url:"/_next/static/css/3a0bcd6273583f83.css",revision:"3a0bcd6273583f83"},{url:"/_next/static/css/5d219fe4d2cffd66.css",revision:"5d219fe4d2cffd66"},{url:"/_next/static/css/b3cbcd051438d1d5.css",revision:"b3cbcd051438d1d5"},{url:"/_next/static/css/dd34c7bbef528b9c.css",revision:"dd34c7bbef528b9c"},{url:"/_next/static/hv1gAMP8WpK9Gmtm_L790/_buildManifest.js",revision:"64978b72903ce8c0cc6dbbdb4b75e840"},{url:"/_next/static/hv1gAMP8WpK9Gmtm_L790/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/412b56bcddc2e346-s.woff2",revision:"73af1a544044cac21a4833620c4578b3"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/910c9cf6ce5a9237-s.woff2",revision:"97e19455a64c3f9cbf4a2509c0f523f4"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/a45f4326d28270b6-s.woff2",revision:"8d30e4513323d03611ac90378fb8fd59"},{url:"/_next/static/media/af0f98f8abe3733a-s.p.woff2",revision:"2d532eb18fbd5243c6852bfeb09cea57"},{url:"/_next/static/media/cf83d9a9314ace15-s.woff2",revision:"3d3879f0c09a288c3d67bd4722bff6d7"},{url:"/_next/static/media/d6e71db82912037c-s.woff2",revision:"f7170eb8703c57b72d033ac9c3fedb82"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/f99d0f13e08eec38-s.woff2",revision:"4a391dd251f4fa0a4df1ae15ad0b09e1"},{url:"/icons/blood-donation (2).png",revision:"30a6f107963b5303e20d1ea27167049c"},{url:"/icons/blood-donation.png",revision:"1b335e5316353d8c3fda8177a832e213"},{url:"/icons/bloodneed.png",revision:"ee9f16e945cf4866cda050e3574b374d"},{url:"/icons/facebook.png",revision:"ceda85dc6354796fd08c69a2032d2b29"},{url:"/icons/google.png",revision:"937c87b4439809d5b17b82728df09639"},{url:"/icons/icon-144x144.png",revision:"48f2e6465b52ee140bbc7312729f9532"},{url:"/icons/icon-192x192.png",revision:"7eb1264b7e2c9255afd74f426078f943"},{url:"/icons/icon-512x512.png",revision:"de0655b5ad3143322a1290a7c173c2d0"},{url:"/leaflet/marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"/leaflet/marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"/leaflet/marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"/manifest.json",revision:"9d9750b23d3a8f16b48c93de309d7c1a"},{url:"/placeholder-logo.png",revision:"b7d4c7dd55cf683c956391f9c2ce3f5b"},{url:"/placeholder-logo.svg",revision:"1e16dc7df824652c5906a2ab44aef78c"},{url:"/placeholder-user.jpg",revision:"82c9573f1276f9683ba7d92d8a8c6edd"},{url:"/placeholder.jpg",revision:"887632fd67dd19a0d58abde79d8e2640"},{url:"/placeholder.svg",revision:"35707bd9960ba5281c72af927b79291f"},{url:"/profile.png",revision:"99843a5382fe3fee149c712b2ea1bc0e"},{url:"/screenshots/mobile.jpg",revision:"50bf2ac5cc6510ced2d3d226374e55a6"},{url:"/screenshots/screenshot1.png",revision:"e9d319f27b88f16e269621b84d4c4294"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:t})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
