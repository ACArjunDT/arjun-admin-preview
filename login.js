(() => {
  const API=(window.ARJUN_ADMIN_CONFIG?.apiBase||"/api").replace(/\/$/,"");
  const form=document.querySelector("#loginForm"), error=document.querySelector("#loginError");
  form.addEventListener("submit",async e=>{
    e.preventDefault(); error.textContent="";
    const data=new FormData(form);
    try {
      const response=await fetch(API+"/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:data.get("email"),password:data.get("password")})});
      const result=await response.json().catch(()=>({detail:"The service did not return a valid response."}));
      if(!response.ok) throw new Error(result.detail||"Sign-in failed.");
      if(result.user.role!=="admin") throw new Error("This account does not have administration access.");
      sessionStorage.setItem("arjun_preview_token",result.token);
      sessionStorage.setItem("arjun_preview_user",JSON.stringify(result.user));
      location.href="ProjBuilderAccessControl.html";
    } catch (err) { error.textContent=err.message; }
  });
})();

