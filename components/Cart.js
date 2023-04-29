import { View, Text, ScrollView, TouchableOpacity, Pressable, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, XCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addOneQuantity, addToCart, emptyCart, removeFromCart, removeOneQuantity, selectCartItems, selectCartTotal } from '../features/cartSlice'
import { formatCurrency } from 'react-native-format-currency';

export default function Cart() {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const subTotal = useSelector(selectCartTotal);


    function deleteMenuFromCart(id) {
        dispatch(removeFromCart(
            {
                _id: id,
            }
        ))
    }

    function addOneQuantityFromCart(id) {
        dispatch(addOneQuantity(
            {
                _id: id,
            }
        ))
    }

    function removeOneQuantityFromCart(id) {
        dispatch(removeOneQuantity(
            {
                _id: id,
            }
        ))
    }

    function emptyCartItems() {
        dispatch(emptyCart())
    }


    return (
        <View className="border-l border-gray-500 h-full items-center p-2">
            <Text className="text-xl font-bold">CART</Text>
            <View className="flex-1 w-full">
                <ScrollView>
                    {
                        items?.map((item) => (
                            <View key={item._id}>
                                <View className="flex-row justify-between space-x-2 items-center">
                                    <TouchableOpacity
                                        onPress={() => {
                                            deleteMenuFromCart(item._id)
                                        }}
                                    >
                                        <XCircleIcon size={20} color="black" />
                                    </TouchableOpacity>
                                    <Text className="text-xs font-bold flex-1">{item.name}</Text>
                                    <Text className="text-xs">${item.price * item.quantity}</Text>
                                    <View className="flex-row space-x-1 items-center">
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (item.quantity > 1) {
                                                    removeOneQuantityFromCart(item._id);
                                                } else if (item.quantity <= 1) {
                                                    deleteMenuFromCart(item._id);
                                                }
                                            }}
                                        >
                                            <ChevronLeftIcon color="black" size={20} />
                                        </TouchableOpacity>
                                        <Text>{item.quantity}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                addOneQuantityFromCart(item._id);
                                            }}
                                        >
                                            <ChevronRightIcon color="black" size={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    {item.removes?.map((remove) => (
                                        <Text key={remove} className="text-xs"> - {remove}</Text>
                                    ))}
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
            <View className="w-2/3">
                <View className="flex-row w-full justify-between">
                    <Text>SUBTOTAL</Text>
                    <Text>{formatCurrency({ amount: subTotal.toFixed(2), code: "CAD" })[0]}</Text>
                </View>
                <View className="flex-row w-full justify-between">
                    <Text>QST(15%)</Text>
                    <Text>{formatCurrency({ amount: (subTotal * 0.15).toFixed(2), code: "CAD" })[0]}</Text>
                </View>
                <View className="flex-row w-full justify-between py-2">
                    <Text className="font-bold">TOTAL</Text>
                    <Text className="font-bold">{formatCurrency({ amount: (subTotal + subTotal * 0.15).toFixed(2), code: "CAD" })[0]}</Text>
                </View>
                <TouchableOpacity
                    disabled={items.length == 0}
                    className={items.length == 0
                        ? "w-full bg-gray-400 h-10 my-1 justify-center items-center rounded-xl"
                        : "w-full bg-black h-10 my-1 justify-center items-center rounded-xl"}>
                    <Text className="text-white font-bold">PAYMENT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={items.length == 0}
                    className={items.length == 0
                        ? "w-full bg-gray-200 h-10 my-1 justify-center items-center rounded-xl"
                        : "w-full bg-gray-500 h-10 my-1 justify-center items-center rounded-xl"}
                    onPress={() => {
                        emptyCartItems();
                    }}
                >
                    <Text className="text-white font-bold">EMPTY CART</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}