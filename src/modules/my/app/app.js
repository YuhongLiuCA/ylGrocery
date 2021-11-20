import { LightningElement,track } from 'lwc';

export default class App extends LightningElement {

    @track 
    fruits = [];

    @track
    cart = [];

    cartNumber = 0;

    connectedCallback() {
        this.fruits = [{name: "Apple",image:"",price:2.75,quantity:0,inc:"AppleInc",dec:"AppleDec"},
        {name: "Pear",image:"",price:1.75,quantity:0,inc:"PearInc",dec:"PearDec"},
        {name: "Banana",image:"",price:0.99,quantity:0,inc:"BananaInc",dec:"BananaDec"},
        {name: "Orange",image:"",price:1.09,quantity:0,inc:"OrangeInc",dec:"OrangeDec"},
        {name: "Grape",image:"",price:3.99,quantity:0,inc:"GrapeInc",dec:"GrapeDec"}
        ];
    }

    addFruitItem(event) {
        let itemId = event.target.id;
        //console.log("ItemId="+itemId+" good");
        let index = itemId.indexOf("Inc");
        let itemName = itemId.substring(0,index);
        for(let i = 0; i < this.fruits.length; i++) {
            if(this.fruits[i].name === itemName) {
                this.fruits[i].quantity++;
                this.cartNumber++;
                let found = 0;
                for(let j=0;j<this.cart.length;j++){
                    if(this.cart[j].name === itemName) {
                        found = 1;
                        this.cart[j].quantity++;
                    }
                }
                if(found === 0) {
                    this.cart.push({name:itemName,quantity:1});
                    this.cart.sort(function(a,b) { 
                        if(a.name < b.name) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                }
                break;
            }
        }
    }

    removeFruitItem(event) {
        let itemId = event.target.id;
        let index = itemId.indexOf("Dec");
        let itemName = itemId.substring(0,index);
        for(let i = 0; i < this.fruits.length; i++) {
            if(this.fruits[i].name === itemName) {
                if(this.fruits[i].quantity > 0) this.fruits[i].quantity--;
                if(this.cartNumber > 0) this.cartNumber--;
                for(let j=0;j<this.cart.length;j++){
                    if(this.cart[j].name === itemName) {
                        if(this.cart[j] > 0){
                            this.cart[j].quantity--;
                        } else {
                            this.cart.splice(j,1);
                        }
                        break;                        
                    }
                }
                break;
            }
        }
    }
}
