import{a as A}from"./chunk-LZN7HUR7.js";import{a as F,b as c,c as M,d as T,e as g,g as j,h as N,i as R,n as G,p as q}from"./chunk-5GBPBMV7.js";import{b as I}from"./chunk-HKWKQJZR.js";import"./chunk-FWOJAUMH.js";import{H as v,Ha as _,I as b,Ia as S,Pa as C,Ra as E,S as l,Sa as k,U as u,V as w,Va as L,Z as d,aa as a,da as r,ea as i,fa as p,ja as h,ka as f,oa as n,qa as y}from"./chunk-74CKK67D.js";function B(t,s){t&1&&(r(0,"p"),n(1,"El email es obligatorio"),i())}function D(t,s){t&1&&(r(0,"p"),n(1,"El email no es v\xE1lido"),i())}function V(t,s){if(t&1&&(r(0,"div",24),d(1,B,2,0,"p",25)(2,D,2,0,"p",25),i()),t&2){let e=f();l(),a("ngIf",e.email==null||e.email.errors==null?null:e.email.errors.required),l(),a("ngIf",e.email==null||e.email.errors==null?null:e.email.errors.email)}}function U(t,s){t&1&&(r(0,"p"),n(1," La contrase\xF1a es obligatoria "),i())}function P(t,s){t&1&&(r(0,"p"),n(1," La contrase\xF1a debe tener al menos 6 caracteres "),i())}function H(t,s){if(t&1&&(r(0,"div",24),d(1,U,2,0,"p",25)(2,P,2,0,"p",25),i()),t&2){let e=f();l(),a("ngIf",e.password==null||e.password.errors==null?null:e.password.errors.required),l(),a("ngIf",e.password==null||e.password.errors==null?null:e.password.errors.minlength)}}function O(t,s){if(t&1&&(r(0,"div",26),n(1),i()),t&2){let e=f();l(),y(" ",e.errorMessage," ")}}var le=(()=>{class t{fb;authService;router;route;form;constructor(e,m,o,x){this.fb=e,this.authService=m,this.router=o,this.route=x,this.form=this.fb.group({email:new g("",[c.required,c.email]),password:new g("",[c.required,c.minLength(6)])})}get email(){return this.form.get("email")}get password(){return this.form.get("password")}message="";errorMessage="";onSubmit(){this.form.valid&&this.authService.login(this.email.value,this.password.value).then(e=>{console.log("form",this.form.value),console.log(e),this.message="User logged in successfully",this.route.queryParams.subscribe(m=>{let o=m.returnUrl||"/";this.router.navigateByUrl(o)})}).catch(e=>{console.log(e),this.errorMessage=e.message})}static \u0275fac=function(m){return new(m||t)(u(G),u(I),u(E),u(C))};static \u0275cmp=w({type:t,selectors:[["app-login"]],decls:36,vars:6,consts:[[1,"flex","flex-col","items-center","justify-center","w-full","h-screen","px-4","bg-gray-100","dark:bg-[#fdfdfd]"],[1,"text-2xl","font-bold","mb-4","text-center"],[1,"text-sm","text-gray-500","mb-6","text-center"],[1,"space-y-4","w-full","max-w-sm","sm:max-w-md","md:max-w-lg"],[1,"flex","flex-col","w-full","items-center","justify-center","gap-4",3,"ngSubmit","formGroup"],[1,"relative","w-full","flex","flex-col","gap-2"],["for","email",1,"text-sm","dark:text-gray-400"],["type","email","formControlName","email",1,"w-full","border","dark:border-[#161616]","rounded-md","p-2","focus:ring-0"],["class","text-sm mt-1 px-3 py-2 bg-red-50 border border-red-300 text-red-700 rounded-md max-w-full break-words transition-all duration-300",4,"ngIf"],[1,"flex","justify-between","w-full"],["for","password",1,"text-sm","dark:text-gray-400"],["routerLink","/auth/forgot-password",1,"text-end","text-sm","hover:underline"],[1,"relative","w-full"],["type","password","formControlName","password",1,"w-full","border","dark:border-[#161616]","rounded-md","p-2","focus:ring-0","pr-10"],["type","button","id","eyePassword",1,"absolute","right-2","top-1/2","transform","-translate-y-1/2","text-gray-500","hover:text-gray-700"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round","stroke-linejoin","round",1,"lucide","lucide-eye"],["d","M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"],["cx","12","cy","12","r","3"],[1,"flex","justify-end","w-full","text-sm","space-x-2"],["routerLink","/auth/register",1,"text-blue-500","hover:text-blue-700","transition","duration-300","ease-in-out","hover:underline"],["class","error-message text-red-500 text-center",4,"ngIf"],["type","submit",1,"bg-blue-500","dark:text-white","text-sm","font-bold","py-2","px-4","w-full","border","dark:border-[#161616]","rounded-md","transition","disabled:bg-gray-300",3,"disabled"],[3,"text"],["routerLink","/",1,"block","text-center","bg-slate-500","dark:text-white","text-sm","font-bold","py-2","px-4","w-full","border","dark:border-[#161616]","rounded-md","transition"],[1,"text-sm","mt-1","px-3","py-2","bg-red-50","border","border-red-300","text-red-700","rounded-md","max-w-full","break-words","transition-all","duration-300"],[4,"ngIf"],[1,"error-message","text-red-500","text-center"]],template:function(m,o){m&1&&(r(0,"div",0)(1,"h1",1),n(2,"Iniciar Sesi\xF3n"),i(),r(3,"p",2),n(4," Inicia sesi\xF3n para acceder a todas las funcionalidades de la aplicaci\xF3n. "),i(),r(5,"div",3)(6,"form",4),h("ngSubmit",function(){return o.onSubmit()}),r(7,"div",5)(8,"label",6),n(9,"Correo"),i(),p(10,"input",7),d(11,V,3,2,"div",8),i(),r(12,"div",5)(13,"div",9)(14,"label",10),n(15," Contrase\xF1a "),i(),r(16,"a",11),n(17,"\xBFOlvidaste tu contrase\xF1a?"),i()(),r(18,"div",12),p(19,"input",13),r(20,"button",14),v(),r(21,"svg",15),p(22,"path",16)(23,"circle",17),i()()(),d(24,H,3,2,"div",8),i(),b(),r(25,"div",18)(26,"p"),n(27,"No tienes cuenta?"),i(),r(28,"a",19),n(29,"Reg\xEDstrate"),i()(),d(30,O,2,1,"div",20),r(31,"button",21),n(32," Iniciar sesi\xF3n "),i()(),p(33,"app-google-login",22),r(34,"a",23),n(35," Volver "),i()()()),m&2&&(l(6),a("formGroup",o.form),l(5),a("ngIf",o.email.invalid&&o.email.touched),l(13),a("ngIf",o.password.invalid&&o.password.touched),l(6),a("ngIf",o.errorMessage),l(),a("disabled",o.form.invalid),l(2),a("text","Login with Google"))},dependencies:[S,_,q,j,F,M,T,N,R,L,k,A],encapsulation:2})}return t})();export{le as LoginComponent};
