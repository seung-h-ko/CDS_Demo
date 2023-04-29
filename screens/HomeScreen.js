import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, ChevronRightIcon } from "react-native-heroicons/solid";
import { Motion } from '@legendapp/motion';
import MenuScoll from '../components/MenuScoll';
import Cart from '../components/Cart';

export default function HomeScreen() {
    const navigation = useNavigation();

    const [heightOfCategories, setHeightofCategories] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("appetizer");
    const [selectedCategoryColor, setSelectedCategoryColor] = useState(["#000000", "#ffffff", "#ffffff", "#ffffff"]);
    const [selectedCategoryTextColor, setSelectedCategoryTextColor] = useState(["#ffffff", "#000000", "#000000", "#000000"]);
    const [selectedCategoryCirlce, setSelectedCategoryCirlce] = useState(-32);

    const categories = ["appetizer", "main", "dessert", "others"];

    const styles = StyleSheet.create({
        selectCircle: {
            right: -20,
            zIndex: 0,
        }
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    const selectHandler = (category, index) => {
        setSelectedCategory(category);
        var newColorArray = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];
        var newTextColorArray = ['#000000', '#000000', '#000000', '#000000'];
        newColorArray[index] = "#000000";
        newTextColorArray[index] = "#ffffff";
        setSelectedCategoryColor(newColorArray);
        setSelectedCategoryTextColor(newTextColorArray);
        setSelectedCategoryCirlce(((index * 2) + 1) * (heightOfCategories) / 8 - 16)
    }


    return (
        <View className="flex-row bg-white h-full">
            {/**Menus Categories */}
            <View
                onLayout={(event) => {
                    setHeightofCategories(event.nativeEvent.layout.height);
                    setSelectedCategoryCirlce(heightOfCategories / 8 - 16)
                }}
                className="justify-center w-1/6">
                {
                    categories.map((category, i) => (
                        < Pressable
                            key={i}
                            onPress={selectHandler.bind(this, category, i)}
                            className={`h-1/4`}
                        >
                            <Motion.View
                                className='w-full h-full justify-center items-center'
                                animate={{ backgroundColor: selectedCategoryColor[i] }}
                            >
                                <Motion.Text className="font-bold"
                                    animate={{ color: selectedCategoryTextColor[i] }}
                                >
                                    {category.toUpperCase()}
                                </Motion.Text>
                            </Motion.View>
                        </Pressable>
                    ))
                }
                <Motion.View
                    className="absolute" style={styles.selectCircle}
                    animate={{ top: selectedCategoryCirlce }}
                    transition={{ type: "spring" }}
                >
                    <ChevronRightIcon color={"#000000"} size={30} />
                </Motion.View>
            </View>

            {/**ScrollView of items */}
            <View className="flex-1 -z-10 px-3">
                <MenuScoll category={selectedCategory} />
            </View>

            {/**Cart */}
            <View className="w-1/4 py-6">
                <Cart />
            </View>
        </View >
    )
}

