
emailjs.init({
    publicKey: "PASTE_PUBLIC_KEY_HERE"
});

const noBtn=document.getElementById("noBtn");
let noClicks=0;

noBtn.addEventListener("click",()=>{
    noClicks++;

    const x=Math.random()*(window.innerWidth-140);
    const y=Math.random()*(window.innerHeight-80);

    noBtn.style.position="fixed";
    noBtn.style.left=x+"px";
    noBtn.style.top=y+"px";

    const msgs=[
        "Nem"
    ];

    noBtn.textContent=msgs[(noClicks-1)%msgs.length];
});

document.getElementById("yesBtn").onclick=()=>{
    welcome.classList.add("hidden");
    activities.classList.remove("hidden");
};

document.getElementById("partnerBtn").onclick=async()=>{
    welcome.classList.add("hidden");
    bruhPage.classList.remove("hidden");

    try{
        await emailjs.send(
            "service_h3djbra",
            "template_uz0ku1o",
            {
                name:"Nikol",
                programs:"-",
                dates:"-",
                note:"Van palija EHHHH"
            }
        );
    }catch(e){
        console.error(e);
    }
};

const otherCheck=document.getElementById("otherCheck");
const otherText=document.getElementById("otherText");

otherCheck.addEventListener("change",()=>{
    otherText.disabled=!otherCheck.checked;
    if(otherCheck.checked){
        otherText.focus();
    }
});

otherText.addEventListener("input",()=>{
    if(otherText.value.trim()!==""){
        otherCheck.checked=true;
        otherText.disabled=false;
    }
});

document.getElementById("toCalendar").onclick=()=>{
    activities.classList.add("hidden");
    calendarPage.classList.remove("hidden");
};

const calendar=document.getElementById("calendar");
const selected=[];

for(let i=0;i<30;i++){
    const d=new Date();
    d.setDate(d.getDate()+i);

    const txt=d.toLocaleDateString("hu-HU");

    const div=document.createElement("div");
    div.className="day";
    div.textContent=txt;

    div.onclick=()=>{
        div.classList.toggle("selected");

        if(selected.includes(txt)){
            selected.splice(selected.indexOf(txt),1);
        }else{
            selected.push(txt);
        }
    };

    calendar.appendChild(div);
}

document.getElementById("sendBtn").onclick=async()=>{

    const programs=[
        ...document.querySelectorAll('input[type="checkbox"]:checked')
    ]
        .filter(x=>x.id!=="otherCheck")
        .map(x=>x.value);

    if(otherCheck.checked && otherText.value.trim()!==""){
        programs.push(otherText.value.trim());
    }

    if(programs.length===0){
        alert("Válassz legalább egy programot.");
        return;
    }

    if(selected.length===0){
        alert("Válassz legalább egy napot.");
        return;
    }

    try{

        await emailjs.send(
            "service_h3djbra",
            "template_uz0ku1o",
            {
                name:"Nikol",
                programs:programs.join(", "),
                dates:selected.join(", "),
                note:document.getElementById("note").value
            }
        );

        calendarPage.classList.add("hidden");
        done.classList.remove("hidden");

    }catch(e){
        alert("Az e-mail küldése nem sikerült. Ellenőrizd az EmailJS adatokat.");
        console.error(e);
    }
};
