export class Building{
    _id: string;
    name: string;
    committeeMembers:[
        {
            user_id: string;
            designation: string;
            name:{
                first: string;
                last: string;                
            };
            

            
        }
    ];
    contact:{
        email: string;
        phone: string[];
    };
    associatedEmails : string[];
    address:{
        address1: string;
        address2: string;
        address3: string;
        pin: string;
        postOffice : string;
        city_vill: string;
        district : string;
        state: string;
        country: string;
        landmark: string;

    };

    constructor(){
        this._id ='';
        this.name ='';
        this.committeeMembers = [{user_id:'', designation:'',name:{first:'',last:''}}];
        this.associatedEmails=[];
        this.address = {
            address1:'',address2:'',address3:'',
            pin:'',postOffice:'',city_vill:'',
            district:'', state:'',country:'',landmark:''
        }
        this.contact ={email:'',phone:[]};
    }


}



/*
[
{
"_id":"5be9b85e80107342532bb3c3",
"name":"Rittika Apartment",
"committeeMembers":[{"user_id":"5be8747767155511611aef51","designation":"member"}],
"associatedEmails":["debashisgho@gmail.com, guha.swagata2@gmail.com"],
"address":{"address1":"Sourav Ganguly Avenue","address2":"Bablatala","address3":"Kalipark","pin":"700136","postOffice":"R-Gopalpur","city_vill":"Kolkata","district":"South 24 pgs","state":"West Bengal","country":"India","landmark":"near 217-B Bus Stand"},
"details":{"type":"Stand-Alone","towers":[]},
"contact":{"email":"rittikaApt@gmail.com",
"phone":["91-9903887868","91-8585085845","91-8583070701"]}}]

*/