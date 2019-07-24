export class User {
            email:string;
            name:{
                first:string;
                last:string;
            }
            phone:{
                primary: string;
                alternate1: string;
                alternate2: string;
                alternate3: string;
            }
            password: string;
            confirmPassword: string;

            constructor(){
                console.log("User constructor called");
                this.email="";
                this.name = {first:'', last:''};
                this.phone= {primary:'', alternate1:'',alternate2:'',alternate3:''};
                this.password='';
                this.confirmPassword ='';

                
            }
        
           
};