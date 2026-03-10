let chart;

document.querySelectorAll("#amount,#scheme,#months").forEach(input=>{
input.addEventListener("input",calculateEMI);
});

function calculateEMI(){

let P = document.getElementById("amount").value;
let rate = document.getElementById("scheme").value;
let months = document.getElementById("months").value;

if(P=="" || rate=="" || months==""){
return;
}

let r = rate/12/100;

let EMI = (P*r*Math.pow(1+r,months))/(Math.pow(1+r,months)-1);

let totalPayment = EMI*months;

let totalInterest = totalPayment - P;

document.getElementById("emi").innerHTML="₹ "+EMI.toFixed(2);
document.getElementById("interest").innerHTML="₹ "+totalInterest.toFixed(2);
document.getElementById("total").innerHTML="₹ "+totalPayment.toFixed(2);

createChart(P,totalInterest);

}

function createChart(principal,interest){

let ctx=document.getElementById("emiChart");

if(chart){
chart.destroy();
}

chart=new Chart(ctx,{
type:'pie',

data:{
labels:["Principal","Interest"],
datasets:[{
data:[principal,interest],
backgroundColor:[
"#4CAF50",
"#FF6384"
]
}]
},

options:{
responsive:true,
plugins:{
legend:{
position:'bottom'
}
}
}

});

}