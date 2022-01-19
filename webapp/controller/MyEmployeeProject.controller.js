sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ui.MySecondEmployee.secondemployeeproject.controller.MyEmployeeProject", {
            onInit: function () {
                var oEmployeeData = {
                    "Employee" : {
                        "Employee_Id" : "",
                        "FName" : " ",
                        "LName" : " ",
                        "Mobile" : " ",
                        "Email_Id" : " ",
                        "Gender" : " ",
                        "DOB" : " ",
                        "Pincode" : " ",
                        "Hometown" : " ",
                        "Landmark" : " "
                    },
                   
                    "EmployeeValueState" : {
                        "FName_VS" : "Error",
                        "FName_VST" : "Please Enter the value",
                        "LNamee_VS" : "None",
                        "LName_VST" : ""
                    },
                    "DialogEmployeeDetails":{
                    
                    },
                    "EmployeeList" :[
                        {
                        "Employee_Id" : 808312,
                        "FName" : "Gattu",
                        "LName" : "Sai Niveditha",
                        "Mobile" : "8328062422",
                        "Email_Id" : "sainiveditha2518@gmail.com",
                        "Gender" : "Female",
                        "DOB" : "Jun 26, 1999",
                        "Pincode" : "515671",
                        "Hometown" : "Dharmavaram",
                        "Landmark" : "Near siddhartha Theater"
                    },
                    {
                        "Employee_Id" : 808496,
                        "FName" : "Hemanthsai",
                        "LName" : "Pokkunuri",
                        "Mobile" : "63057290",
                        "Email_Id" : "hemanthsaiprudhvi828@gmail.com",
                        "Gender" : "Male",
                        "DOB" : "Jan 03, 1999",
                        "Pincode" : "533104",
                        "Hometown" : "Rajahmundry",
                        "Landmark" : "Aryapuram"
                    },
                ]
                };
                var oModel = new sap.ui.model.json.JSONModel(oEmployeeData);
                this.getView().setModel(oModel,"EmployeeModel");
            },


            onPressSave: function(){
                var oEmpModel = this.getView().getModel("EmployeeModel");
                var oEmployeeData = oEmpModel.getProperty("/Employee");

                if(!oEmployeeData.FName && !oEmployeeData.LName && !oEmployeeData.Mobile && !oEmployeeData.Email_Id){
                    if(!oEmployeeData.FName){
                        oEmpModel.setProperty("/EmployeeValueState/FName_VS","Error");
                        oEmpModel.setProperty("/EmployeeValueState/FName_VST","Please Enter the First Name");
                    }

                    if(!oEmployeeData.LName){
                        oEmpModel.setProperty("/EmployeeValueState/LName_VS","None");
                        oEmpModel.setProperty("/EmployeeValueState/LName_VST","");
                    }
                }
                else{
                var EmployeeList = oEmpModel.getProperty("/EmployeeList");
                EmployeeList.push(oEmployeeData);
                oEmpModel.setProperty("/EmployeeList",EmployeeList);  
                }
            },


            onChangeFname: function(oEvent){
                var sValue = oEvent.getSource().getValue();
                if(sValue.length>=20){
                    oEvent.getSource().setValueState("Error");
                    oEvent.getSource().setValueStateText("Length should be 15");
                }
                else{
                    oEvent.getSource().setValueState("None");
                    oEvent.getSource().setValueStateText("");
                }
            },


            onChangeLname: function(oEvent){
                var sValue = oEvent.getSource().getValue();
                if(sValue.length>=15){
                    oEvent.getSource().setValueState("Error");
                    oEvent.getSource().setValueStateText("Length should be 15");
                }
                else{
                    oEvent.getSource().setValueState("None");
                    oEvent.getSource().setValueStateText("");
                }
            },


            onChangeTel: function(oEvent){
                var sValue = oEvent.getSource().getValue();
                if(sValue.length!=10){
                    oEvent.getSource().setValueState("Error");
                    oEvent.getSource().setValueStateText("Length should be 10");
                }
                else{
                    oEvent.getSource().setValueState("None");
                    oEvent.getSource().setValueStateText("");
                }
            },


            MyFormatter: function(FName,LName,Gender){
                var value;
                if(Gender == "Male"){
                    value = "Mr." + FName + " " + LName;
                }else if(Gender == "Female"){
                    value = "Ms." + FName + " " + LName;
                }
                return value;
            },



            ValidateMobile: function(mobileNum){
                if(mobileNum.length == 10){
                    return "Success";
                }
                else if(mobileNum.length<=10 || mobileNum.length>10){
                    return "Error";
                }
            },

            onPressShow: function(oEvent){
                var that = this;
                let selectedPath = oEvent.getSource().getBindingContext("EmployeeModel").getPath();
                let oModel = this.getView().getModel("EmployeeModel");
                let oSelectedData = oModel.getProperty(selectedPath);
                oModel.setProperty("/DialogEmployeeDetails",oSelectedData);
                if(!that._oDialogEmployeeDetails){
                    that._oDialogEmployeeDetails = sap.ui.xmlfragment(
                        this.getView().getId(),
                        "ui.MySecondEmployee.secondemployeeproject.fragment.MyEmployee",
                        this
                    );
                }
                that.getView().addDependent(that._oDialogEmployeeDetails);
                that._oDialogEmployeeDetails.open();
            },
            onClose: function(){
                var that = this;
                if(that._oDialogEmployeeDetails)
                {
                    that.getView().removeDependent(that._oDialogEmployeeDetails);
                    that._oDialogEmployeeDetails.close();
                }
            }


        });
    });
