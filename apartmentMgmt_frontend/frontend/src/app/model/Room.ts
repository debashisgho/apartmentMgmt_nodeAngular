export class Room{
    _id: string;
    roomNo: string;
    floorNo:string;
    building:string;
    tower:string;

    rent_details:{
        previous:[
            {
                _id:string;
                name:{ 
                    last:string;
                    first:string;
                    fullName:string;
                    
                }
            }
        ];
        current:[
            {
                _id:string;
                name:{ 
                    last:string;
                    first:string;
                    fullName:string;
                    
                }
            }
        ];
    };

    others:{
        othersLiving:[
            {
                _id:string;
                name:{
                    last:string;
                    first:string;
                    fullName:string;
                }
            }
        ];
    };

    owner_details:{
        previous:[
            {
                _id:string;
                name:{
                    last:string;
                    first:string;
                    fullName:string;
                }
            }
        ];
        current:[
            {
                _id:string;
                name:{ 
                    last:string;
                    first:string;
                    fullName:string;
                    
                }
            }
        ];
    };

    area_details:{
        area: string;
        measurementUnit: string;
    }


    constructor(){
        this._id ='';
        this.roomNo ='';
        this.floorNo='';
        this.building='';
        this.tower='';
        
        this.rent_details ={previous:[{_id:'',name:{last:'',first:'',fullName:''}}], current:[{_id:'',name:{last:'',first:'',fullName:''}}]};
       // this.rent_details.previous=[]
        //this.rent_details.current=[]
        this.others={othersLiving:[{_id:'',name:{last:'',first:'',fullName:''}}]};
        //this.others.othersLiving=[];
        this.owner_details={previous:[{_id:'',name:{last:'',first:'',fullName:''}}], current:[{_id:'',name:{last:'',first:'', fullName:''}}]};
        //this.owner_details.previous=[{name:{last:'',first:''}}];
        //this.owner_details.current==[{name:{last:'',first:''}}];

        this.area_details={area:'', measurementUnit:''};
        //this.area_details.area='';
        //this.area_details.measurementUnit='';
        
    }


}