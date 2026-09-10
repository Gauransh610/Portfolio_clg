const form = document.getElementById("feedbackForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const course = document.getElementById("course");
const feedback = document.getElementById("feedback");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const courseError = document.getElementById("courseError");
const feedbackError = document.getElementById("feedbackError");

const storedData = document.getElementById("storedData");
const sessionUser = document.getElementById("sessionUser");

function validateEmail(emailValue){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(emailValue);
}

function clearError(input,error){
    input.addEventListener("input",()=>{
        if(input.value.trim()!=""){
            error.textContent="";
        }

        if(input==email && validateEmail(email.value)){
            emailError.textContent="";
        }
    });
}

clearError(name,nameError);
clearError(email,emailError);
clearError(course,courseError);
clearError(feedback,feedbackError);

course.addEventListener("change",()=>{
    if(course.value!=""){
        courseError.textContent="";
    }
});

form.addEventListener("submit",function(e){

    e.preventDefault();

    let valid=true;

    nameError.textContent="";
    emailError.textContent="";
    courseError.textContent="";
    feedbackError.textContent="";

    if(name.value.trim()==""){
        nameError.textContent="Name is required.";
        valid=false;
    }

    if(email.value.trim()==""){
        emailError.textContent="Email is required.";
        valid=false;
    }
    else if(!validateEmail(email.value)){
        emailError.textContent="Enter a valid email.";
        valid=false;
    }

    if(course.value==""){
        courseError.textContent="Please select a course.";
        valid=false;
    }

    if(feedback.value.trim()==""){
        feedbackError.textContent="Please enter feedback.";
        valid=false;
    }

    if(valid){

        const student={
            name:name.value,
            email:email.value,
            course:course.value,
            feedback:feedback.value
        };

        localStorage.setItem("feedback",JSON.stringify(student));

        sessionStorage.setItem("studentName",name.value);

        displayFeedback();
    }

});

function displayFeedback(){

    const data=JSON.parse(localStorage.getItem("feedback"));

    if(data){

        storedData.innerHTML=`
        <b>Name:</b> ${data.name}<br><br>
        <b>Email:</b> ${data.email}<br><br>
        <b>Course:</b> ${data.course}<br><br>
        <b>Feedback:</b> ${data.feedback}
        `;

    }
    else{
        storedData.innerHTML="No feedback stored.";
    }

    const user=sessionStorage.getItem("studentName");

    if(user){
        sessionUser.innerHTML="Current Session User: "+user;
    }
    else{
        sessionUser.innerHTML="";
    }

}

document.getElementById("deleteBtn").addEventListener("click",function(){

    localStorage.removeItem("feedback");
    sessionStorage.removeItem("studentName");

    storedData.innerHTML="No feedback stored.";
    sessionUser.innerHTML="";
});

displayFeedback();