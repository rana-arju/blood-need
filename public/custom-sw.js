if(!self.define){let a,c={};const e=(e,s)=>(e=new URL(e+".js",s).href,c[e]||new Promise((c=>{if("document"in self){const a=document.createElement("script");a.src=e,a.onload=c,document.head.appendChild(a)}else a=e,importScripts(e),c()})).then((()=>{let a=c[e];if(!a)throw new Error(`Module ${e} didn’t register its module`);return a})));self.define=(s,i)=>{const n=a||("document"in self?document.currentScript.src:"")||location.href;if(c[n])return;let t={};const o=a=>e(a,n),r={module:{uri:n},exports:t,require:o};c[n]=Promise.all(s.map((a=>r[a]||o(a)))).then((a=>(i(...a),t)))}}define(["./workbox-f52fd911"],(function(a){"use strict";importScripts(),self.skipWaiting(),a.clientsClaim(),a.precacheAndRoute([{url:"/1.jpg",revision:"08110f6b6cacb1f691eea221800621d5"},{url:"/_next/app-build-manifest.json",revision:"e8f905fb55498f92f6054e59dd1f225a"},{url:"/_next/static/LXZcN-CMQwZJIkUO-1cga/_buildManifest.js",revision:"262b16fd5d0ec633d1a4a44e89ef915e"},{url:"/_next/static/LXZcN-CMQwZJIkUO-1cga/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1004-23742dbd9f0afc43.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/1181-540f403fe246ea63.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/1364-b9a284a7aca5c826.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/149-9c8ba195e8404e5a.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/1517-732665b49b8ef137.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/1621-75e24f312851ba6e.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/1866-06054d2f5f5fd73a.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/2039-d2d9ad99509f4182.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/2068-b18241271040ce0a.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/2358-73872365a42cdda0.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/2421-cc4317960335fc02.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/259-835aa9e6225eab7f.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/2615-b3b24519fbdd7a4f.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/2650-f39f7c26f10387af.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/3148-ec7c504437f281a0.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/3326-a499c21e4533c298.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/348-bdf46c4466a71022.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/3734-5202dd9769061a9c.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/3786-816ee4fbf259bfab.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/3818-dfc1f19145957581.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/3933-bb95c1aadf680c82.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/4010-c54238dd188c9a8d.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/4255-71c5d7bf6fd81153.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/4556-6a66fa54bdf2c3d8.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/4631-6f3df55be14e70de.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/476-27ca195cf6d7c7da.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/4bd1b696-cfedbfcc8ef8c3c3.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/5060-417b669b44a4b6f8.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/5155-2ce10cbdbbaa374a.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/5203.7c54c202406d4620.js",revision:"7c54c202406d4620"},{url:"/_next/static/chunks/5388-39c1a5a510f49cf2.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/5486-bae8474e77119211.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/5565-8843b6091fbacc90.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/5664-aab9323e74afabc9.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/6216-0ae4da3d3c456703.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/6218.ec4f3176909768d6.js",revision:"ec4f3176909768d6"},{url:"/_next/static/chunks/630-181670299bd22c29.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/6405-7dedb639f755cecd.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/6664-a353d70b09f41f6e.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/7266-19cfd9489734ec18.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/7748-8df39197b9d2a488.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8020-d726d61c6f476107.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8057-1defb4fd4ca5277f.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/814-e84e0b11474b7817.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8173-676e5628c33ab67b.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8194-e2041717185db462.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8249-48098b46de020bd0.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8303-5427a702970d0079.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8528-887fe5f8ccad68eb.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8888-935a12b393929dfe.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/8936-871a9d3ae7a0da98.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/9-1b315d618ebffae0.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/9049-4f36218d05888260.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/9895-f709d02a449db1ab.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-drives/loading-28716ba20ce38bbe.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-drives/page-8474d684b1713427.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/%5Bid%5D/loading-a75bfbeeed527a49.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/%5Bid%5D/page-0a97b6c31b726b0d.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/page-19fbf117cd877c8c.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/%5Bid%5D/loading-28e063bef3b06ba5.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/%5Bid%5D/page-1f35dfd997a902f8.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/page-b589cf6d64c30687.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/layout-219d429ac273a47c.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/page-eb5de1f8dcc26a27.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/reviews/page-b73ee389723772a9.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/%5Bid%5D/loading-dd5ec97bc4856eaa.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/%5Bid%5D/page-4fd41f202ebbadf6.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/page-0e97ffe2f6ef03af.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/volunteers/page-d772515a3ba31851.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/achievements/page-d6ebe95edf47259c.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/donations/page-09e3baa4c39c292a.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/health/page-0ade6a6375534ce8.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/layout-a322159a3801671a.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/page-cc37dd6cbee4b9b1.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/profile/page-4929ad09849d47f9.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/%5Bid%5D/donors/%5BuserId%5D/loading-cb1d114165f4670a.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/%5Bid%5D/donors/%5BuserId%5D/page-d54c5393126d2c5f.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/%5Bid%5D/loading-58ac9f8b456e1b16.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/%5Bid%5D/page-4ac009194daef292.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/page-704b15af289e699f.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/security/page-b3060dd3c67c9466.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/about/page-8a260a0915dd8b8b.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/awareness/page-735fdff3b399ac74.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/be-donor/page-e22de648b680a062.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/%5Bid%5D/page-42ae0c2505ba5b44.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/page-8cccee1ef4e0d5dd.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blood-type-compatibility/page-9a6d845e2f5af5b0.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/community-forum/page-5ebbdaaeccccdb9c.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/contact/page-9915ded324cde2fa.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donation-impact/page-21c395d5e36e5d3b.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donor-recipient-matching/page-db04fc468643a8e2.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/%5Bid%5D/page-d0455fe82af83601.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/page-94edc4c9eca99667.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/emergency-alerts/page-ad87bcd1efcfcf4f.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/faq/page-c234c763e5457cff.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/layout-7cb14488e1fbdbc6.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/blood-donation-101/page-9b855f49a63c6592.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/blood-types/page-febb129a54a5b981.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/preparation/page-2949729a9e24ba2e.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/notifications/page-151bfb1bcf7cde71.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/organize-blood-drive/page-92cc84b9d32d1ebf.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/page-7f95c5cf3b50bfb1.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/privacy/page-4c286689187287b3.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/quiz/page-5eae4af92af63fde.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/request-blood/page-2d19b7bd71536520.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/%5Bid%5D/page-90c3108a4e794973.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/page-bb8ea0c184dbda2c.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/reviews/page-f32dc07e916a90cd.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/virtual-test/page-98e2a895ac4b9859.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/why-give-blood/page-3e4f3da5e47c3bf8.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/error/page-42c226268026ba12.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signin/page-643d56628e8db3d2.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signout/page-f8cd0e8c2d0aaa74.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signup/page-5f4a29b0db4a8c1c.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/_not-found/page-178fe612cbf1074e.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-dc3e6619fb3d01f3.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/api/og/route-e14ef17efb9f720e.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/layout-34e0e7b2c5e1f58f.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/loading-605efca189099b13.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/not-found-943493c93ec62042.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/app/offline/page-2087a2136a2b6675.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/custom-sw.js",revision:"f750174d9a68a482b1c74db18b424160"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/main-2f530ef317d7ca65.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/main-app-374d285d2eb88114.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/pages/_app-c9ef09d97714d9a0.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/pages/_error-d9c69a98165df224.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-d8c42855cab2ae66.js",revision:"LXZcN-CMQwZJIkUO-1cga"},{url:"/_next/static/css/165a9b58c4cf713e.css",revision:"165a9b58c4cf713e"},{url:"/_next/static/css/3a0bcd6273583f83.css",revision:"3a0bcd6273583f83"},{url:"/_next/static/css/5d219fe4d2cffd66.css",revision:"5d219fe4d2cffd66"},{url:"/_next/static/css/d9bd173d7c6ae9cd.css",revision:"d9bd173d7c6ae9cd"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/412b56bcddc2e346-s.woff2",revision:"73af1a544044cac21a4833620c4578b3"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/910c9cf6ce5a9237-s.woff2",revision:"97e19455a64c3f9cbf4a2509c0f523f4"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/a45f4326d28270b6-s.woff2",revision:"8d30e4513323d03611ac90378fb8fd59"},{url:"/_next/static/media/af0f98f8abe3733a-s.p.woff2",revision:"2d532eb18fbd5243c6852bfeb09cea57"},{url:"/_next/static/media/cf83d9a9314ace15-s.woff2",revision:"3d3879f0c09a288c3d67bd4722bff6d7"},{url:"/_next/static/media/d6e71db82912037c-s.woff2",revision:"f7170eb8703c57b72d033ac9c3fedb82"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/f99d0f13e08eec38-s.woff2",revision:"4a391dd251f4fa0a4df1ae15ad0b09e1"},{url:"/icons/blood-donation (2).png",revision:"30a6f107963b5303e20d1ea27167049c"},{url:"/icons/blood-donation.png",revision:"1b335e5316353d8c3fda8177a832e213"},{url:"/icons/bloodneed.png",revision:"ee9f16e945cf4866cda050e3574b374d"},{url:"/icons/facebook.png",revision:"ceda85dc6354796fd08c69a2032d2b29"},{url:"/icons/google.png",revision:"937c87b4439809d5b17b82728df09639"},{url:"/icons/icon-144x144.png",revision:"48f2e6465b52ee140bbc7312729f9532"},{url:"/icons/icon-192x192.png",revision:"7eb1264b7e2c9255afd74f426078f943"},{url:"/icons/icon-512x512.png",revision:"de0655b5ad3143322a1290a7c173c2d0"},{url:"/leaflet/marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"/leaflet/marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"/leaflet/marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"/manifest.json",revision:"9d9750b23d3a8f16b48c93de309d7c1a"},{url:"/placeholder-logo.png",revision:"b7d4c7dd55cf683c956391f9c2ce3f5b"},{url:"/placeholder-logo.svg",revision:"1e16dc7df824652c5906a2ab44aef78c"},{url:"/placeholder-user.jpg",revision:"82c9573f1276f9683ba7d92d8a8c6edd"},{url:"/placeholder.jpg",revision:"887632fd67dd19a0d58abde79d8e2640"},{url:"/placeholder.svg",revision:"35707bd9960ba5281c72af927b79291f"},{url:"/profile.png",revision:"99843a5382fe3fee149c712b2ea1bc0e"},{url:"/screenshots/mobile.jpg",revision:"50bf2ac5cc6510ced2d3d226374e55a6"},{url:"/screenshots/screenshot1.png",revision:"e9d319f27b88f16e269621b84d4c4294"}],{ignoreURLParametersMatching:[]}),a.cleanupOutdatedCaches(),a.registerRoute("/",new a.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:a,response:c,event:e,state:s})=>c&&"opaqueredirect"===c.type?new Response(c.body,{status:200,statusText:"OK",headers:c.headers}):c}]}),"GET"),a.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new a.CacheFirst({cacheName:"google-fonts",plugins:[new a.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),a.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new a.CacheFirst({cacheName:"static-font-assets",plugins:[new a.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),a.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i,new a.CacheFirst({cacheName:"static-image-assets",plugins:[new a.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),a.registerRoute(/\/_next\/image\?url=.+$/i,new a.CacheFirst({cacheName:"next-image",plugins:[new a.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\.(?:js)$/i,new a.CacheFirst({cacheName:"static-js-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\.(?:css)$/i,new a.CacheFirst({cacheName:"static-style-assets",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new a.NetworkFirst({cacheName:"next-data",plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/\/api\/.*$/i,new a.NetworkFirst({cacheName:"api-cache",networkTimeoutSeconds:10,plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),a.registerRoute(/.*/i,new a.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new a.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET")}));
