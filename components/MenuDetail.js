import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ScaleIcon } from 'react-native-heroicons/solid'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

export default function MenuDetail({ selectedMenu, setModalVisible }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const [removes, setRemoves] = useState([]);
    var salt = "";

    function setSalt() {
        var removesString = "";
        var temp = removes;
        temp.sort();
        temp.map((remove) => {
            removesString = removesString + remove;
        })
        salt = removesString;
    }

    function addMenuToCart() {
        dispatch(addToCart(
            {
                _id: selectedMenu._id + salt,
                name: selectedMenu.name,
                price: selectedMenu.price,
                quantity: quantity,
                removes: removes
            }
        ))
    }

    return (
        <View className="absolute h-3/4 w-2/3 bg-white shadow-2xl rounded-3xl">
            <View className="flex-row w-full h-full">
                <View className="relative flex-1">
                    <Image
                        source={{
                            uri: 'https://picsum.photos/id/292/200/300'
                        }}
                        className="h-3/4 w-full"
                    />
                    <View className="absolute bottom-0 w-full h-2/5 items-center bg-gray-200 rounded-t-3xl rounded-bl-3xl">
                        <Text className="font-bold text-2xl">{selectedMenu?.name}</Text>
                        <Text>{selectedMenu?.description}</Text>
                    </View>
                </View>
                <View className="flex-1">
                    <View className="flex-1 rounded-b-3xl rounded-tr-3xl bg-gray-200">
                        <ScrollView>
                            {
                                selectedMenu?.removesOptions?.map((option) => (
                                    <View
                                        key={option}
                                        className="flex-row p-1 justify-between items-center">
                                        <Text>{option}</Text>
                                        <BouncyCheckbox
                                            fillColor='black'
                                            onPress={(isChecked) => {
                                                if (isChecked && !removes.includes(option)) {
                                                    setRemoves(oldRemoves => [...oldRemoves, option]);
                                                } else if (!isChecked && removes.includes(option)) {
                                                    setRemoves(removes.filter(remove => remove !== option));
                                                }
                                            }} />
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                    <View className="flex-row p-2 justify-around items-center">
                        <View className="flex-row space-x-1 items-center">
                            <TouchableOpacity
                                disabled={quantity <= 0}
                                onPress={() => { if (quantity > 0) { setQuantity(quantity - 1) } }}>
                                <ChevronLeftIcon
                                    color={quantity <= 0 ? "#aaaaaa" : "black"}
                                    size={40}
                                />
                            </TouchableOpacity>
                            <Text className="font-bold text-2xl">{quantity}</Text>
                            <TouchableOpacity
                                onPress={() => { setQuantity(quantity + 1) }}>
                                <ChevronRightIcon
                                    color="black"
                                    size={40}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            disabled={quantity <= 0}
                            onPress={() => {
                                setModalVisible(false);
                                setSalt();
                                addMenuToCart();
                            }}
                            className={quantity <= 0 ? "bg-gray-400 px-6 py-2 rounded-lg" : "bg-black px-6 py-2 rounded-lg"}>
                            <Text className="text-white font-bold">ADD TO CART</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}