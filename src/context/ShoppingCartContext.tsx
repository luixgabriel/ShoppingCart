import {createContext ,useContext, useState} from 'react';

type ShoppingCartContext = {
    openCart: () => void
    closeCart: ()=> void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartProviderProps = {
    children: React.ReactNode
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps){

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: number) {
        //CASO O ITEM SEJA ENCONTRADO O '?' PEGA O QUANTITY DELE SE NÃO RETORNA 0
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number){
        setCartItems(prev => {
            //SE ISSO ME RETORNAR NULL EU ADICIONO NO CART
            if(prev.find(item => item.id === id) == null){
                return [...prev, {id, quantity: 1}]
            }else{
                return prev.map((item) => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number){
        setCartItems(prev => {
            if(prev.find(item => item.id === id)?.quantity == 1){
                return prev.filter((item) => item.id !== id)
            }else{
                return prev.map((item) => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else {
                        return item;
                    }
                })
            }
        })
    }

    function removeFromCart(id: number){
        setCartItems(prev => {
           return prev.filter((item) => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider 
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity
                }}>
            {children}
        </ShoppingCartContext.Provider>
        )
}
    
   