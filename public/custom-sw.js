if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),o={module:{uri:n},exports:t,require:r};s[n]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1.jpg",revision:"08110f6b6cacb1f691eea221800621d5"},{url:"/_next/app-build-manifest.json",revision:"f61c129f4a1f6b5ff40155e8e0b219db"},{url:"/_next/static/BqjYFWTzxPseRiz4VqlrZ/_buildManifest.js",revision:"64978b72903ce8c0cc6dbbdb4b75e840"},{url:"/_next/static/BqjYFWTzxPseRiz4VqlrZ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1181-540f403fe246ea63.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/1517-a911761471608c36.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/1866-06054d2f5f5fd73a.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/1888-a797eeb2c0006e91.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/1909-2eea344ae00ded19.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/1985-5fc8922efa5fccaf.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/2421-c11fe2d03f5ae13a.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/259-21e8e3e8dce21729.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/2615-b3b24519fbdd7a4f.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/2711-f45de8dde662b28f.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/2876-f8f4ff2ed4b0af67.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/348-bdf46c4466a71022.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/3480-afcc8e4dbff14518.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/3499-3d1818cc091d9b76.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/3560-21894682f543fe10.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/4010-08501a06c622445d.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/4228-5986327098d34d38.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/4bd1b696-cfedbfcc8ef8c3c3.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/5203.7c54c202406d4620.js",revision:"7c54c202406d4620"},{url:"/_next/static/chunks/5547-86d28524648bdb6a.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/5565-43aa4c44a3c28980.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/5745-129cbf58febc8b82.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/6218.ec4f3176909768d6.js",revision:"ec4f3176909768d6"},{url:"/_next/static/chunks/6759-d01591bc827574e0.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/6777-f88d50eedc6f45c6.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/7227-4c9c80c3865fc31f.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/7266-9c2bbc4ff3708fde.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/7369-0b0705a8ec46c986.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/7464-17414ef36d2d3411.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/7518-dd5a7a50d3214aa4.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/7627-aee6ef6aa4e1d8be.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/7936-9132aa15478727d9.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/814-2656785e915459db.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/8141-088005484af59918.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/8173-297bb60690d4c74b.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/8629-b414fe4b1f9c85c1.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/8888-1136388862d173a2.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/9267-b859f4e111376c10.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/9895-f709d02a449db1ab.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-drives/page-bcc33413cbdd8506.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/page-656339f64b357ddc.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/page-349eb44355d59ac6.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/layout-6219a678341dba94.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/page-02b1d9d8f5e30e95.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/reviews/page-3543e0280d4f714d.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/page-25ccc3ca11853e50.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/volunteers/page-aa293e74c8fe6dd4.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/achievements/page-1abb907a05f3b7bb.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/donations/page-e75e712d15793185.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/health/page-0746a0e9fd106d7d.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/layout-2133142b408b5545.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/page-356d977b9ec1bd62.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/profile/page-59982072db2620bd.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/page-c036777cc4816333.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/security/page-e54d662afb4b3470.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/about/page-75f5be5bf42c117b.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/awareness/page-62994a9ceb39ddca.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/be-donor/page-6317c53f6235cbd0.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/%5Bid%5D/page-cc90033b15350fc6.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/page-dcd824ba1b470cfc.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blood-type-compatibility/page-205697e003f69226.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/community-forum/page-7c623e90045b9994.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/contact/page-ffde47f0558538cb.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donation-impact/page-408e6b6f85e0703b.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donor-recipient-matching/page-4c2c3f620ce46082.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/%5Bid%5D/page-ed554c20c924c9f5.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/page-b89b7d812fe0e295.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/emergency-alerts/page-ad87bcd1efcfcf4f.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/faq/page-a9617310756db0b0.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/layout-b0991231855b3dce.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/blood-donation-101/page-c46df24bd2239382.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/blood-types/page-9e2fd26bc5fa0e63.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/preparation/page-499f34e347cd1aae.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/notifications/page-3609ad3cdb8da5bc.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/organize-blood-drive/page-25c187d57f58a98c.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/page-6cac6b51bc6aadea.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/privacy/page-6e58c2c766420ebf.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/quiz/page-43c4866dbb41a57b.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/request-blood/page-758b6bf24355445f.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/%5Bid%5D/page-1c9475cbc710577e.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/page-a2c993891124101b.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/virtual-test/page-9272a3c4ae3656c7.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/why-give-blood/page-cea9cac869e26ba4.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/error/page-981f0086b34b7ad1.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signin/page-76ccef2a14f492ac.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signout/page-f8cd0e8c2d0aaa74.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signup/page-d8343cf4a9d0e110.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/_not-found/page-6288100d1754a519.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-d83528b9023d956d.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/api/og/route-e14ef17efb9f720e.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/layout-c987f75c04a9d53f.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/loading-20b68eb902d8fc3d.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/not-found-943493c93ec62042.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/app/offline/page-de8701a7ce643acf.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/main-a1c78f8eb08083fd.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/main-app-374d285d2eb88114.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/pages/_app-c9ef09d97714d9a0.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/pages/_error-34df4b788d70a0b4.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-e7b5b2200559fea4.js",revision:"BqjYFWTzxPseRiz4VqlrZ"},{url:"/_next/static/css/1cec5f04484c35d1.css",revision:"1cec5f04484c35d1"},{url:"/_next/static/css/3a0bcd6273583f83.css",revision:"3a0bcd6273583f83"},{url:"/_next/static/css/b3cbcd051438d1d5.css",revision:"b3cbcd051438d1d5"},{url:"/_next/static/css/eafce996f3ba5c07.css",revision:"eafce996f3ba5c07"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/412b56bcddc2e346-s.woff2",revision:"73af1a544044cac21a4833620c4578b3"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/910c9cf6ce5a9237-s.woff2",revision:"97e19455a64c3f9cbf4a2509c0f523f4"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/a45f4326d28270b6-s.woff2",revision:"8d30e4513323d03611ac90378fb8fd59"},{url:"/_next/static/media/af0f98f8abe3733a-s.p.woff2",revision:"2d532eb18fbd5243c6852bfeb09cea57"},{url:"/_next/static/media/cf83d9a9314ace15-s.woff2",revision:"3d3879f0c09a288c3d67bd4722bff6d7"},{url:"/_next/static/media/d6e71db82912037c-s.woff2",revision:"f7170eb8703c57b72d033ac9c3fedb82"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/f99d0f13e08eec38-s.woff2",revision:"4a391dd251f4fa0a4df1ae15ad0b09e1"},{url:"/icons/blood-donation (2).png",revision:"30a6f107963b5303e20d1ea27167049c"},{url:"/icons/blood-donation.png",revision:"1b335e5316353d8c3fda8177a832e213"},{url:"/icons/bloodneed.png",revision:"ee9f16e945cf4866cda050e3574b374d"},{url:"/icons/facebook.png",revision:"ceda85dc6354796fd08c69a2032d2b29"},{url:"/icons/google.png",revision:"937c87b4439809d5b17b82728df09639"},{url:"/icons/icon-144x144.png",revision:"48f2e6465b52ee140bbc7312729f9532"},{url:"/icons/icon-192x192.png",revision:"7eb1264b7e2c9255afd74f426078f943"},{url:"/icons/icon-512x512.png",revision:"de0655b5ad3143322a1290a7c173c2d0"},{url:"/leaflet/marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"/leaflet/marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"/leaflet/marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"/manifest.json",revision:"9d9750b23d3a8f16b48c93de309d7c1a"},{url:"/placeholder-logo.png",revision:"b7d4c7dd55cf683c956391f9c2ce3f5b"},{url:"/placeholder-logo.svg",revision:"1e16dc7df824652c5906a2ab44aef78c"},{url:"/placeholder-user.jpg",revision:"82c9573f1276f9683ba7d92d8a8c6edd"},{url:"/placeholder.jpg",revision:"887632fd67dd19a0d58abde79d8e2640"},{url:"/placeholder.svg",revision:"35707bd9960ba5281c72af927b79291f"},{url:"/profile.png",revision:"99843a5382fe3fee149c712b2ea1bc0e"},{url:"/screenshots/mobile.jpg",revision:"50bf2ac5cc6510ced2d3d226374e55a6"},{url:"/screenshots/screenshot1.png",revision:"e9d319f27b88f16e269621b84d4c4294"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
