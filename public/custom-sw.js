if(!self.define){let e,a={};const s=(s,t)=>(s=new URL(s+".js",t).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let c={};const o=e=>s(e,n),r={module:{uri:n},exports:c,require:o};a[n]=Promise.all(t.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1.jpg",revision:"08110f6b6cacb1f691eea221800621d5"},{url:"/_next/app-build-manifest.json",revision:"d1491f18fed45bae1e13efade4cbbd6f"},{url:"/_next/static/JvyNxWcKftURPZiqnV0ko/_buildManifest.js",revision:"f5d953435ea0eb31b091c746a6c0cff7"},{url:"/_next/static/JvyNxWcKftURPZiqnV0ko/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1162-d507592c6ff846c3.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/1181-540f403fe246ea63.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/1517-a911761471608c36.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/1720-dd5e1de1cce5c95a.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/2255-d03a5f33bdd1c956.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/2567-270ee2678ea6a454.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/2615-b3b24519fbdd7a4f.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/3345-6dace5eb05dd1f13.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/3499-383b562b874c5394.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/4335-0bf4d673053d6ba8.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/4455.0d45f6e406c645ed.js",revision:"0d45f6e406c645ed"},{url:"/_next/static/chunks/4bd1b696-cfedbfcc8ef8c3c3.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/5203.7c54c202406d4620.js",revision:"7c54c202406d4620"},{url:"/_next/static/chunks/5385-9fd736fd6803f4f9.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/5547-e555fff358edf1c5.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/5927-6b6562b5bd61c6b9.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/6218.ec4f3176909768d6.js",revision:"ec4f3176909768d6"},{url:"/_next/static/chunks/6373-6e270dd077e4b70c.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/7138-b039fccb4b960955.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/7518-dd5a7a50d3214aa4.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/7965-1aaecf78455b8fc7.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/814-2656785e915459db.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/8173-297bb60690d4c74b.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/8209-868cf1cea8e88453.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/8e1d74a4-18185e8c2ad41df9.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/9049-136e508923ed1b75.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/9094-fab8278812a20a37.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/9813-7f3bc33768768706.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/9895-f709d02a449db1ab.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/9996-ba5a7a3baaaa54d5.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-drives/page-36b1f303ce5920e8.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/page-621bba1bdfbd0c54.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/page-0a2461833aba1001.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/layout-965931b49a775e64.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/page-1295bd095c839e84.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/reviews/page-aeaf3dd8cea636ff.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/page-6f19a14cd511a818.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/volunteers/page-ea42102df099008f.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/achievements/page-cdff9ffba08a15ba.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/donations/page-c8596854221ad7ea.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/health/page-80173ae1eb07978a.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/layout-5b681c1570bd70a1.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/page-6727d223841f2b8a.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/profile/page-2893096b6b734da5.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/page-453687f544b9f687.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/security/page-216b45eb19801bb3.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/about/page-720ac81ac387573e.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/awareness/page-8360809d8c4f776e.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/be-donor/page-ae8086442166353b.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/%5Bslug%5D/page-59efa52e746d5e82.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/page-4ca3049dc29313f7.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blood-type-compatibility/page-9644893a31529bef.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/community-forum/page-077c1543b9e3ac28.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/contact/page-00dba751cf68fad6.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donor-recipient-matching/page-1507fb65b7fd26a0.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/%5Bid%5D/page-08c9cf692dc25e38.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/page-58fe1f87ba2889ee.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/emergency-alerts/page-4dd29b56ae010991.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/faq/page-3dd6f50fef6de18c.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/impact/page-f32d9759ee05a874.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/layout-c606cefd1219b35e.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/loading-b0d8aa0e700170f9.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/notifications/page-ddbe2847dca868e2.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/organize-blood-drive/page-af3ffe19bbce04f1.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/page-9ff16141b468acb8.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/privacy/page-1cc7637b85e692a6.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/request-blood/page-089ce38337b02d1b.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/%5Bid%5D/page-48161f71eece2419.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/page-660ff157de59cb40.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/virtual-blood-type-test/page-12583eaf5250834d.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/error/page-051dae179ea1d4e1.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signin/page-0b4d73a8e7b545d4.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signup/page-fb51d0450b20c764.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/_not-found/page-6288100d1754a519.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-d83528b9023d956d.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/api/og/route-91d067c8ad28d83b.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/layout-916a97fc21ff625c.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/loading-6337fbabcdc7d349.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/not-found-bca212847512155c.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/app/offline/page-10823a4fe8f04ebc.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/d0deef33.3ebdc394fa4975d2.js",revision:"3ebdc394fa4975d2"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/main-310950f40db7dc07.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/main-app-13f1d86c6b8a34e6.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/pages/_app-c9ef09d97714d9a0.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/pages/_error-34df4b788d70a0b4.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-0772978b338e0052.js",revision:"JvyNxWcKftURPZiqnV0ko"},{url:"/_next/static/css/1cec5f04484c35d1.css",revision:"1cec5f04484c35d1"},{url:"/_next/static/css/3a0bcd6273583f83.css",revision:"3a0bcd6273583f83"},{url:"/_next/static/css/7e580916d69f801c.css",revision:"7e580916d69f801c"},{url:"/_next/static/css/857aa62baa17c894.css",revision:"857aa62baa17c894"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/412b56bcddc2e346-s.woff2",revision:"73af1a544044cac21a4833620c4578b3"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/910c9cf6ce5a9237-s.woff2",revision:"97e19455a64c3f9cbf4a2509c0f523f4"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/a45f4326d28270b6-s.woff2",revision:"8d30e4513323d03611ac90378fb8fd59"},{url:"/_next/static/media/af0f98f8abe3733a-s.p.woff2",revision:"2d532eb18fbd5243c6852bfeb09cea57"},{url:"/_next/static/media/cf83d9a9314ace15-s.woff2",revision:"3d3879f0c09a288c3d67bd4722bff6d7"},{url:"/_next/static/media/d6e71db82912037c-s.woff2",revision:"f7170eb8703c57b72d033ac9c3fedb82"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/f99d0f13e08eec38-s.woff2",revision:"4a391dd251f4fa0a4df1ae15ad0b09e1"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/icons/icon-144x144.png",revision:"48f2e6465b52ee140bbc7312729f9532"},{url:"/icons/icon-192x192.png",revision:"7eb1264b7e2c9255afd74f426078f943"},{url:"/icons/icon-512x512.png",revision:"de0655b5ad3143322a1290a7c173c2d0"},{url:"/leaflet/marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"/leaflet/marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"/leaflet/marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"/manifest.json",revision:"9d9750b23d3a8f16b48c93de309d7c1a"},{url:"/placeholder-logo.png",revision:"b7d4c7dd55cf683c956391f9c2ce3f5b"},{url:"/placeholder-logo.svg",revision:"1e16dc7df824652c5906a2ab44aef78c"},{url:"/placeholder-user.jpg",revision:"82c9573f1276f9683ba7d92d8a8c6edd"},{url:"/placeholder.jpg",revision:"887632fd67dd19a0d58abde79d8e2640"},{url:"/placeholder.svg",revision:"35707bd9960ba5281c72af927b79291f"},{url:"/profile.png",revision:"99843a5382fe3fee149c712b2ea1bc0e"},{url:"/screenshots/mobile.jpg",revision:"50bf2ac5cc6510ced2d3d226374e55a6"},{url:"/screenshots/screenshot1.png",revision:"e9d319f27b88f16e269621b84d4c4294"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:t})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
