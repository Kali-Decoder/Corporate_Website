const contact= document.querySelector("#contact");
const submitForm= document.querySelector("#form-submit");

const message= document.querySelector("#message");
const subject= document.querySelector("#subject");
const email= document.querySelector("#email");
const name= document.querySelector("#name");
const alertMsg= document.querySelector(".alertMsg");


async function postingContact(event){
    event.preventDefault();
    const obj={
        message:message.value,
        subject:subject.value,
        email:email.value,
        name:name.value,
    }
    const response = await  axios.post('/sending',{
        data:obj
    });

    const data= response.data;
    if(data.hasError){
        alertMsg.style.display='block';
        alertMsg.innerHTML=`<small class="text-center">
        ${data.message}
      </small>`;
      alertMsg.classList.add('text-danger');
      alertMsg.classList.remove('text-success');
    }else{
        alertMsg.style.display='block';
        alertMsg.innerHTML=`<small class="text-center">
        ${data.message}
      </small>`;
      alertMsg.classList.add('text-success');
      alertMsg.classList.remove('text-danger');
        message.value='';
        subject.value='';
        email.value='';
        name.value='';
    }

        

    setTimeout(()=>{
        alertMsg.style.display='none';
    },2000)
}


contact.addEventListener('submit', postingContact);


