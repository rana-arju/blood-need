if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(a[i])return;let n={};const d=e=>s(e,i),r={module:{uri:i},exports:n,require:d};a[i]=Promise.all(c.map((e=>r[e]||d(e)))).then((e=>(t(...e),n)))}}define(["./workbox-f52fd911"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1.jpg",revision:"08110f6b6cacb1f691eea221800621d5"},{url:"/_next/app-build-manifest.json",revision:"5b9a7c4d7623e7cfa638e65df5326e86"},{url:"/_next/static/chunks/1004-f6c58d725958f9cd.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/1046-d5a7b14b76d0568f.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/1181-540f403fe246ea63.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/1364-2ddca1852251655f.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/13b76428-250fb8d199f8d754.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/149-0e74863c4de6f54c.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/1516-b21f3a8992b323b2.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/1517-8a087bc6e27362e8.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/1621-75e24f312851ba6e.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/2039-5243f3904b434f50.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/2056-e1c023931ad68013.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/2068-35a99a2468557e2a.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/2421-42e269e29b3ec738.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/259-61beed2d5a02b759.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/2615-a3c524eac9f9d18e.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/2650-46cfb763413ad01c.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/293-435506341b2219bb.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/2977-852b64e272877996.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/3148-713539cad3e39538.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/3149-f38cfb5dabc51b38.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/3326-304f3aa49330db8c.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/3446-a1de1a9ce0be1155.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/348-759344d30d941c0a.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/3734-87c4ffd995d9a5ff.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/3786-b2125b3e0f3f6070.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/4010-3fcec14a7830166f.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/4255-93a42e35bbf7f0d9.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/4375-1a8a27e5397ca1e9.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/443-b93f4f78b8033a9f.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/4556-c96a597e1fa3234d.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/4631-156b9d453e5c1cdd.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/476-2b33e706bcd77d53.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/4986-a019e866fc2225ea.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/4bd1b696-82d2d9beb1e052cb.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/5060-d86514c890343fe3.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/5203.7c54c202406d4620.js",revision:"7c54c202406d4620"},{url:"/_next/static/chunks/522-934018dfb50d3744.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/5314-9109f0625bab3728.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/5388-caee3a1c5ef91c8b.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/5486-836d9c7c58a83d70.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/5565-05378c747499ed5a.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/5664-3ceaef4884be4182.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/574-fa81a26620f4a8b4.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/5927-4254325efaca0f7d.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/6218.ec4f3176909768d6.js",revision:"ec4f3176909768d6"},{url:"/_next/static/chunks/630-21dbb01042e346c2.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/6405-3fcf1f1bbe726f31.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/6664-9e1ce8580c69faed.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/6943-ebd350293dd0950c.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/7012-a83102100c49fa47.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/7266-955048c684c22ad8.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/7356-ae1acf5958148c94.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/7748-3090a652de7c867f.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/8020-d47041d7eb68bdea.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/8057-3f8d170ed270aae3.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/814-5940e6fe5de3d764.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/8173-a5353fbafe1179f7.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/8303-c5189af4fc8c278d.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/8528-e5b5b3cca8b4e91c.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/8888-226f3dc420d73cb9.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/8936-49afeb3464352ccd.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/9-b890e0694093e3f3.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/9049-c33fc593814fed98.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/9895-1bd750f3d7c00633.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blogs/edit/%5Bid%5D/page-4efbf71e94579cc3.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blogs/new/page-a3953b47e83dbafe.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blogs/page-5ed053876c51333d.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blogs/preview/%5Bid%5D/page-1c940fd7679113c7.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-drives/loading-437ee153978fcd95.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-drives/page-510137e783e5b6e4.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/%5Bid%5D/loading-d32e94028e34a932.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/%5Bid%5D/page-a54474e9c645e2b8.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/blood-requests/page-4b23459510f751b7.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/%5Bid%5D/loading-d89f0cc2b6595ee9.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/%5Bid%5D/page-84a4b3cff3a95097.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/donors/page-2a76f76657cc336d.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/layout-3a31f179349da46a.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/page-2489eb369df79aa7.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/reviews/page-65b6fd4e42bfab8d.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/%5Bid%5D/loading-0561890ff8d99793.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/%5Bid%5D/page-6034efdfe0a227eb.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/users/page-375990e0296e7903.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(adminDashboardLayout)/admin/volunteers/page-8e21a18f56abb3ab.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/achievements/page-57f2a6b5b664121c.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/donations/page-9ce0febd5bb56d70.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/health/page-46900ebd80b91ae9.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/layout-1087c1d184737f40.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/page-56665b228313ea6a.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/profile/page-a26bc563801781b4.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/%5Bid%5D/donors/%5BuserId%5D/loading-07a2a13b6221810d.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/%5Bid%5D/donors/%5BuserId%5D/page-b5127c4e071c7db0.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/%5Bid%5D/loading-cee6f94316e124d4.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/%5Bid%5D/page-2040b98889463626.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/requests/page-a225d4d95a88e391.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(userDashboardLayout)/dashboard/security/page-ecc9222d2476fe96.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/about/page-306fa6ac887e0f1e.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/awareness/page-5141690233022290.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/be-donor/page-95fcda5b75a9b4f4.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/%5Bid%5D/page-2bc0c5d92ff66a98.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blog/page-0f9b2bae26e50911.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/blood-type-compatibility/page-228b7361061d9299.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/community-forum/page-b59b4fde5f5df5a4.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/contact/page-6d98aa63cb61f6eb.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donation-impact/page-2da0cfd0982a5fd2.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donor-recipient-matching/page-77b83fb06a3976ed.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/%5Bid%5D/page-63bf838a06967d75.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/donors/page-0b787c043310aebe.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/emergency-alerts/page-7dbee4542c34c576.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/faq/page-39acd4736f28d593.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/layout-0ab756e032aa63d5.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/blood-donation-101/page-f7285620ca1ae59b.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/blood-types/page-c0e22583ab75240d.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/learn/preparation/page-f81c312a7c07b83a.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/notifications/loading-19c650430e43960b.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/notifications/page-dffc3659394660b1.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/organize-blood-drive/page-d9e02acda0507d22.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/page-ee1ce2de2ff4ac86.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/privacy/page-daad15cc75527be7.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/quiz/page-fc3bcb02818defde.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/request-blood/page-3548ab24fdb62254.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/%5Bid%5D/page-10d3f0a68ccbd172.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/requests/page-4016829a6af3b366.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/reviews/page-220533c2f7d7a3f5.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/virtual-test/page-c01b09aa1bcfff65.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/(withCommonLayout)/why-give-blood/page-3d3fd10a7d2f89d6.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/error/page-d6892b231b00a8b8.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signin/page-edd2fb8e382b01ed.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signout/page-db0ef2eeca98b0ed.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/%5Blocale%5D/auth/signup/page-d54ff3344c935101.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/_not-found/page-46de4d6481ba82b2.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-7cabe5494025f096.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/api/og/route-e14ef17efb9f720e.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/layout-8ec086af9fd365a4.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/loading-605efca189099b13.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/not-found-213d487629df9692.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/app/offline/page-359eff6c73d1e1cd.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/main-6d0d26abb30faaa8.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/main-app-374d285d2eb88114.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/pages/_app-c9ef09d97714d9a0.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/pages/_error-d9c69a98165df224.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-d8c42855cab2ae66.js",revision:"trx0vUVKd_471GdWNX3cK"},{url:"/_next/static/css/1113f728d6815cac.css",revision:"1113f728d6815cac"},{url:"/_next/static/css/165a9b58c4cf713e.css",revision:"165a9b58c4cf713e"},{url:"/_next/static/css/3a0bcd6273583f83.css",revision:"3a0bcd6273583f83"},{url:"/_next/static/css/5d219fe4d2cffd66.css",revision:"5d219fe4d2cffd66"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/412b56bcddc2e346-s.woff2",revision:"73af1a544044cac21a4833620c4578b3"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/910c9cf6ce5a9237-s.woff2",revision:"97e19455a64c3f9cbf4a2509c0f523f4"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/a45f4326d28270b6-s.woff2",revision:"8d30e4513323d03611ac90378fb8fd59"},{url:"/_next/static/media/af0f98f8abe3733a-s.p.woff2",revision:"2d532eb18fbd5243c6852bfeb09cea57"},{url:"/_next/static/media/cf83d9a9314ace15-s.woff2",revision:"3d3879f0c09a288c3d67bd4722bff6d7"},{url:"/_next/static/media/d6e71db82912037c-s.woff2",revision:"f7170eb8703c57b72d033ac9c3fedb82"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/f99d0f13e08eec38-s.woff2",revision:"4a391dd251f4fa0a4df1ae15ad0b09e1"},{url:"/_next/static/trx0vUVKd_471GdWNX3cK/_buildManifest.js",revision:"6a574d96900973a82bc04dea438503e4"},{url:"/_next/static/trx0vUVKd_471GdWNX3cK/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/custom-firebase-messaging-sw.js",revision:"3ee6aa1440fc765997bd0cd2f403245e"},{url:"/custom-sw.js",revision:"44bc82c9052a311d8b53801bcfcd485d"},{url:"/custom-sw.js.gz",revision:"e3a9e11f3a30ba9052356be0c50f21bf"},{url:"/firebase-messaging-sw.js",revision:"2a17d736a45271074657401fbb8f6f4a"},{url:"/icons/blood-donation (2).png",revision:"30a6f107963b5303e20d1ea27167049c"},{url:"/icons/blood-donation.png",revision:"1b335e5316353d8c3fda8177a832e213"},{url:"/icons/bloodneed.png",revision:"ee9f16e945cf4866cda050e3574b374d"},{url:"/icons/facebook.png",revision:"ceda85dc6354796fd08c69a2032d2b29"},{url:"/icons/google.png",revision:"937c87b4439809d5b17b82728df09639"},{url:"/icons/icon-144x144.png",revision:"d25b5c867e72e70ce5cd796549719ca4"},{url:"/icons/icon-192x192.png",revision:"a8ad01cc596f93c0f96f7bd4caf08083"},{url:"/icons/icon-48x48.png",revision:"f2576a5bd5e8f2f334acbecfe9bc464b"},{url:"/icons/icon-512x512.png",revision:"da9d854407aa61b1c2ac5c0eeeaad0e7"},{url:"/icons/icon-72x72.png",revision:"8a24e9c278a7dfc65a98d1f857f1afdc"},{url:"/icons/icon-96x96.png",revision:"b4be0b05d5a2f2edbc1fd5e019e433ab"},{url:"/icons/logo.png",revision:"6259df33f34e8694da67d5061fcf2482"},{url:"/leaflet/marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"/leaflet/marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"/leaflet/marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"/manifest.json",revision:"34449552512341a1d6d08efdeb444708"},{url:"/offline.html",revision:"6e086c9de57c36def8bc8f4a41126b98"},{url:"/placeholder-logo.png",revision:"b7d4c7dd55cf683c956391f9c2ce3f5b"},{url:"/placeholder-logo.svg",revision:"1e16dc7df824652c5906a2ab44aef78c"},{url:"/placeholder-user.jpg",revision:"82c9573f1276f9683ba7d92d8a8c6edd"},{url:"/placeholder.jpg",revision:"887632fd67dd19a0d58abde79d8e2640"},{url:"/placeholder.svg",revision:"b1ffb060b869282e8a2e6d935f881dfd"},{url:"/profile.png",revision:"99843a5382fe3fee149c712b2ea1bc0e"},{url:"/registerSW.js",revision:"ad0cc7ee13abad506030f993350c3235"},{url:"/screenshots/desktop.jpg",revision:"672afa7ea96c76b84c9c72f1a78b3a2a"},{url:"/screenshots/mobile.jpg",revision:"50bf2ac5cc6510ced2d3d226374e55a6"},{url:"/screenshots/mobile.png",revision:"ebbb88bb7f5a71f48ce734bb6ebb933d"},{url:"/screenshots/screenshot1.jpg",revision:"9e838b3bff2ec8351aa2f67843799771"},{url:"/screenshots/screenshot1.png",revision:"a00df5efcbc9d6ce18a15139194b0c7f"},{url:"/screenshots/screenshot2.jpg",revision:"67b012bc88fcb0a28e338e677e64240f"},{url:"/screenshots/screenshot3.jpg",revision:"be97fbd4f88514312e2537838865a742"},{url:"/sw-message-handler.js",revision:"4b00af11a49d7b2aaf55dfec73f1087a"},{url:"/sw.js.gz",revision:"dece555e7193134c4844ad6f1a447c78"},{url:"/workbox-f52fd911.js.gz",revision:"7f5683c25e946227612f4ea2484cb3c8"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.CacheFirst({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i,new e.CacheFirst({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.CacheFirst({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.CacheFirst({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css)$/i,new e.CacheFirst({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.NetworkFirst({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"api-cache",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET")}));
