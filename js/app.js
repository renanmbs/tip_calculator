//Variables
let per_button = document.getElementById("perc"); //Percentage radio 
let amt_button = document.getElementById("nums"); //Num radio
let radios = document.querySelectorAll('input[name="choices"]'); //Radios
let button_round = document.getElementById("round"); //Round button
let button_unround = document.getElementById("back"); //Unround button
let clean = document.getElementById("clean"); //Clean button
let bill_per; //Bill value percentage
let res_per; //Tip value percentage
let total_per; //Total value percentage

//Function to check which radio was checked
function radio_handler(){

    //If percentage button is checked
    if(per_button.checked){
        document.getElementById("per").style.display = "block";
        document.getElementById("ro").style.display = "block";
        document.getElementById("num").style.display = "none";
        document.getElementById("result_per").style.display = "block";
        document.getElementById("result_num").style.display = "none";

        //Add event listeners
        let inp_per = document.getElementById("input_per");
        inp_per.addEventListener('input',display_per_tip);
    }

    //If amount button is checked
    else if(amt_button.checked){
        document.getElementById("per").style.display = "none";
        document.getElementById("num").style.display = "block";
        document.getElementById("ro").style.display = "none";
        document.getElementById("result_per").style.display = "none";
        document.getElementById("result_num").style.display = "block";
        

          //Add event listeners
          let inp_num = document.getElementById("num_input");
          inp_num.addEventListener('input',display_num_tip);
    }

}

//Function to display percentage tip
function display_per_tip(){

    //Variables 
    let bill = document.getElementById("input_per").value; //Bill value
    let tip_per = document.getElementById("tip_per"); //Get tip area

    //Check if bill is not 0
    if(bill == 0){
        alert("Bill can't be $0"); //Warning
    }

    //Check if bill is not null
    else if(bill == ""){
        alert("Bill can't be nothing"); //Warning
    }

    //Bill is acceptable
    else{
        document.getElementById("per_show").style.display = "block"; //Display area
        tip_per.addEventListener('blur',calculate_per_tip); //Calculate tip when input is taken
    }
}

//Function to calculate percentage tip
function calculate_per_tip(){

    //Variables 
    let bill_value = document.getElementById("input_per").value; //Bill value 
    let tip_per = document.getElementById("tip_per").value; //Tip value

    //Calculate tip in percentage
    let result = (bill_value * (tip_per/100)).toFixed(2);

    //Calculate the total of the bill
    let total = Number(bill_value) + Number(result);    

    //Round 2 decimal places
    result = Math.round(result * 100) / 100;
    total = Math.round(total * 100) / 100;

    //Update values
    bill_per = bill_value;
    res_per = result; 
    total_per = total;

    //Print result
    result_per(bill_value,result,total);

}

//Function to show result for percentage
function result_per(bill,tip,total){

    //Variables
    let show_bill = document.getElementById("per_bill"); //Bill
    let show_tip = document.getElementById("per_tip"); //Tip
    let show_total = document.getElementById("per_total"); //Total

    //Show values on screen
    show_bill.innerHTML = `$${bill}`;
    show_tip.innerHTML = `$${tip}`;
    show_total.innerHTML = `$${total}`;

}

//Function to round up
function round_up(){

    //Variables
    let total_ceil = Math.ceil(total_per); //Ceil the value
    let diff = Number(total_ceil) - Number(total_per); //Calculate difference
    let temp_res_per = Number(res_per) + Number(diff); //Add to tip
    let temp_total_per = Number(bill_per) + Number(temp_res_per); //Calculate full bill

    //Round to 2 values
    temp_res_per = Math.round(temp_res_per * 100) / 100;
    temp_total_per = Math.round(temp_total_per * 100) / 100;

    //Print results
    result_per(bill_per,temp_res_per,temp_total_per);
} 


//Function to show unround numbers
function unround(){
    result_per(bill_per,res_per,total_per);
}

//Function to clean
function clean_it(){
    document.getElementById("per_bill").innerHTML = "";
    document.getElementById("per_tip").innerHTML = "";
    document.getElementById("per_total").innerHTML = "";
    document.getElementById("num_bill").innerHTML = "";
    document.getElementById("num_tip").innerHTML = "";
    document.getElementById("num_total").innerHTML = "";
}

//Function to set event listeners to radio buttons
for(const radioButton of radios){
    radioButton.addEventListener('change', radio_handler);
}

//Function to display num tip
function display_num_tip(){

    //Variables 
    let bill = document.getElementById("num_input").value; //Bill value
    let tip_num = document.getElementById("tip_input"); //Get tip area

    //Check if bill is not 0
    if(bill == 0){
        alert("Bill can't be $0"); //Warning
    }

    //Check if bill is not null
    else if(bill == ""){
        alert("Bill can't be nothing"); //Warning
    }

    //Bill is acceptable
    else{
        document.getElementById("num_show").style.display = "block"; //Display area
        tip_num.addEventListener('blur',calculate_num_tip); //Calculate tip when input is taken
    }
}

//Function to calculate num tip
function calculate_num_tip(){

    //Variables 
    let bill_value = document.getElementById("num_input").value; //Bill value 
    let tip_num = document.getElementById("tip_input").value; //Tip value

    //Calculate tip's percentage
    let result = ((tip_num/bill_value) * 100) ;

    //Calculate the total of the bill
    let total = Number(bill_value) + Number(tip_num);  
    
    //Round up 2 decimal places
    result = Math.round(result * 100) / 100;
    total = Math.round(total * 100) / 100;

    //Print result
    result_num(bill_value,result,total);

}

//Function to show result for num
function result_num(bill,tip,total){

    //Variables
    let show_bill = document.getElementById("num_bill"); //Bill
    let show_tip = document.getElementById("num_tip"); //Tip
    let show_total = document.getElementById("num_total"); //Total

    //Show values on screen
    show_bill.innerHTML = `$${bill}`;
    show_tip.innerHTML = `${tip}%`;
    show_total.innerHTML = `$${total}`;

}


//Add event listeners
button_round.addEventListener('click', round_up); //Round up button
button_unround.addEventListener('click', unround); //Unround button
clean.addEventListener('click', clean_it); //Clean button