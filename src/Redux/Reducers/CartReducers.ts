let initialState={cart:[],total:0}

interface actionInterface{
    type:string,
    payload:{
        _id: string;
        name: string;
        description: string;
        price: number;
        imageSrc: string;
        quantity:number
    }
}

const cartReducers=(state=initialState,action:actionInterface)=>{
    switch(action.type){
     case "add_to_cart":
        
        action.payload["quantity"]=1
        return {...state,cart:[...state.cart,action.payload]}
    
    case "increment":
       const itemId = action.payload?._id;
        console.log(state)
      if (!itemId) {
        console.warn("Increment: missing _id in payload");
        return state;
      }

      return {
        ...state,
        cart: state.cart.map((item:any) =>
          item._id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),};
    
    case "decrement":
        const itemId2 = action.payload?._id;

        if (!itemId2) return state;
        console.log(state)
        return {
            ...state,
            cart: state.cart
            .map((item:any) =>
                item._id === itemId2 && item.quantity > 0
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0), 
        };
    
    case "empty_cart":
        return {...state,cart:[],total:0}
    

    default:
        return state
    }
}

export default cartReducers